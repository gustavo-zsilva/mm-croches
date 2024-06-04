import { Hero } from "@/components/Hero";
import { ProductCard } from "@/components/ProductCard";
import { StoreSection } from "@/components/StoreSection";
import { StoreJumpCard } from "@/components/StoreJumpCard";

export default async function Store() {
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
        {Array.from({ length: 10 }).map(_ => (
          <ProductCard item={{
            description: "Description",
            imagePath: "top",
            name: "Top",
            underMeasure: false,
            price: 10.99
          }}
          variant="store"
          />
        ))}
      </StoreSection>
    </main>
  )
}
