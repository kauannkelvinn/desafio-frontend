'use client';

import { useCart } from "@/src/contexts/CartContext";
import { useForm, Controller } from "react-hook-form";
import { useMask } from "@react-input/mask";
import { zodResolver } from "@hookform/resolvers/zod";
import { creditCardSchema, type CreditCardSchema } from "@/src/lib/schemas";
import { cn } from "@/src/lib/utils";
import { useAuth } from "@/src/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { OrderSummary } from "@/src/components/checkout/OrderSummary";
import { QRCodeSVG } from 'qrcode.react';
import { FloatingLabelInput } from "@/src/components/ui/floating-label-input";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/components/ui/tabs";

export default function CheckoutPage() {
    const { control, register, handleSubmit, formState: { errors } } = useForm<CreditCardSchema>({
        resolver: zodResolver(creditCardSchema),
        mode: 'onBlur',
        defaultValues: {
            cardNumber: '',
            cardName: '',
            expiryDate: '',
            cvv: ''
        }
    });

    const { user } = useAuth();
    const router = useRouter();
    const { items } = useCart();
    const [isLoading, setIsLoading] = useState(false);
    const [showPixQRCode, setShowPixQRCode] = useState(false);
    const [orderId, setOrderId] = useState<number | null>(null);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<'credit-card' | 'pix' | 'boleto'>('credit-card');

    const cardNumberMaskRef = useMask({ mask: '____ ____ ____ ____', replacement: { _: /\d/ } });
    const expiryDateMaskRef = useMask({ mask: '__/__', replacement: { _: /\d/ } });
    const cvvMaskRef = useMask({ mask: '___', replacement: { _: /\d/ } });

    useEffect(() => {
        if (!user) router.push('/login');
    }, [user, router]);

    useEffect(() => {
        if (items.length === 0) router.push('/cart');
    }, [items, router]);

    const handlePaymentSubmit = (paymentMethod: 'credit-card' | 'pix' | 'boleto') => {
        setIsLoading(true);
        // eslint-disable-next-line
        const newOrderId = Math.floor(Math.random() * 100000);
        setOrderId(newOrderId);

        if (paymentMethod === 'pix') {
            setShowPixQRCode(true);
            setIsLoading(false);
            return;
        }

        setTimeout(() => {
            const isSuccess = Math.random() > 0.5;
            router.push(`/order/${newOrderId}?status=${isSuccess ? 'success' : 'failed'}`);
        }, 2000);
    };

    const onCardSubmit = (data: CreditCardSchema) => {
        console.log("Dados do cartão válidos:", data);
        handlePaymentSubmit('credit-card');
    };

    if (!user) return <p>Carregando...</p>;

    return (
        <div>
            <h1 className="text-3xl font-bold mb-8">Checkout</h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-12">
                <div className="order-2 lg:order-1">
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
                    <div className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">Pagamento</h2>
                        <Tabs
                            defaultValue="credit-card"
                            onValueChange={(value) => setSelectedPaymentMethod(value as 'credit-card' | 'pix' | 'boleto')}
                        >
                            <TabsList className="grid w-full grid-cols-3">
                                <TabsTrigger value="credit-card" className="text-xs sm:text-sm">Cartão de Crédito</TabsTrigger>
                                <TabsTrigger value="pix" className="text-xs sm:text-sm">Pix</TabsTrigger>
                                <TabsTrigger value="boleto" className="text-xs sm:text-sm">Boleto</TabsTrigger>
                            </TabsList>
                            <TabsContent value="credit-card" className="mt-4">
                                <form id="credit-card-form" onSubmit={handleSubmit(onCardSubmit)}>
                                    <h3 className="font-semibold mb-4">Preencha os dados do cartão</h3>
                                    <div className="space-y-3">
                                        <Controller
                                            name="cardNumber"
                                            control={control}
                                            render={({ field }) => (
                                                <div>
                                                    <FloatingLabelInput
                                                        id="cardNumber"
                                                        label="Número do Cartão"
                                                        {...field}
                                                        ref={cardNumberMaskRef}
                                                        className={cn({ 'border-red-500 ring-red-500': errors.cardNumber })}
                                                    />
                                                    {errors.cardNumber && <p className="text-red-500 text-xs mt-1">{errors.cardNumber.message}</p>}
                                                </div>
                                            )}
                                        />
                                        <div>
                                            <FloatingLabelInput
                                                id="cardName"
                                                label="Nome no Cartão"
                                                {...register("cardName")}
                                                className={cn({ 'border-red-500 ring-red-500': errors.cardName })}
                                            />
                                            {errors.cardName && <p className="text-red-500 text-xs mt-1">{errors.cardName.message}</p>}
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <Controller
                                                name="expiryDate"
                                                control={control}
                                                render={({ field }) => (
                                                    <div>
                                                        <FloatingLabelInput
                                                            id="expiryDate"
                                                            label="Validade MM/AA"
                                                            {...field}
                                                            ref={expiryDateMaskRef}
                                                            className={cn({ 'border-red-500 ring-red-500': errors.expiryDate })}
                                                        />
                                                        {errors.expiryDate && <p className="text-red-500 text-xs mt-1">{errors.expiryDate.message}</p>}
                                                    </div>
                                                )}
                                            />
                                            <Controller
                                                name="cvv"
                                                control={control}
                                                render={({ field }) => (
                                                    <div>
                                                        <FloatingLabelInput
                                                            id="cvv"
                                                            label="CVV"
                                                            {...field}
                                                            ref={cvvMaskRef}
                                                            className={cn({ 'border-red-500 ring-red-500': errors.cvv })}
                                                        />
                                                        {errors.cvv && <p className="text-red-500 text-xs mt-1">{errors.cvv.message}</p>}
                                                    </div>
                                                )}
                                            />
                                        </div>
                                    </div>
                                </form>
                            </TabsContent>
                            <TabsContent value="pix" className="mt-4 text-center">
                                {showPixQRCode && orderId ? (
                                    <div>
                                        <h3 className="font-semibold mb-2">Pague com o QR Code abaixo</h3>
                                        <div className="flex justify-center p-4 bg-white rounded-lg">
                                            <QRCodeSVG value={`pix-pagamento-pedido-${orderId}`} size={200} />
                                        </div>
                                        <p className="text-sm text-muted-foreground mt-2">Pedido #{orderId}</p>
                                        <p className="mt-4">Após o pagamento, o status será atualizado.</p>
                                    </div>
                                ) : (
                                    <div>
                                        <h3 className="font-semibold mb-2">Pague com Pix</h3>
                                        <p>O QR Code será gerado ao clicar em &quot;Finalizar Compra&quot;.</p>
                                    </div>
                                )}
                            </TabsContent>
                            <TabsContent value="boleto" className="mt-4">
                                <h3 className="font-semibold mb-2">Pague com Boleto</h3>
                                <p>O boleto será gerado ao finalizar a compra.</p>
                            </TabsContent>
                        </Tabs>
                    </div>
                    <div className="mt-10 flex justify-center">
                        <Button
                            size="lg"
                            className="cursor-pointer w-full max-w-md"
                            onClick={() => handlePaymentSubmit(selectedPaymentMethod)}
                            disabled={isLoading}
                        >
                            {isLoading ? 'Processando...' : 'Finalizar Compra'}
                        </Button>
                    </div>
                </div>
                <div className="order-1 lg:order-2 mb-8 lg:mb-0">
                    <OrderSummary />
                </div>
            </div>
        </div>
    );
}
