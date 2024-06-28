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
import { DocumentData, doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/firebase";

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
    <main className="min-h-screen flex flex-col gap-6 justify-center">
      <Carousel className="w-full max-w-xs">
        <CarouselContent>
          {product.images.map((image, index) => (
            <CarouselItem key={index} className="">
              <picture>
                <Image
                  src={image}
                  // fill
                  width={300}
                  height={300}
                  // className="object-cover"
                  alt="Product Image"
                />
              </picture>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <div className="flex flex-col gap-3 px-6">
        <h2>{product.name}</h2>
        <span>{product.customMeasure && <Badge>Sob Medida</Badge>}</span>
        <span className="text-xl font-semibold">R$ {product.price}</span>
        <p>{product.description}</p>
        <Button>Encomendar</Button>
      </div>
    </main>
  );
}
