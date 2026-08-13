import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Providers } from "./providers";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mochi Club | Tienda de Cultura Asiática & Kawaii en Viña del Mar",
  description:
    "Snacks asiáticos, peluches Mochi, K-pop, photocards, figuras de anime y cosmética Kawaii. Retiro en Galería Escorial, Plaza Vergara, Viña del Mar o vía Uber.",
  keywords: [
    "Mochi Club",
    "Snacks asiáticos Chile",
    "Peluches Kawaii Viña del Mar",
    "Kpop Chile",
    "Photocards",
    "Galería Escorial",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={plusJakartaSans.variable}>
      <body className="min-h-screen flex flex-col antialiased bg-[#FFFDF9] text-slate-800">
        <Providers>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
