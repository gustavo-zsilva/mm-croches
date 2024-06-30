import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/firebase";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { DraftingCompass, Zap } from "lucide-react";

type ProductPageProps = {
  params: {
    id: string;
  };
};

type Product = {
  images: string[];
  name: string;
  price: number;
  description: string;
  customMeasure: boolean;
  promptDelivery: boolean;
  type: string;
};

export default async function Product({ params }: ProductPageProps) {
  const docRef = doc(db, "products", params.id);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) return <h1>Item não encontrado</h1>;

  const product = docSnap.data() as Product;

  return (
    <main className="min-h-screen flex flex-col gap-6">
      <Carousel className="w-full max-w-xl" opts={{ loop: true }}>
        <CarouselContent>
          {product.images.map((image, index) => (
            <CarouselItem key={index} className="flex justify-center">
              <picture className="relative w-full h-[300px]">
                <Image
                  src={image}
                  fill
                  // width={400}
                  // height={400}
                  className="object-cover"
                  alt="Product Image"
                />
              </picture>
            </CarouselItem>
          ))}
        </CarouselContent>
        {/* <CarouselPrevious /> */}
        {/* <CarouselNext /> */}
      </Carousel>
      <div className="flex flex-col gap-3 px-6 font-medium">
        <header className="flex items-center justify-between">
          <h2 className="font-medium">{product.name}</h2>
          <div className="space-x-2">
            <AlertDialog>
              <AlertDialogTrigger className="bg-teal-400 p-2 rounded-md">
                <Zap color="white" />
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Prompt Delivery</AlertDialogTitle>
                  <AlertDialogDescription>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Alias amet placeat labore, magni corrupti non necessitatibus
                    laboriosam. Similique minus ad laudantium aut corrupti
                    fugiat eos repellat tenetur cum. Asperiores, laborum.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogAction className="w-fit self-end rounded-md bg-black hover:bg-black/75">
                    Entendi!
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <AlertDialog>
              <AlertDialogTrigger className="bg-primary-light p-2 rounded-md">
                <DraftingCompass color="white" />
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Prompt Delivery</AlertDialogTitle>
                  <AlertDialogDescription>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Alias amet placeat labore, magni corrupti non necessitatibus
                    laboriosam. Similique minus ad laudantium aut corrupti
                    fugiat eos repellat tenetur cum. Asperiores, laborum.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogAction className="w-fit self-end rounded-md bg-black hover:bg-black/75">
                    Entendi!
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </header>
        <p className="font-normal">{product.description}</p>
        <span>{product.customMeasure && <Badge>Sob Medida</Badge>}</span>
        <span className="text-xl">R$ {product.price}</span>
        <Button variant="outline" className="border-2 rounded-sm py-6">
          Encomendar
        </Button>
      </div>
    </main>
  );
}
