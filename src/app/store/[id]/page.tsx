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
import { CircleCheckBig, DraftingCompass, Zap } from "lucide-react";
import { ExternalLink } from "@/lib/ExternalLink";

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
    <main className="min-h-screen max-w-screen-xl m-auto w-full flex flex-col gap-6 md:grid md:grid-cols-2 md:px-5">
      <Carousel className="w-full" opts={{ loop: true }}>
        <CarouselContent>
          {product.images.map((image, index) => (
            <CarouselItem key={index}>
              <picture className="relative flex w-full h-[300px] md:h-[460px] md:rounded-md md:overflow-hidden">
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
        <CarouselPrevious className="hidden" />
        <CarouselNext className="hidden" />
      </Carousel>
      <div className="flex flex-col gap-3 px-6 font-medium">
        <header className="flex items-center justify-between">
          <h2 className="font-medium">{product.name}</h2>
          <div className="space-x-2">
            {product.promptDelivery && (
              <AlertDialog>
                <AlertDialogTrigger className="bg-teal-400 p-2 rounded-md">
                  <Zap color="white" />
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle className="flex items-center gap-3">
                      <Zap />
                      Pronta Entrega
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      Este item está disponível para pronta entrega! Compre
                      agora e receba rapidamente, sem esperar pelo tempo de
                      produção. Aproveite a qualidade artesanal com a
                      conveniência de uma entrega rápida.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogAction className="w-fit self-end rounded-md bg-black hover:bg-black/75">
                      Entendi!
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}

            {product.customMeasure && (
              <AlertDialog>
                <AlertDialogTrigger className="bg-primary-light p-2 rounded-md">
                  <DraftingCompass color="white" />
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle className="flex items-center gap-3">
                      <DraftingCompass />
                      Sob Medida
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      Personalize este item de crochê para atender às suas
                      preferências. Escolha as cores, tamanhos e detalhes que
                      desejar, e nós criaremos algo único e especial só para
                      você. Qualidade artesanal adaptada ao seu gosto.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogAction className="w-fit self-end rounded-md bg-black hover:bg-black/75">
                      Entendi!
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </div>
        </header>
        <p className="font-normal">{product.description}</p>
        <span>{product.customMeasure && <Badge>Sob Medida</Badge>}</span>
        <div className="flex flex-col gap-1">
          <span className="text-gray-600">Preço Total</span>
          <div className="flex items-center gap-5">
            <span className="text-3xl">R$ {product.price}</span>
            {/* <span className="text-xl line-through decoration-2 text-gray-500 font-normal">
              R$ {product.price}
            </span> */}
          </div>
        </div>
        <AlertDialog>
          <AlertDialogTrigger className="w-full">
            <Button
              variant="outline"
              className="border-2 border-accent-foreground w-full rounded-sm py-6 mt-6"
            >
              Encomendar
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Para facilitar seu atendimento:
              </AlertDialogTitle>
              <AlertDialogDescription>
                Mande nossa mensagem de modelo para um atendimento mais ágil:
                <p className="bg-primary-light my-2 p-2 text-white font-semibold text-base rounded-sm">
                  Olá, estou interessado no produto {product.name} disponível no
                  seu site.
                </p>
                Por uma questão de escala, por enquanto estamos trabalhando com
                clientes diretamente. Obrigado pela paciência.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="py-6">Voltar</AlertDialogCancel>
              <AlertDialogAction className="bg-teal-500 hover:bg-teal-400 rounded-sm py-6">
                <ExternalLink
                  className="flex items-center gap-4"
                  href="https://ig.me/m/mm.cozycrochet"
                >
                  Continuar com a compra
                  <CircleCheckBig />
                </ExternalLink>
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </main>
  );
}
