import Image from "next/image";
import Link from "next/link";

import { GradientText, HighlightedText } from "@/lib/StyledText";
import { ExternalLink } from "@/lib/ExternalLink";
import { WavyBg } from "@/lib/WavyBg";

import { Button } from "./ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { ChevronRight } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

export function About() {
  return (
    <section
      id="about"
      className="
            flex
            flex-col
            items-center
            bg-primary
            text-white
            px-0
        "
    >
      <WavyBg className="px-9 max-w-screen-md">
        <h1>Sobre mim</h1>
        <picture className="bg-gradient-to-br from-secondary to-secondary-foreground p-2 rounded-full">
          <Image
            src="/images/profile.jpeg"
            width={200}
            height={200}
            alt="Profile Picture"
            className="rounded-full border-8 border-primary"
          />
        </picture>
        <div className="text-center">
          <p className="text-2xl leading-relaxed font-semibold mb-10">
            Olá! <span className="font-normal">👋</span>
            <br /> Sou <GradientText>Marina Tavares</GradientText>, a artista
            por trás dessas peças únicas de crochê.
          </p>
          <p className="leading-relaxed text-lg">
            Meu objetivo é trazer conforto e beleza para sua vida através de{" "}
            <HighlightedText>
              produtos artesanais de alta qualidade
            </HighlightedText>
            . Navegue pela minha loja e encontre o presente perfeito ou algo
            especial para você.
          </p>
        </div>
        <div className="w-full">
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>Artesanato de Qualidade</AccordionTrigger>
              <AccordionContent>
                Cada peça é feita com atenção aos detalhes, utilizando materiais
                de alta qualidade para garantir durabilidade e beleza.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Personalização</AccordionTrigger>
              <AccordionContent>
                Valorizo a individualidade de cada cliente, oferecendo opções
                personalizadas para atender às suas necessidades e preferências.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Cliente em Primeiro Lugar</AccordionTrigger>
              <AccordionContent>
                Meu compromisso é com a satisfação do cliente, oferecendo um
                atendimento personalizado e um relacionamento transparente e
                confiável.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>Sob Encomenda</AccordionTrigger>
              <AccordionContent>
                Produtos feitos sob encomenda podem exigir mais tempo para
                produção. O tempo de entrega pode variar entre 1 a 3 semanas,
                dependendo da complexidade da peça e do volume de pedidos no
                momento.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        <div className="flex flex-col gap-10 lg:flex-row lg:items-center">
          <Link href="/store">
            <Button variant="secondary" className="p-7 px-8 gap-4 shadow-sm">
              Navegar a loja
              <ChevronRight
                color="#FFF"
                className="bg-primary rounded-full p-0.5"
              />
            </Button>
          </Link>
          <ExternalLink href="https://wa.me/5548991190544">
            <Button variant="link">
              Entre em contato
              <FaWhatsapp color="#FFF" size={24} />
            </Button>
          </ExternalLink>
        </div>
      </WavyBg>
    </section>
  );
}
