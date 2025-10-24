'use client';

import { useCart } from '@/src/contexts/CartContext';
import Link from 'next/link';

export default function CartPage() {
  const { items, increaseQuantity, decreaseQuantity, removeFromCart } = useCart();

  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Seu Carrinho</h1>

      {items.length === 0 ? (
        <p>Seu carrinho está vazio.</p>
      ) : (
        <>
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between items-center border-b pb-4">
                <div>
                  <h2 className="text-lg font-semibold">{item.name}</h2>
                  <p className="text-gray-600">R$ {item.price.toFixed(2)} / unidade</p>
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="cursor-pointer text-red-500 hover:text-red-700 text-sm mt-1"
                  >
                    Remover
                  </button>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 border rounded-md p-1">
                    <button onClick={() => decreaseQuantity(item.id)} className="cursor-pointer px-2 font-bold">-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => increaseQuantity(item.id)} className="cursor-pointer px-2 font-bold">+</button>
                  </div>
                  <p className="text-lg font-bold w-24 text-right">
                    R$ {(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
            <div className="flex justify-end text-2xl font-bold mt-6">
              <p>Total: R$ {total.toFixed(2)}</p>
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <Link href="/checkout">
              <button className="cursor-pointer bg-colmeia-yellow text-colmeia-blue font-semibold px-6 py-2 rounded-lg hover:opacity-90">
                Ir para o Checkout
              </button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}