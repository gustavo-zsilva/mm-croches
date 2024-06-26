"use client";

import { useState, useTransition } from "react";

import { collection, addDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/firebase";

import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";

import { DragDropInput } from "@/components/DragDropInput";
import { Loader } from "lucide-react";

const MAX_FILE_SIZE = 2000000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const formSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Nome curto demais!" })
    .max(80, { message: "Nome comprido demais!" }),
  description: z.string().max(500, { message: "Descrição comprida demais!" }),
  price: z.coerce.number({ required_error: "Preço é obrigatório!" }).positive(),
  images: z
    .any()
    .refine((files) => files.length > 0, "Escolha uma ou mais imagens.")
    .refine((files) =>
      files.every(
        (file: File) => file.size <= MAX_FILE_SIZE,
        "Tamanho de arquivo máximo é 2mb.",
      ),
    )
    .refine((files) =>
      files.every(
        (file: File) => ACCEPTED_IMAGE_TYPES.includes(file.type),
        "Apenas arquivos .jpg, .jpeg, .png e .webp são aceitos.",
      ),
    ),
  customMeasure: z.boolean(),
  promptDelivery: z.boolean(),
  type: z.string().min(1, { message: "Selecione uma opção!" }),
});

export default function NewProduct() {
  const { toast } = useToast();
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 10.99,
      images: [],
      customMeasure: false,
      promptDelivery: false,
      type: "",
    },
  });

  async function handleSubmit(values: z.infer<typeof formSchema>) {
    startTransition(async () => {
      try {
        const { images, ...formData } = values;

        // Upload Images
        const storage = getStorage();

        let totalSize = images.reduce(
          (acc: number, file: File) => acc + file.size,
          0,
        );
        let uploadedSize = 0;
        const uploadedSizesTracker: number[] = [];

        const promisesImagesUpload: Promise<string>[] = images.map(
          (file: File, index: number) => {
            const storageRef = ref(storage, `uploads/${values.name}-${index}`);
            const uploadTask = uploadBytesResumable(storageRef, file, {
              contentType: file.type,
            });

            return new Promise((resolve, reject) => {
              uploadTask.on(
                "state_changed",
                (snapshot) => {
                  // Monitora em um array os uploaded bytes de cada imagem individual, calcula o ganho de bytes de cada snapshot,
                  // atualiza o número atual de uploaded bytes no array e adiciona o ganho de bytes em 'uploadedSize'.
                  const prevUploadedSize = uploadedSizesTracker[index] || 0;
                  const currentUploadedSize =
                    snapshot.bytesTransferred - prevUploadedSize;

                  uploadedSizesTracker[index] = snapshot.bytesTransferred;
                  uploadedSize += currentUploadedSize;

                  // Ele ta pegando e adicionando o bytesTransfered de antes com o depois, e não adicionando a diferença, que era pra ser o correto
                  // Exemplo: 100 bytes agora, proximo snapshot 120 bytes. uploadedSize deveria ser 120, e não 220.

                  const progress = Math.round((uploadedSize / totalSize) * 100);

                  setUploadStatus("Fazendo upload...");
                  setUploadProgress(progress);
                },
                (error) => {
                  reject(error);
                  uploadTask.cancel();
                },
                () => {
                  getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
                    resolve(downloadURL),
                  );
                },
              );
            });
          },
        );

        const downloadsUrl = await Promise.all(promisesImagesUpload);
        setUploadStatus("Uploads finalizados!");

        // Write product to database
        const productsRef = collection(db, "products");
        const newProduct = {
          ...formData,
          images: downloadsUrl,
          createdAt: new Date(),
        };
        await addDoc(productsRef, newProduct);

        toast({
          title: `Produto adicionado com sucesso!`,
        });
        form.reset();
      } catch (err) {
        console.error(err);
        setUploadProgress(0);
        setUploadStatus("Algo deu errado!");
      }
    });
  }

  return (
    <div className="px-6 max-w-screen-lg m-auto w-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="space-y-8 md:grid md:grid-cols-2 md:gap-10 md:space-y-0"
        >
          <FormField
            name="name"
            render={({ field }) => (
              <FormItem className="md:order-1">
                <FormLabel>Nome do produto</FormLabel>
                <FormControl>
                  <Input placeholder="Nome" {...field} />
                </FormControl>
                <FormDescription>Entre 3 e 80 caracteres</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="description"
            render={({ field }) => (
              <FormItem className="md:order-3 md:col-span-2 ">
                <FormLabel>Descrição do produto</FormLabel>
                <FormControl>
                  <Input placeholder="Descrição" {...field} />
                </FormControl>
                <FormDescription>Máx. 500 caracteres</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="price"
            render={({ field }) => (
              <FormItem className="md:order-2">
                <FormLabel>Preço (R$)</FormLabel>
                <FormControl>
                  <Input placeholder="Preço" type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="images"
            render={({ field }) => (
              <FormItem className="md:order-4 md:col-span-2">
                <FormLabel>Imagem</FormLabel>
                <FormControl>
                  <DragDropInput
                    field={field}
                    uploadProgress={uploadProgress}
                    uploadStatus={uploadStatus}
                    isDirty={form.getFieldState("images").isDirty}
                  />
                </FormControl>
                <FormDescription>Suas imagens aparecerão aqui</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-2 place-items-center md:order-5">
            <FormField
              name="customMeasure"
              render={({ field }) => (
                <FormItem className="flex flex-col items-center">
                  <FormLabel>Sob medida</FormLabel>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="promptDelivery"
              render={({ field }) => (
                <FormItem className="flex flex-col items-center">
                  <FormLabel>Pronta Entrega</FormLabel>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <FormField
            name="type"
            render={({ field }) => (
              <FormItem className="md:order-6">
                <FormLabel>Tipo</FormLabel>
                <FormControl>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="amigurumi">Amigurumis</SelectItem>
                      <SelectItem value="clothing">Roupas</SelectItem>
                      <SelectItem value="accessory">Acessórios</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormDescription>
                  Seção da loja que o produto deve aparecer
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            disabled={isPending}
            className="w-full py-6 rounded-sm md:order-7 md:col-span-2"
          >
            {isPending ? <Loader className="animate-spin" /> : "Cadastrar"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
