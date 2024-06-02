import { dancingScript } from "@/utils/fonts";

export function Hero() {
    return (
        <div className="
            bg-[linear-gradient(rgba(0,0,0,0.6),rgba(0,0,0,0.6)),url(/assets/hero.jpg)]
            bg-cover
            bg-center
            h-[600px]
            w-full
            flex
            flex-col
            justify-center
            items-center
            gap-8
            text-white
            p-9
        ">
            <h1 className={`${dancingScript.className} text-5xl`}>Loja de Crochês</h1>
            <p className="text-lg text-center">Aqui você pode dar uma olhada no catálogo inteiriiiiinho.</p>
        </div>
    )
}