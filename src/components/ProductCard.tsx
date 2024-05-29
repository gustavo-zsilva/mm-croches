import Image from 'next/image'

type ProductCardProps = {
    item: {
        imagePath: string,
        name: string,
        price: number,
        description: string,
    }
}

export function ProductCard({ item }: ProductCardProps) {
    return (
        <li className="flex flex-col cursor-pointer rounded-lg w-full gap-4 hover:ring-4 hover:ring-gray-300 hover:ring-offset-8 transition-shadow">
            <picture className="relative w-full h-36 rounded-lg overflow-hidden">
                <Image
                    src={`/images/products/${item.imagePath}.jpg`}
                    fill
                    sizes="(min-width: 800px) 50vw, 100vw"
                    alt={item.name}
                    className="object-cover"
                />
            </picture>
            <div className="flex flex-col gap-1 font-medium">
                <h3>{item.name}</h3>
                <p className="text-black/60">{item.description}</p>
                <span>{item.price}</span>
            </div>
        </li>
    )
}