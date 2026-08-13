"use client";

import Link from "next/link";
import { useState } from "react";
import { Search, ShoppingBag, Heart, User, MapPin, Clock, Menu, X, Sparkles } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";

export function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const totalCartItems = useCartStore((state) => state.getTotalItems());

  const categories = [
    { name: "Snacks", href: "/productos?categoria=snacks" },
    { name: "Peluches", href: "/productos?categoria=peluches" },
    { name: "K-pop + Photocards", href: "/productos?categoria=k-pop" },
    { name: "Anime", href: "/productos?categoria=anime" },
    { name: "Descuentos", href: "/productos?categoria=descuentos" },
    { name: "Beauty", href: "/productos?categoria=beauty" },
    { name: "Decoración", href: "/productos?categoria=decoracion" },
    { name: "Pancartas", href: "/productos?categoria=pancartas" },
    { name: "Otros", href: "/productos?categoria=otros" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-pink-100 shadow-sm">
      {/* Top Banner - Store Info */}
      <div className="bg-gradient-to-r from-pink-400 via-pink-300 to-emerald-300 text-white py-1.5 px-4 text-xs sm:text-sm text-center font-medium">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-4 flex-wrap">
          <span className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5" />
            Galería Escorial, Plaza Vergara, Viña del Mar
          </span>
          <span className="hidden md:inline">|</span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            Abierto de 11:00 a 20:00 hrs
          </span>
          <span className="hidden sm:inline-block bg-white/20 px-2 py-0.5 rounded-full text-[11px] font-semibold tracking-wide">
            Retiro en tienda o vía Uber
          </span>
        </div>
      </div>

      <div className="border-b border-rose-100 bg-rose-50 px-4 py-2.5 text-center">
        <p className="text-xs font-semibold text-slate-800 sm:text-sm">
          Productos seleccionados con descuento por tiempo limitado.{" "}
          <Link
            href="/productos?categoria=descuentos"
            className="font-extrabold text-rose-600 underline decoration-rose-300 underline-offset-4 transition-colors hover:text-rose-800"
          >
            Ver descuentos
          </Link>
        </p>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-pink-400 to-rose-300 flex items-center justify-center text-white font-bold text-xl shadow-md group-hover:scale-105 transition-transform">
              🍡
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-2xl tracking-tight text-slate-800 flex items-center gap-1">
                Mochi <span className="text-pink-500">Club</span>
                <Sparkles className="w-4 h-4 text-amber-400 fill-amber-400 animate-pulse" />
              </span>
              <span className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider -mt-1">
                Cultura Asiática & Kawaii
              </span>
            </div>
          </Link>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-md mx-4">
            <form
              action="/productos"
              method="GET"
              className="relative w-full flex items-center"
            >
              <input
                type="text"
                name="q"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar snacks, peluches, k-pop..."
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-full text-sm focus:outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-100 transition-all placeholder:text-slate-400"
              />
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            </form>
          </div>

          {/* User Actions */}
          <div className="flex items-center gap-2 sm:gap-4">
            <Link
              href="/cuenta/favoritos"
              className="p-2.5 text-slate-600 hover:text-pink-500 hover:bg-pink-50 rounded-full transition-colors relative"
              title="Lista de deseos"
            >
              <Heart className="w-5 h-5" />
            </Link>

            <Link
              href="/carrito"
              className="flex items-center gap-2 bg-pink-500 hover:bg-pink-600 text-white px-4 py-2.5 rounded-full text-sm font-semibold shadow-md shadow-pink-200 hover:shadow-pink-300 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">Carrito</span>
              {totalCartItems > 0 && (
                <span className="bg-white text-pink-600 px-2 py-0.5 rounded-full text-xs font-bold shadow-sm">
                  {totalCartItems}
                </span>
              )}
            </Link>

            <Link
              href="/login"
              className="hidden sm:flex items-center gap-2 border border-slate-200 hover:border-pink-300 text-slate-700 px-3.5 py-2 rounded-full text-xs font-semibold hover:bg-pink-50/50 transition-colors"
            >
              <User className="w-4 h-4 text-slate-500" />
              <span>Ingresar</span>
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-600 hover:text-pink-500 rounded-lg"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Category Navigation Bar - Desktop */}
        <nav className="hidden md:flex items-center justify-between border-t border-slate-100 py-2.5 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-1">
            <Link
              href="/productos"
              className="px-3.5 py-1.5 rounded-full text-xs font-semibold text-pink-600 bg-pink-50 hover:bg-pink-100 transition-colors"
            >
              Ver Todo el Catálogo
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat.name}
                href={cat.href}
                className="px-3 py-1.5 rounded-full text-xs font-medium text-slate-600 hover:text-pink-600 hover:bg-pink-50/60 transition-colors whitespace-nowrap"
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </nav>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white px-4 pt-3 pb-6 space-y-4 shadow-lg animate-in slide-in-from-top-2 duration-200">
          <form action="/productos" method="GET" className="relative">
            <input
              type="text"
              name="q"
              placeholder="Buscar en Mochi Club..."
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-full text-sm"
            />
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          </form>

          <div className="grid grid-cols-2 gap-2 pt-2">
            {categories.map((cat) => (
              <Link
                key={cat.name}
                href={cat.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 bg-slate-50 hover:bg-pink-50 hover:text-pink-600 rounded-xl text-xs font-medium text-slate-700 flex items-center justify-between"
              >
                <span>{cat.name}</span>
                <span className="text-slate-300">→</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
