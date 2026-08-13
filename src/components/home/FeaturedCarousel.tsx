"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { formatCLP } from "@/lib/utils";

const products = [
  { name: "Pocky Strawberry Cookie Crisp", slug: "pocky-strawberry-cookie-crisp", price: 2490, label: "Favorito de la semana", description: "Un clásico japonés para una tarde de anime, película o junta con amistades.", image: "https://images.unsplash.com/photo-1582293041079-7814c2f12063?q=90&w=2400&auto=format&fit=crop" },
  { name: "Peluche Mochi Cat Giant Pink", slug: "peluche-mochi-cat-giant-pink", price: 14990, label: "Más querido", description: "Suave, grande y listo para transformar cualquier rincón en un espacio kawaii.", image: "https://images.unsplash.com/photo-1559454403-b8fb88521f11?q=90&w=2400&auto=format&fit=crop" },
  { name: "Lightstick Oficial K-Pop", slug: "lightstick-stray-kids-ver2", price: 64990, label: "Llegó al club", description: "Merch para acompañarte en conciertos, coleccionar y mostrar tu fandom.", image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=90&w=2400&auto=format&fit=crop" },
];

export function FeaturedCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const product = products[activeIndex];
  const move = (direction: -1 | 1) => setActiveIndex((current) => (current + direction + products.length) % products.length);

  return (
    <section aria-label="Productos destacados" className="relative min-h-[590px] overflow-hidden bg-slate-950 sm:min-h-[650px]">
      <div className="absolute inset-0">
        <Image src={product.image} alt={product.name} fill priority={activeIndex === 0} sizes="100vw" className="object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/45 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
      </div>
      <div className="relative z-10 mx-auto flex min-h-[590px] max-w-7xl flex-col justify-end px-5 py-10 text-white sm:min-h-[650px] sm:px-8 sm:py-14 lg:px-12">
        <div>
          <span className="inline-flex rounded-full bg-pink-400/25 px-3 py-1 text-xs font-bold tracking-wide text-pink-100 ring-1 ring-pink-200/50 backdrop-blur-sm">{product.label}</span>
          <p className="mt-6 text-xs font-bold uppercase tracking-[0.22em] text-pink-200">Selección Mochi Club</p>
          <h1 className="mt-3 max-w-2xl text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">{product.name}</h1>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-200 sm:text-base">{product.description}</p>
          <p className="mt-7 text-2xl font-extrabold text-white">{formatCLP(product.price)}</p>
          <Link href={`/productos/${product.slug}`} className="mt-6 inline-flex items-center justify-center gap-2 rounded-2xl bg-pink-500 px-6 py-3.5 text-sm font-bold text-white transition-colors hover:bg-pink-400"><ShoppingBag className="h-4 w-4" /> Ver producto</Link>
        </div>
        <div className="mt-9 flex max-w-2xl items-center justify-between">
          <div className="flex gap-2" aria-label="Elegir producto destacado">
            {products.map((item, index) => <button key={item.slug} onClick={() => setActiveIndex(index)} aria-label={`Mostrar ${item.name}`} aria-current={index === activeIndex} className={`h-2 rounded-full transition-all ${index === activeIndex ? "w-8 bg-pink-400" : "w-2 bg-white/35 hover:bg-white/70"}`} />)}
          </div>
          <div className="flex gap-2"><button onClick={() => move(-1)} aria-label="Producto anterior" className="rounded-full border border-white/25 p-2.5 transition-colors hover:bg-white/10"><ArrowLeft className="h-4 w-4" /></button><button onClick={() => move(1)} aria-label="Producto siguiente" className="rounded-full border border-white/25 p-2.5 transition-colors hover:bg-white/10"><ArrowRight className="h-4 w-4" /></button></div>
        </div>
      </div>
    </section>
  );
}
