import { promises as fs } from "fs";
import Link from "next/link";
import { ProductCard } from "./ProductCard";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";

type Product = {
  imagePath: string;
  name: string;
  price: number;
  description: string;
  underMeasure: boolean;
};

export async function Products() {
  const file = await fs.readFile(process.cwd() + "/products.json", "utf-8");
  const products: Product[] = JSON.parse(file);

  return (
    <section className="flex flex-col items-center gap-10">
      <h1 className="text-primary">Algumas peças</h1>
      <ul className="flex flex-col w-full gap-6">
        {products.map((product) => (
          <ProductCard key={product.name} item={product} />
        ))}
      </ul>
      <Link href="/store" className="w-full">
        <Button className="p-7 rounded-lg w-full justify-between shadow-sm">
          Ver todos
          <ArrowRight />
        </Button>
      </Link>
    </section>
  );
}
