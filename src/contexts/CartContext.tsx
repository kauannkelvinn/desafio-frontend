'use client';

import { createContext, useContext, useState, ReactNode } from 'react';


// define o formato de um item no carrinho
interface CartItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
}

// define o que o contexto vai fornecer
interface CartContextType {
    items: CartItem[];
    addToCart: (productId: number, name: string, price: number) => void;
}

// cria o contexto com um valor default
const CartContext = createContext<CartContextType | undefined>(undefined);

// cria o provedor do contexto, que gerencia o estado do cart
export function CartProvider({ children }: { children: ReactNode }) {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    const addToCart = (id: number, name: string, price: number) => {
        setCartItems((prevItems) => {
            const existingItem = prevItems.find((item) => item.id === id);

            if (existingItem) {
                // se o item ja existe, aumenta so a quantidade
                return prevItems.map((item) => item.id === id ? { ...item, quantity: item.quantity + 1 } : item);
            } else {
                // se for um item novo, adiciona ao carrinho
                return [...prevItems, { id, name, price, quantity: 1 }]
            }
        });
        console.log('Adicionado ao carrinho!', cartItems); // para debug
    }

    return (
        <CartContext.Provider value={{ items: cartItems, addToCart }}>
            {children}
        </CartContext.Provider>
    )
}

// cria um hook customizado para facilitar o uso do contexto
export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
