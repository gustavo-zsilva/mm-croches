import Image from 'next/image'
import { promises as fs } from "fs";
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel'

type ProductPageProps = {
    params: {
        id: string,
    }
}

type Product = {
  imagePath: string;
  name: string;
  price: number;
  description: string;
  underMeasure: boolean;
};

export default async function Product({ params }: ProductPageProps) {
    const file = await fs.readFile(process.cwd() + "/products.json", "utf-8");
    const products: Product[] = JSON.parse(file);

    const product = products.find(item => item.imagePath === params.id)

    if (!product) return <h1>Item não encontrado</h1>

    return (
        <main className="min-h-screen flex flex-col gap-6 justify-center">
            <Carousel className="w-full max-w-xs">
                <CarouselContent>
                        {Array.from({ length: 6 }).map((_, index) => (
                            <CarouselItem key={index} className="">
                                <picture>
                                    <Image
                                        src={`/images/products/${product.imagePath}.jpg`}
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
                <span>{product.underMeasure && <Badge>Sob Medida</Badge>}</span>
                <span className="text-xl font-semibold">R$ {product.price}</span>
                <p>{product.description}</p>
                <Button>
                    Encomendar
                </Button>
            </div>
        </main>
    )
}