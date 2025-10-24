import { z } from 'zod';

export const creditCardSchema = z.object({
  cardNumber: z.string().min(19, { message: "Número do cartão inválido." }),
  cardName: z.string().min(3, { message: "Nome deve ter pelo menos 3 caracteres." }),
  expiryDate: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, { message: "Data de validade inválida (MM/AA)." }),
  cvv: z.string().length(3, { message: "CVV deve ter 3 dígitos." }),
});

export type CreditCardSchema = z.infer<typeof creditCardSchema>;