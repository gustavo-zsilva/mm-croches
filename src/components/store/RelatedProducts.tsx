import { ProductCard } from "../ProductCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

type Product = {
  images: string[];
  name: string;
  price: number;
  description: string;
  customMeasure: boolean;
  promptDelivery: boolean;
  type: string;
  id: string;
};

type RelatedProductsProps = {
  products: Product[];
};

export function RelatedProducts({ products }: RelatedProductsProps) {
  return (
    <section className="flex flex-col w-full gap-6 md:col-span-2 md:px-0">
      <h2>Produtos semelhantes</h2>
      <ul className="flex">
        <Carousel className="w-full">
          <CarouselContent>
            {products.map((product) => (
              <CarouselItem key={product.id} className="basis-1/12 min-w-60">
                <ProductCard item={product} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden xl:flex" />
          <CarouselNext className="hidden xl:flex" />
        </Carousel>
      </ul>
    </section>
  );
}
