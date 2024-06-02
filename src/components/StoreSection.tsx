import { ReactNode } from "react";

type StoreSectionProps = {
    title: string,
    description?: string,
    children: ReactNode,
}

export function StoreSection({ title, description, children }: StoreSectionProps) {
    return (
        <section className="flex flex-col gap-6">
            <header className="my-6 space-y-4 text-center">
                <h2 className="text-2xl">{title}</h2>
                <p className="text-gray-400">{description}</p>
            </header>
            {children}
        </section>
    )
}