'use client';

import { useAuth } from "@/src/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// shadcn import
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/components/ui/tabs";


export default function CheckoutPage() {
    const { user } = useAuth();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false)


    //efeito guarda da rota
    // se nao existir usuario, volta pro login
    useEffect(() => {
        {
            if (user === null) {
                router.push('/login');
            }
        }
    }, [user, router]);

    // quando o user nao foi carregado = undefined, mostramos um loading pra evitar flash antes do redirecionamento
    if (!user) {
        return <p>Carregando...</p>
    }

    // funcao pagamento
    const handlePaymentSubmit = () => {
        setIsLoading(true);

        setTimeout(() => {



            // simula sucesso ou falha aleatoria
            const isSucess = Math.random() > 0.5; // 50% de chance de sucesso

            const orderId = Math.floor(Math.random() * 100000); // gera um id aleatorio

            if (isSucess) {
                router.push(`/order/${orderId}?status=sucess`);
            } else {
                router.push(`/order/${orderId}?status=failed`);
            }

        }, 2000);
    }


    // se chegou aqui, é pq o user existe
    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">Checkout</h1>

            {/* Secao 1: Dados do Comprador pre preenchidos */}
            <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Seus Dados</h2>
                <div className="space-y-4 max-w-md">
                    <div>
                        <Label htmlFor="name">Nome</Label>
                        <Input type="text" id="name" value={user.name} readOnly />
                    </div>
                    <div>
                        <Label htmlFor="email">Email</Label>
                        <Input type="email" id="email" value={user.email} readOnly />
                    </div>
                </div>
            </div>


            {/* Secao 2: Metodo de Pagamento com abas*/}
            <div>
                <h2 className="tetx-2xl font-semibold mb-4">Pagamento</h2>
                <Tabs defaultValue="credit-card">
                    <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="credit-card">Cartão de Crédito</TabsTrigger>
                        <TabsTrigger value="pix">Pix</TabsTrigger>
                        <TabsTrigger value="boleto">Boleto</TabsTrigger>
                    </TabsList>


                    {/* Conteudo de cada aba*/}
                    <TabsContent value="credit-card" className="mt-4">
                        <h3 className="font-semibold mb-2">Preencha os dados do cartão</h3>
                        <div className="space-y-4">
                            <div>
                                <Label htmlFor="cardNumber">Número do Cartão</Label>
                                <Input id="cardNumber" placeholder="0000 0000 0000 0000"></Input>
                            </div>
                            <div>
                                <Label htmlFor="cardName">Nome no Cartão</Label>
                                <Input id="cardName" placeholder="Seu nome como no cartão"></Input>
                            </div>
                            <div className="flex gap-4">
                                <div className="w-full">
                                    <Label htmlFor="cardValidity">Validade</Label>
                                    <Input id="cardValidity" placeholder="MM/AA"></Input>
                                </div>
                                <div className="w-full">
                                    <Label htmlFor="cardCVV">CVV</Label>
                                    <Input id="cardCVV" placeholder="000"></Input>
                                </div>
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="pix" className="mt-4">
                        <h3 className="font-semibold mb-2">Pague com Pix</h3>
                        <p>Um QR Code será gerado ao finalizar a compra.</p>
                    </TabsContent>

                    <TabsContent value="boleto" className="mt-4">
                        <h3 className="font-semibold mb-2">Pague com Boleto</h3>
                        <p>O boleto será gerado ao finalizar a compra.</p>
                    </TabsContent>
                </Tabs>
            </div>


            {/* Seção 3: finalizar */}
            <div className="mt-10">
                <Button 
                size="lg" 
                className="w-full max-w-md"
                onClick={handlePaymentSubmit}
                disabled={isLoading}>
                    {isLoading ? 'Processando...' : 'Finalizar Compra'}
                </Button>
            </div>
        </div>
    )
};
