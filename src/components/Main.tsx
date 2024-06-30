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
    <main className="flex flex-col justify-center items-center px-6 gap-6 max-w-screen-xl lg:grid lg:grid-cols-2 lg:place-items-center lg:m-auto lg:pt-28 lg:gap-10">
      <h1
        className={`${dancingScript.className} font-bold text-5xl text-center lg:text-6xl`}
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
        opts={{ loop: true }}
        className="w-full max-w-xs min-h-20 lg:row-span-2"
      >
        <CarouselContent>
          {images.map((item) => (
            <CarouselItem key={item}>
              <div className="flex justify-center">
                <Image
                  src={`/images/carousel/${item}.png`}
                  width={350}
                  height={350}
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
