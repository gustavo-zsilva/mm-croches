import Image from "next/image"
import { dancingScript } from "@/utils/fonts"
import { AiOutlineShoppingCart } from 'react-icons/ai'

export function Main() {
    return (
        <main className="flex flex-col justify-center items-center pt-6 gap-6">
            <h1 className={`${dancingScript.className} font-bold text-5xl text-center`}>Feitos à mão,<br />com amor.</h1>
            <Image
                src="/images/hero.png"
                width={250}
                height={250}
                alt="Hero"
            />
            <button className="flex items-center gap-4 bg-blue-950 text-white p-4 px-8 rounded-full font-semibold shadow-sm hover:bg-blue-900 transition-colors">
                Comprar agora
                <AiOutlineShoppingCart size={22} />
            </button>
        </main>
    )
}