'use client';

import Image from 'next/image';
import { useCart } from '@/src/contexts/CartContext';
import Link from 'next/link';

export function Header() {
    const { items } = useCart();
    const totalItems = items.reduce((total, item) => total + item.quantity, 0);

    return (
        <header className="bg-colmeia-blue text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link href="/">
                    <Image
                        src="/images/colmeia-logo.svg"
                        alt="Logo Colmeia Store"
                        width={120}
                        height={30}
                        priority
                    />
                </Link>
                <nav>
                    <Link href="/cart">
                        Carrinho ({totalItems})
                    </Link>
                </nav>
            </div>
        </header>
    );
}
