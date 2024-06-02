import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Badge } from "./ui/badge";
import { CirclePlus } from "lucide-react";

type ProductCardProps = {
  item: {
    imagePath: string;
    name: string;
    price: number;
    description: string;
    underMeasure: boolean;
  },
  variant?: "default" | "store",
};

export function ProductCard({ item, variant = "default" }: ProductCardProps) {
  const variantsStyle = {
    default: "hover:ring hover:ring-offset-8 hover:ring-primary-light/80 transition-shadow",
    store: "",
  }

  return (
    <li className={`
      flex
      flex-col
      cursor-pointer
      rounded-lg
      w-full
      gap-4
      group
      ${variantsStyle[variant]}
    `}>
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
          {variant !== "store" && <ArrowRight
            size={22}
            className="group-hover:text-primary group-hover:-rotate-45 transition-transform"
          />}
        </header>
        <p className="text-black/60">{item.description}</p>
        <footer className="flex items-center justify-between">
          <span>R$ {item.price}</span>
          {item.underMeasure && variant !== "store" && <Badge>Sob medida</Badge>}
          {variant === "store" &&
            <button className="flex items-center gap-3 py-2 px-5 border-2 border-gray-300 rounded-2xl hover:border-teal-400 hover:bg-teal-50 transition-colors">
              <CirclePlus /> Carrinho
            </button>}
        </footer>
      </div>
    </li>
  );
}
