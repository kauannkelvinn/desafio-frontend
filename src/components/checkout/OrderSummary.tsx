'use client';

import { useCart } from '@/src/contexts/CartContext';

export function OrderSummary() {
  const { items, increaseQuantity, decreaseQuantity } = useCart();

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const frete = 0; // Frete Fixo
  const total = subtotal + frete;

  return (
    <div className="bg-zinc-50/50 dark:bg-zinc-900/50 p-6 rounded-lg border">
      <h2 className="text-xl font-semibold mb-4">Resumo do Pedido</h2>
      <div className="space-y-2">
      {items.map((item) => (
          <div key={item.id} className="flex justify-between items-start">
            <div>
              <span>{item.name}</span>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <button onClick={() => decreaseQuantity(item.id)} className="cursor-pointer px-1 font-bold">-</button>
                <span>Qtd: {item.quantity}</span>
                <button onClick={() => increaseQuantity(item.id)} className="cursor-pointer px-1 font-bold">+</button>
              </div>
            </div>
            <span>R$ {(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
      </div>
      <hr className="my-4" />
      <div className="space-y-2">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>R$ {subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Frete</span>
          <span>{frete > 0 ? `R$ ${frete.toFixed(2)}` : 'Grátis'}</span>
        </div>
      </div>
      <hr className="my-4" />
      <div className="flex justify-between font-bold text-lg">
        <span>Total</span>
        <span>R$ {total.toFixed(2)}</span>
      </div>
    </div>
  );
}