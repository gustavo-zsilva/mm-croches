import { ComponentProps, ReactNode } from "react";
import Link from 'next/link';

import { ArrowRight } from "lucide-react";

type StoreSectionProps = ComponentProps<"section"> & {
    title: string,
    description?: string,
    children: ReactNode,
}

export function StoreSection({ title, description, children, ...props }: StoreSectionProps) {
    return (
        <section className="flex flex-col gap-6" {...props}>
            <header className="my-6 space-y-4 text-center">
                <h2 className="text-2xl">{title}</h2>
                <p className="text-gray-400">{description}</p>
            </header>
            {children}
            <Link href="/#contact" className="flex flex-col items-center gap-5 border-2 border-gray-300 rounded-xl px-12 p-10 text-center cursor-pointer">
                <h3 className="text-2xl font-semibold">Não achou o que procurava?</h3>
                <p className="text-gray-500">Entre em contato diretamente e peça sua peça única</p>
                <ArrowRight size={45} />
            </Link>
        </section>
    )
}