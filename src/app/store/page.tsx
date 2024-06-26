import { Hero } from "@/components/Hero";
import { ProductCard } from "@/components/ProductCard";
import { StoreSection } from "@/components/StoreSection";
import { StoreJumpCard } from "@/components/StoreJumpCard";

import { collection, getDocs } from "firebase/firestore";

import { db } from "@/lib/firebase/firebase";

type Product = {
  name: string,
  description: string,
  price: number,
  type: string,
  customMeasure: boolean,
  promptDelivery: boolean,
  images: string[],
  id: string,
}

type DocData = {
  name: string,
  description: string,
  price: number,
  type: string,
  customMeasure: boolean,
  promptDelivery: boolean,
  images: string[],
}

export default async function Store() {
  const querySnapshot = await getDocs(collection(db, 'products'))

  // Get products
  const docs: any[] = []

  querySnapshot.forEach((doc) => {
    docs.push({
      ...doc.data(),
      id: doc.id,
    })
  })

  const amigurumiList = docs.filter(doc => doc.type === 'amigurumi')
  const clothingList = docs.filter(doc => doc.type === 'clothing')
  const accessoryList = docs.filter(doc => doc.type === 'accessory')

  return (
    <main className="min-h-screen flex flex-col gap-6">
      <Hero />
      <section>
        <h2 className="my-10 text-2xl text-center">O que te agrada? &gt;</h2>
        <ul className="flex flex-col items-center gap-10">
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
          <ProductCard
            item={doc}
            variant="store"
            key={doc.id}
          />
        ))}
      </StoreSection>
      <StoreSection
        title="Roupas 👚"
        description="Feitos à mão, para servir certinho em você"
        id="clothing"
      >
        {clothingList.map((doc) => (
          <ProductCard
            item={doc}
            variant="store"
            key={doc.id}
          />
        ))}
      </StoreSection>
      <StoreSection
        title="Acessórios 👒"
        description="Para atrair olhares"
        id="accessories"
      >
        {accessoryList.map((doc) => (
          <ProductCard
            item={doc}
            variant="store"
            key={doc.id}
          />
        ))}
      </StoreSection>
    </main>
  )
}
