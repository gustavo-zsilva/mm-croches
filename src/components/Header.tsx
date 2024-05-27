'use client'

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function Header() {
    const pathname = usePathname()

    return (
        <header className="flex flex-col items-center py-4 gap-4 px-6">
            <Image
                width={90}
                height={90}
                src="/images/logo.png"
                alt="Logo"
            />
            <nav className="flex gap-8 flex-wrap">
                <Link href="#" className={pathname === "/" ? 'font-bold underline underline-offset-8 decoration-2' : ''}>Home</Link>
                <Link href="#">Sobre</Link>
                <Link href="#">Loja</Link>
                <button>Contato</button>
            </nav>
        </header>
    )
}