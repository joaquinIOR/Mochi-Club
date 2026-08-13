"use client";

import Link from "next/link";
import { Heart, ArrowLeft, ArrowRight } from "lucide-react";
import { ProductCard } from "@/components/products/ProductCard";

export default function WishlistPage() {
  const wishlistedItems = [
    {
      id: "prod-1",
      name: "Pocky Strawberry Cookie Crisp (Edición Japón)",
      slug: "pocky-strawberry-cookie-crisp",
      price: 2490,
      compareAtPrice: 2990,
      image: "https://images.unsplash.com/photo-1582293041079-7814c2f12063?q=80&w=800&auto=format&fit=crop",
      category: "Snacks",
      stock: 24,
      isFeatured: true,
    },
    {
      id: "prod-6",
      name: "Binder Photocards Pastel Pink Holográfico (64 bolsillos)",
      slug: "binder-photocards-pink-holografico",
      price: 8990,
      compareAtPrice: 10990,
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop",
      category: "Photocards",
      stock: 15,
      isFeatured: true,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <Link
        href="/productos"
        className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-pink-600 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Volver al Catálogo</span>
      </Link>

      <div className="border-b border-pink-100 pb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <span>Lista de Deseos</span>
            <Heart className="w-6 h-6 text-pink-500 fill-pink-500" />
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Tus productos guardados. Recibirás un correo si entran en oferta o bajan de precio.
          </p>
        </div>
      </div>

      {wishlistedItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {wishlistedItems.map((prod) => (
            <ProductCard key={prod.id} {...prod} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-12 text-center border border-pink-100 space-y-4 max-w-md mx-auto">
          <div className="w-16 h-16 bg-pink-50 rounded-full flex items-center justify-center mx-auto text-2xl">
            💖
          </div>
          <h3 className="font-bold text-slate-800 text-lg">No tienes favoritos guardados</h3>
          <p className="text-xs text-slate-500">
            Guarda los productos que más te gusten haciendo clic en el corazón de cada card.
          </p>
          <Link
            href="/productos"
            className="inline-flex items-center gap-2 px-6 py-3 bg-pink-500 text-white rounded-2xl text-xs font-bold hover:bg-pink-600 transition-colors"
          >
            <span>Explorar Productos</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      )}
    </div>
  );
}
