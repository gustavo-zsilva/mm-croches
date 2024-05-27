import Image from "next/image";

export function About() {
    return (
        <section className="flex flex-col gap-10 items-center text-white bg-mobile bg-no-repeat bg-cover bg-center bg-origin-border pt-32 px-6">
            <h1 className="font-semibold text-2xl">Sobre mim</h1>
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
                <p className={`text-2xl font-semibold `}>
                    Olá! <span className="font-normal">👋</span><br/> Sou Marina Tavares, a artista por trás
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