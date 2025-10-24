'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface CartItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
}

interface CartContextType {
    items: CartItem[];
    addToCart: (id: number, name: string, price: number) => void;
    increaseQuantity: (id: number) => void;
    decreaseQuantity: (id: number) => void;
    removeFromCart: (id: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    const addToCart = (id: number, name: string, price: number) => {
        setCartItems((prevItems) => {
            const existingItem = prevItems.find((item) => item.id === id);
            return existingItem
                ? prevItems.map((item) =>
                      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
                  )
                : [...prevItems, { id, name, price, quantity: 1 }];
        });
    };

    const updateQuantity = (id: number, delta: number) => {
        setCartItems((prevItems) => {
            const existingItem = prevItems.find((item) => item.id === id);
            if (existingItem && existingItem.quantity + delta <= 0) {
                return prevItems.filter((item) => item.id !== id);
            }
            return prevItems.map((item) =>
                item.id === id ? { ...item, quantity: item.quantity + delta } : item
            );
        });
    };

    const increaseQuantity = (id: number) => updateQuantity(id, 1);
    const decreaseQuantity = (id: number) => updateQuantity(id, -1);

    const removeFromCart = (id: number) => {
        setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
    };

    return (
        <CartContext.Provider
            value={{
                items: cartItems,
                addToCart,
                increaseQuantity,
                decreaseQuantity,
                removeFromCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}
