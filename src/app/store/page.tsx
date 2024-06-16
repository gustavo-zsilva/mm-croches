import { Hero } from "@/components/Hero";
import { ProductCard } from "@/components/ProductCard";
import { StoreSection } from "@/components/StoreSection";
import { StoreJumpCard } from "@/components/StoreJumpCard";
import { DocumentData, collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase/firebase";

type Doc = {
  name: string,
  description: string,
  price: number,
  imagesUrl: string,
  type: string,
  customMeasure: boolean,
  prompDelivery: boolean,
}

export default async function Store() {

  const querySnapshot = await getDocs(collection(db, 'products'))

  const docs: any[] = []

  querySnapshot.forEach((doc) => {
    docs.push(doc.data())
    
  })

  console.log(docs);
  

  return (
    <main className="min-h-screen flex flex-col gap-6">
      <Hero />
      <StoreSection title="O que te agrada? ->">
        
        <ul className="flex flex-col items-center gap-10">
          <StoreJumpCard
            title="Amigurumis"
            imagePath="/images/products/yoshi.jpg"
            description="Leve uma companhia para casa!"
          />
          <StoreJumpCard
            title="Roupas"
            imagePath="/images/products/top.jpg"
            description="Pra ficar estiloso(a) o ano inteiro"
          />
          <StoreJumpCard
            title="Acessórios"
            imagePath="/images/products/gorro.jpg"
            description="Se destaque com estas peças"
          />
        </ul>
      </StoreSection>
      <StoreSection title="Amigurumis 🧸" description="Seu próximo bixinho de estimação, a um toque de distância">
        {docs.map((doc) => (
          <ProductCard
            item={doc}
            variant="store"
            key={doc.name}
          />
        ))}
      </StoreSection>
    </main>
  )
}
