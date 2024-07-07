import { Badge } from "@/components/ui/badge";

import {
  doc,
  getDoc,
  collection,
  query,
  where,
  limit,
  getDocs,
} from "firebase/firestore";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  Check,
  CircleAlert,
  CircleCheckBig,
  DraftingCompass,
  Info,
  Zap,
} from "lucide-react";
import { ExternalLink } from "@/lib/ExternalLink";
import { Carousel } from "@/components/store/Carousel";
import { RelatedProducts } from "@/components/store/RelatedProducts";

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

interface RelatedProduct extends Product {
  id: string;
}

export default async function Product({ params }: ProductPageProps) {
  const docRef = doc(db, "products", params.id);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) return <h1>Item não encontrado</h1>;

  const product: Product = JSON.parse(JSON.stringify(docSnap.data()));

  const productsRef = collection(db, "products");
  const q = query(
    productsRef,
    where("type", "==", product.type),
    where("__name__", "!=", params.id),
    limit(12),
  );
  const querySnapshot = await getDocs(q);

  const relatedProducts: RelatedProduct[] = [];
  querySnapshot.forEach((doc) => {
    relatedProducts.push({ ...(doc.data() as Product), id: doc.id });
  });

  const formattedPrice = product.price.toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL",
  });

  return (
    <main className="min-h-screen max-w-screen-xl m-auto w-full flex flex-col gap-6 md:grid md:grid-cols-2 md:px-5">
      <Carousel product={product} />
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
            <span className="text-3xl">{formattedPrice}</span>
            {/* <span className="text-xl line-through decoration-2 text-gray-500 font-normal">
              R$ {product.price}
            </span> */}
          </div>
        </div>
        <AlertDialog>
          <AlertDialogTrigger className="w-full border-2 border-accent-foreground rounded-sm py-3 mt-6 bg-background hover:bg-accent hover:text-accent-foreground">
            Encomendar
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Para facilitar seu atendimento:
              </AlertDialogTitle>
              <AlertDialogDescription>
                Mande nossa mensagem de modelo para um atendimento mais ágil:{" "}
                <br />
                <blockquote className="bg-primary-light my-2 p-2 text-white font-semibold text-base rounded-sm">
                  Olá, estou interessado no produto {product.name} disponível no
                  seu site.
                </blockquote>
                <br />
                Por uma questão de escala, por enquanto estamos trabalhando com
                clientes diretamente. Obrigado pela paciência.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="py-6 rounded-sm">
                Voltar
              </AlertDialogCancel>
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
        <div className="flex flex-col gap-2 mt-6 md:items-start">
          <Popover>
            <PopoverTrigger>
              <p className="flex flex-1 items-center justify-center gap-2">
                <Check className="text-teal-500" />
                Garantia de 1 mês
                <Info size={22} />
              </p>
            </PopoverTrigger>
            <PopoverContent>
              Nossa garantia cobre defeitos de fabricação e problemas no
              transporte. Entre em contato conosco após o recebimento se houver
              qualquer defeito ou dano.
              <br />
              <b>Importante:</b> A garantia não cobre danos causados por uso
              indevido, como rasgos ou desgaste natural. Envie uma mensagem com
              descrição e fotos do problema para nosso atendimento ao cliente.
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger>
              <p className="flex flex-1 items-center justify-center gap-2">
                <Check className="text-teal-500" />
                Entrega rápida <Info size={22} />
              </p>
            </PopoverTrigger>
            <PopoverContent>
              Receba seu produto de crochê em até 2 semanas! Aproveite a
              conveniência da nossa entrega rápida para garantir que seu item
              chegue logo até você.
            </PopoverContent>
          </Popover>
          <p className="flex flex-1 items-center justify-center gap-2">
            <Check className="text-teal-500" />
            Qualidade Garantida
          </p>
        </div>
        {product.type === "amigurumi" && (
          <div className="mt-6">
            <p className="flex items-center gap-2">
              <CircleAlert /> Preço pode variar de acordo com o tamanho do
              amigurumi
            </p>
          </div>
        )}
      </div>
      <RelatedProducts products={relatedProducts} />
    </main>
  );
}
