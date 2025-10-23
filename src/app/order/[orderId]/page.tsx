'use client'

import { useSearchParams, useParams } from "next/navigation";
import Link from "next/link";

export default function OrderStatusPage() {
    const searchParams = useSearchParams();
    const params = useParams();

    const status = searchParams.get('status');  
    const orderId = params.orderId;
    

    if (status === 'sucess') {
        return (
            <div className="flex flex-col items-center text-center">
                <h1 className="text-3xl font-bold text-green-500 mb-4">Pagamento Aprovado!</h1>
                <p className="mb-2">Seu pedido <span className="font-mono">#{orderId}</span> foi confirmado com sucesso.</p>
                <p className="mb-8">Obrigado por comprar conosco!</p>
                <Link href="/">
                    <button className="cursor-pointer bg-colmeia-yellow text-colmeia-blue font-semibold px-6 py-2 rounded-lg hover:opacity-90">
                        Voltar para a loja
                    </button>
                </Link>
            </div>
        )
    }

    if (status === 'failed') {
        return (
            <div className="flex flex-col items-center text-center">
                <h1 className="text-3xl font-bold">Pagamento Recusado</h1>
                <p className="mb-8">Houve um problema ao processar seu pagamento. Por favor, tente novamente.</p>
                <Link href="/checkout">
                    <button className="cursor-pointer bg-colmeia-yellow text-colmeia-blue font-semibold px-6 py-2 rounded-lg hover:opacity-90">
                        Tentar Novamente
                    </button>
                </Link>
            </div>
        )
    }
    
    return <p>Carregando status do pedido...</p>;
};

