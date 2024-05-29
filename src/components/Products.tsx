import { promises as fs } from 'fs'
import { ProductCard } from './ProductCard'

type Product = {
    imagePath: string,
    name: string,
    price: number,
    description: string,
}

export async function Products() {
    const file = await fs.readFile(process.cwd() + '/products.json', 'utf-8')
    const products: Product[] = JSON.parse(file)

    return (
        <section className="flex flex-col px-6 items-center gap-10">
            <h1 className="font-semibold text-2xl">Algumas peças</h1>
            <ul className="flex flex-col w-full gap-6">
                {products.map(product => <ProductCard key={product.name} item={product} />)}
            </ul>
        </section>
    )
}