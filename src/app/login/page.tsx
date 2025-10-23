'use client';

import { useState } from 'react';
import { useAuth } from '@/src/contexts/AuthContext';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const { login } = useAuth();
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (name && email) {
            // simula o lofin e guarda o usuario
            login(name, email);
            // redireciona para o checkout apos o login
            router.push('/checkout');
        }
    }

    return (
        <div className='flex flex-col items-center'>
            <h1 className='text-3xl font-bold mb-6'>Entrar ou Criar Conta</h1>
            <form onSubmit={handleSubmit} className='w-full max-w-sm'>
                <div className='mb-4'>
                    <label htmlFor="email" className='block text-sm font-medium mb-1'>Nome</label>
                    <input type="text"
                        id='name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className='w-full p-2 border rounded-md text-black'
                        required
                    />
                </div>
                <div className="mb-6">
                    <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-2 border rounded-md text-black"
                        required
                    />
                </div>
                <button type='submit' className='w-full cursor-pointer bg-colmeia-yellow text-colmeia-blue font-semibold py-2 rounded-md hover:opacity-90'>
                    Entrar
                </button>
            </form>
        </div>
    )
};
