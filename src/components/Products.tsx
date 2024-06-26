import { promises as fs } from "fs";
import Link from "next/link";
import { ProductCard } from "./ProductCard";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";

import { query, limit, orderBy, collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase/firebase";

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

export async function Products() {
  const productsRef = collection(db, "products");
  const q = query(productsRef, orderBy("createdAt", "desc"), limit(3));

  const querySnapshot = await getDocs(q);
  const products: Product[] = [];

  querySnapshot.forEach((doc) =>
    products.push({
      ...(doc.data() as DocData),
      id: doc.id,
    }),
  );

  return (
    <section className="flex flex-col items-center gap-10 max-w-screen-xl lg:m-auto lg:gap-20">
      <h1 className="text-primary">Peças recentes</h1>
      <ul className="flex flex-col w-full gap-6 md:grid md:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} item={product} />
        ))}
      </ul>
      <Link href="/store" className="w-full lg:flex lg:justify-center">
        <Button className="p-7 rounded-lg w-full justify-between shadow-sm lg:max-w-screen-md">
          Ver todos
          <ArrowRight />
        </Button>
      </Link>
    </section>
  );
}
