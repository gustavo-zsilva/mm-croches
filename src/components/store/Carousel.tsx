"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import {
  Carousel as CarouselWrapper,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { type CarouselApi } from "@/components/ui/carousel";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
} from "@/components/ui/alert-dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

import { X } from "lucide-react";

type Product = {
  images: string[];
  name: string;
  price: number;
  description: string;
  customMeasure: boolean;
  promptDelivery: boolean;
  type: string;
};

type CarouselProps = {
  product: Product;
};

export function Carousel({ product }: CarouselProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <div className="flex flex-col items-center">
      <AlertDialog open={isModalOpen}>
        <AlertDialogContent
          className="w-full"
          onClick={() => setIsModalOpen(false)}
        >
          <VisuallyHidden>
            <AlertDialogTitle>Visualização da foto completa</AlertDialogTitle>
          </VisuallyHidden>
          <picture className="relative flex w-full h-[400px]">
            <button
              onClick={() => setIsModalOpen(false)}
              className="bg-black/35 rounded-full w-fit p-1 absolute -right-2 -top-2 z-10"
            >
              <X color="white" />
            </button>
            <Image
              src={product.images[current - 1]}
              alt="Foto do produto"
              fill
              className="object-contain"
            />
          </picture>
          <span className="text-center">Foto {current}</span>
          <VisuallyHidden>
            <AlertDialogDescription>
              Visualização da foto completa
            </AlertDialogDescription>
          </VisuallyHidden>
        </AlertDialogContent>
      </AlertDialog>
      <CarouselWrapper className="w-full" opts={{ loop: true }} setApi={setApi}>
        <CarouselContent
          onClick={() => setIsModalOpen(!isModalOpen)}
          className="cursor-pointer"
        >
          {product.images.map((image, index) => (
            <CarouselItem key={index}>
              <picture className="relative flex w-full h-[300px] md:h-[460px] md:rounded-md md:overflow-hidden">
                <Image
                  src={image}
                  fill
                  className="object-cover"
                  alt="Product Image"
                />
              </picture>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden xl:flex" />
        <CarouselNext className="hidden xl:flex" />
      </CarouselWrapper>
      <span className="mt-2 text-gray-500">
        {current} de {count}
      </span>
    </div>
  );
}
