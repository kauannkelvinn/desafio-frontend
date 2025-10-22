'use client';

import { useCart } from '@/src/contexts/CartContext';

export function Header() {
    const { items } = useCart();

    const totalItems = items.reduce((total, item) => total + item.quantity, 0);

    return (
        <header className="bg-zinc-900 text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-xl font-bold">Colmeia Store</h1>
                <nav>
                    <span>Carrinho ({totalItems})</span>
                </nav>
            </div>
        </header>
    )
};
