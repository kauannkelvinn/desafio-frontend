'use client';

import { useCart } from '@/src/contexts/CartContext';
import Link from 'next/link';

export default function CartPage() {
    const { items } = useCart();

    const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

    return (
        <div>
            <h1 className='text-3xl font-bold mb-6'>Seu Carrinho</h1>

            {items.length === 0 ? (
                <p>Seu carrinho está vazio</p>
            ) : (
                <>
                    <div className='space-y-4'>
                        .{items.map((item) => (
                            <div key={item.id} className="flex justify-between items-center border-b pb-2">
                                <div>
                                    <h2 className='text-lg font-semibold'>{item.name}</h2>
                                    <p className="text-gray-500">Quantidade: {item.quantity}</p>
                                </div>
                                <p className='text-lg font-bold'>
                                    R$ {(item.price * item.quantity).toFixed(2)}
                                </p>
                            </div>
                        ))}
                        <div>
                            <p>Total: R$ {total.toFixed(2)}</p>
                        </div>

                        <div className='flex justify-end mt-6'>
                            <Link href="/checkout">
                                <button className='cursor-pointer bg-colmeia-yellow text-colmeia-blue font-semibold px-6 py-2 rounded-lg hover:opacity-90'>
                                    Ir para o Chekout
                                </button>
                            </Link>
                        </div>
                    </div>
                </>
            )}
        </div>

    )
};
