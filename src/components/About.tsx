import { dancingScript } from "@/utils/fonts";
import Image from "next/image";

export function About() {
    return (
        <section className="flex flex-col items-center px-6">
            <picture className="bg-gradient-to-br from-blue-600 to-blue-950 p-2 rounded-full">
                <Image
                    src="/images/profile.jpeg"
                    width={140}
                    height={140}
                    alt="Profile Picture"
                    className="rounded-full border-8 border-bgColor"
                />
            </picture>
            <div className="text-center mt-10">
                <p className={`text-2xl font-semibold `}>
                    Olá! 👋<br/> Sou Marina Tavares, a artista por trás
                    dessas peças únicas de crochê.
                </p>
                <p>
                    Meu objetivo é trazer conforto e beleza para sua
                    vida através de produtos artesanais de alta
                    qualidade. Navegue pela minha loja e encontre
                    o presente perfeito ou algo especial para você.
                </p>
            </div>
        </section>
    )
}