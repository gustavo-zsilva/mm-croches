import { MoveRight } from 'lucide-react'
import Image from 'next/image'

type StoreJumpCardProps = {
    title: string,
    imagePath: string,
    description: string,
}

export function StoreJumpCard({ title, imagePath, description }: StoreJumpCardProps) {
    return (
        <li className="flex flex-col w-full border-2 border-gray-200 overflow-hidden rounded-2xl shadow-smooth cursor-pointer">
            <picture className="relative w-full h-[200px]">
                <Image
                src={imagePath}
                fill
                className="object-cover"
                alt="Section Cover Image"
                />
            </picture>
            <div className="p-4 pb-10 pt-7 space-y-6">
                <header className="flex items-center justify-between">
                <h1>{title}</h1>
                <MoveRight size={28} />
                </header>
                <p className="text-gray-500">
                {description}
                </p>
            </div>
        </li>
    )
}