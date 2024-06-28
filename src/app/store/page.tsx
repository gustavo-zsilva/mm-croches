import Link from "next/link";

import { Hero } from "@/components/Hero";
import { ProductCard } from "@/components/ProductCard";
import { StoreSection } from "@/components/StoreSection";
import { StoreJumpCard } from "@/components/StoreJumpCard";
import { Button } from "@/components/ui/button";

import { collection, getDocs } from "firebase/firestore";

import { db } from "@/lib/firebase/firebase";
import { ArrowUpFromDot } from "lucide-react";

type Product = {
  name: string;
  description: string;
  price: number;
  type: string;
  customMeasure: boolean;
  promptDelivery: boolean;
  images: string[];
  id: string;
};

type DocData = {
  name: string;
  description: string;
  price: number;
  type: string;
  customMeasure: boolean;
  promptDelivery: boolean;
  images: string[];
};

export default async function Store() {
  const querySnapshot = await getDocs(collection(db, "products"));

  // Get products
  const docs: Product[] = [];

  querySnapshot.forEach((doc) => {
    docs.push({
      ...doc.data() as DocData,
      id: doc.id,
    });
  });

  const amigurumiList = docs.filter((doc) => doc.type === "amigurumi");
  const clothingList = docs.filter((doc) => doc.type === "clothing");
  const accessoryList = docs.filter((doc) => doc.type === "accessory");

  return (
    <main className="min-h-screen flex flex-col gap-20 items-center">
      <Hero />
      <section className="max-w-screen-xl w-full" id="nav">
        <h2 className="my-10 text-2xl text-center lg:text-left">
          O que te agrada? &gt;
        </h2>
        <ul className="flex flex-col gap-10 md:flex-row md:gap-5">
          <StoreJumpCard
            title="Amigurumis"
            imagePath="/images/products/yoshi.jpg"
            description="Leve uma companhia para casa!"
            href="amigurumis"
          />
          <StoreJumpCard
            title="Roupas"
            imagePath="/images/products/top.jpg"
            description="Pra ficar estiloso(a) o ano inteiro"
            href="clothing"
          />
          <StoreJumpCard
            title="Acessórios"
            imagePath="/images/products/gorro.jpg"
            description="Se destaque com estas peças"
            href="accessories"
          />
        </ul>
      </section>
      <StoreSection
        title="Amigurumis 🧸"
        description="Seu próximo bixinho de estimação, a um toque de distância"
        id="amigurumis"
      >
        {amigurumiList.map((doc) => (
          <ProductCard item={doc} variant="store" key={doc.id} />
        ))}
      </StoreSection>
      <StoreSection
        title="Roupas 👚"
        description="Feitos à mão, para servir certinho em você"
        id="clothing"
      >
        {clothingList.map((doc) => (
          <ProductCard item={doc} variant="store" key={doc.id} />
        ))}
      </StoreSection>
      <StoreSection
        title="Acessórios 👒"
        description="Para atrair olhares"
        id="accessories"
      >
        {accessoryList.map((doc) => (
          <ProductCard item={doc} variant="store" key={doc.id} />
        ))}
      </StoreSection>
      <section className="w-full max-w-screen-xl">
        <Link href="/store/#nav">
          <Button
            variant="outline"
            className="rounded-sm w-full py-6 text-gray-600"
          >
            Voltar ao topo
            <ArrowUpFromDot size={20} />
          </Button>
        </Link>
      </section>
    </main>
  );
}
