import Image from "next/image"
import { dancingScript } from "@/utils/fonts"
import { AiOutlineShoppingCart } from 'react-icons/ai'

import { Button } from '@/components/ui/button'

export function Main() {
    return (
        <main className="flex flex-col justify-center items-center px-6 gap-6">
            <h1 className={`${dancingScript.className} font-bold text-5xl text-center`}>Feitos à mão,<br />com amor.</h1>
            <Image
                src="/images/hero.png"
                width={250}
                height={250}
                alt="Hero"
            />
            <Button className="p-7 px-8 gap-4 rounded-full font-semibold text-md text-white shadow-sm">
                Comprar agora
                <AiOutlineShoppingCart size={22} />
            </Button>
        </main>
    )
}