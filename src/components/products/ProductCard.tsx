'use client';

import { useCart } from '@/src/contexts/CartContext';
interface Product {
    id: number;
    name: string;
    price: number;
    image: string;
}

interface ProductCardProps {
    product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
    const { addToCart } = useCart();

    const handleAddToCart = () => {
        addToCart(product.id, product.name, product.price);
    }

   return (
    <div className="border rounded-lg p-4 flex flex-col items-center">
        <img
         src={product.image} 
         alt={product.name} 
         width={300}
         height={200}
         className="mb-2"
         />
        <h2 className="text-lg font-semibold">{product.name}</h2>
        <p className="text-xl font-bold">R$ {product.price.toFixed(2)}</p>
        <button
            onClick={handleAddToCart}
            className="cursor-pointer mt-4 bg-colmeia-yellow text-colmeia-blue font-semibold px-4 py-2 rounded hover:opacity-90">
            Adicionar ao Carrinho
        </button>
    </div>
   ) 
};
