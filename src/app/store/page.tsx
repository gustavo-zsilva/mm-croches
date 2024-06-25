import { Hero } from "@/components/Hero";
import { ProductCard } from "@/components/ProductCard";
import { StoreSection } from "@/components/StoreSection";
import { StoreJumpCard } from "@/components/StoreJumpCard";

import { collection, getDocs } from "firebase/firestore";
import { getStorage, ref, listAll, getDownloadURL, StorageReference } from "firebase/storage"

import { db } from "@/lib/firebase/firebase";

type Product = {
  name: string,
  description: string,
  price: number,
  type: string,
  customMeasure: boolean,
  prompDelivery: boolean,
  images: string[],
  id: string,
}

type DocData = {
  name: string,
  description: string,
  price: number,
  type: string,
  customMeasure: boolean,
  prompDelivery: boolean,
}

export default async function Store() {
  const storage = getStorage()
  const listRef = ref(storage, 'uploads')
  const querySnapshot = await getDocs(collection(db, 'products'))

  // Get products
  const docs: any[] = []

  querySnapshot.forEach((doc) => {
    docs.push({
      ...doc.data(),
      images: [],
      id: doc.id,
    })
  })

  // Get images
  const imagesRef = await listAll(listRef)

  async function getImagesUrl(itemRef: StorageReference) {
    try {
      const url = await getDownloadURL(itemRef)
      const imageId = itemRef.name.split('-')[0]
      const doc: Product | undefined = docs.find(doc => doc.id === imageId)
      const docIndex = docs.indexOf(doc)
      
      docs[docIndex].images.push(url)
    } catch (err) {
      console.error(err)
    }
  }

  const imagePromiseList = imagesRef.items.map(itemRef => getImagesUrl(itemRef))

  await Promise.all(imagePromiseList)

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
            key={doc.id}
          />
        ))}
      </StoreSection>
    </main>
  )
}
