
import { Header } from "@/src/components/layout/Header"
import { CartProvider } from "@/src/contexts/CartContext";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ['latin'] });

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
      <body
        className={inter.className}
      >
        <CartProvider>
          <Header />
          <main className="container mx-auto p-4">{children}</main>
        </CartProvider>
      </body>
    </html>
  );
}

