'use client';



import { useCart } from '@/src/contexts/CartContext';
import Link from 'next/link';

export function Header() {
    const { items } = useCart();

    const totalItems = items.reduce((total, item) => total + item.quantity, 0);

    return (
        <header className="bg-zinc-900 text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link href="/">
                    <h1 className="text-xl font-bold">Colmeia Store</h1>
                </Link>


                
                <nav>
                    <Link href="/cart">
                        <span>Carrinho ({totalItems})</span>
                    </Link>
                </nav>
            </div>
        </header>
    )
};
