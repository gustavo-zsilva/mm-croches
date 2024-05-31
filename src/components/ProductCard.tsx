import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Badge } from "./ui/badge";

type ProductCardProps = {
  item: {
    imagePath: string;
    name: string;
    price: number;
    description: string;
    underMeasure: boolean;
  };
};

export function ProductCard({ item }: ProductCardProps) {
  return (
    <li className="flex flex-col cursor-pointer rounded-lg w-full gap-4 group hover:ring hover:ring-offset-8 hover:ring-primary-light/80 transition-shadow">
      <picture className="relative w-full h-36 rounded-lg overflow-hidden">
        <Image
          src={`/images/products/${item.imagePath}.jpg`}
          fill
          sizes="(min-width: 800px) 50vw, 100vw"
          alt={item.name}
          className="object-cover group-hover:scale-105 transition-transform"
        />
      </picture>
      <div className="flex flex-col gap-1 font-medium">
        <header className="flex justify-between">
          <h3>{item.name}</h3>
          <ArrowRight
            size={22}
            className="group-hover:text-primary group-hover:-rotate-45 transition-transform"
          />
        </header>
        <p className="text-black/60">{item.description}</p>
        <footer className="flex items-center justify-between">
          <span>{item.price}</span>
          {item.underMeasure && <Badge>Sob medida</Badge>}
        </footer>
      </div>
    </li>
  );
}
