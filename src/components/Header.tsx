'use client'

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function Header() {
    const pathname = usePathname()

    return (
        <header className="flex flex-col items-center">
            <Image
                width={150}
                height={150}
                src="/logo.png"
                alt="Logo"
            />
            <nav className="flex gap-8 flex-wrap">
                <Link href="#" className={pathname === "/" ? 'font-bold underline underline-offset-8 decoration-2' : ''}>Início</Link>
                <Link href="#">Sobre</Link>
                <Link href="#">Loja</Link>
                <button>Contato</button>
            </nav>
        </header>
    )
}