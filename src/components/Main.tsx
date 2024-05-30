"use client";

import Image from "next/image";
import Link from "next/link";

import { dancingScript } from "@/utils/fonts";
import { AiOutlineShoppingCart } from "react-icons/ai";

import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

export function Main() {
  const images = [
    "chameleon",
    "ray",
    "seal",
    "snake",
    "spider",
    "top",
    "turtle",
  ];

  return (
    <main className="flex flex-col justify-center items-center px-6 gap-6 max-w-screen-xl lg:m-auto">
      <h1
        className={`${dancingScript.className} font-bold text-5xl text-center`}
      >
        Feitos à mão,
        <br />
        com amor.
      </h1>

      <Carousel
        plugins={[
          Autoplay({
            delay: 3000,
          }),
        ]}
        className="w-full max-w-xs"
      >
        <CarouselContent>
          {images.map((item) => (
            <CarouselItem key={item}>
              <div className="flex justify-center">
                <Image
                  src={`/images/carousel/${item}.png`}
                  width={250}
                  height={250}
                  alt="Hero"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <Link href="/store">
        <Button className="p-7 px-8 gap-4 text-white shadow-sm">
          Comprar agora
          <AiOutlineShoppingCart size={22} />
        </Button>
      </Link>
    </main>
  );
}
