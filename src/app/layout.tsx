
import { Sora } from "next/font/google";
import { Header } from "@/src/components/layout/Header"
import { AuthProvider } from "@/src/contexts/AuthContext";
import { CartProvider } from "@/src/contexts/CartContext";
import type { Metadata } from "next";
import "./globals.css";

const sora = Sora({ 
  subsets: ['latin'],
  weight: ['400', '600', '700']
});

export const metadata: Metadata = {
  title: "Colmeia.io Challenge",
  description: "Checkout flow for Colmeia.io",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={sora.className}>
        <AuthProvider>
          <CartProvider>
            <Header />
            <main className="container mx-auto p-4">{children}</main>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

