import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Send } from "lucide-react";
import { Badge } from "./ui/badge";

type ProductCardProps = {
  item: {
    name: string;
    description: string;
    price: number;
    type: string;
    customMeasure: boolean;
    promptDelivery: boolean;
    images: string[];
    id: string;
  };
  variant?: "default" | "store";
};

export function ProductCard({ item, variant = "default" }: ProductCardProps) {
  const variantsStyle = {
    default:
      "hover:ring hover:ring-offset-8 hover:ring-primary-light/80 transition-shadow",
    store: "",
  };

  const formattedPrice = item.price.toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL",
  });

  return (
    <Link href={`/store/${item.id}`}>
      <li
        className={`
          flex
          flex-col
          cursor-pointer
          rounded-lg
          w-full
          h-full
          gap-4
          group
          ${variantsStyle[variant]}
      `}
      >
        <picture className="relative w-full min-h-36 rounded-lg overflow-hidden">
          <Image
            src={item.images[0]}
            fill
            sizes="(min-width: 800px) 50vw, 100vw"
            alt={item.name}
            className="object-cover group-hover:scale-105 transition-transform"
          />
        </picture>
        <div className="flex flex-col justify-between font-medium h-full">
          <header className="flex flex-col gap-2">
            <div className="flex justify-between">
              <h3>{item.name}</h3>
              {variant !== "store" && (
                <ArrowRight
                  size={22}
                  className="group-hover:text-primary group-hover:-rotate-45 transition-transform"
                />
              )}
            </div>
            <p className="text-black/60">{item.description}</p>
            <div className="space-x-2">
              {item.customMeasure && <Badge>Sob medida</Badge>}
              {item.promptDelivery && (
                <Badge variant="secondary">Pronta entrega</Badge>
              )}
            </div>
          </header>
          <footer className="flex items-center justify-between mt-3">
            <span className="text-lg">{formattedPrice}</span>
            {variant === "store" && (
              <button
                className="
                  flex
                  items-center
                  gap-3
                  py-2
                  px-5
                  border-2
                  border-gray-300
                  rounded-2xl
                  hover:border-indigo-400
                  hover:bg-indigo-50
                  transition-colors
                "
              >
                <Send /> Eu quero!
              </button>
            )}
          </footer>
        </div>
      </li>
    </Link>
  );
}
