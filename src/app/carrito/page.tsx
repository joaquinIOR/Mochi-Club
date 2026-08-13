"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingBag, Trash2, ArrowRight, ArrowLeft, ShieldCheck, MapPin, Sparkles } from "lucide-react";
import { formatCLP } from "@/lib/utils";
import { useCartStore } from "@/store/useCartStore";

export default function CartPage() {
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const getTotalPrice = useCartStore((state) => state.getTotalPrice());

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-20 h-20 bg-pink-50 rounded-full flex items-center justify-center mx-auto text-4xl">
          🛍️
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900">Tu carrito está vacío</h1>
        <p className="text-sm text-slate-500 max-w-md mx-auto">
          Explora nuestra selección de snacks, peluches, K-pop y cositas Kawaii para agregar tus primeros productos.
        </p>
        <Link
          href="/productos"
          className="inline-flex items-center gap-2 px-8 py-4 bg-pink-500 hover:bg-pink-600 text-white font-bold rounded-2xl shadow-lg shadow-pink-200 transition-all hover:scale-105"
        >
          <span>Ir al Catálogo de Productos</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-pink-100 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Carrito de <span className="text-pink-500">Compras</span>
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Revisa tus artículos antes de seleccionar la fecha de retiro
          </p>
        </div>
        <Link
          href="/productos"
          className="hidden sm:inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-pink-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Continuar Comprando</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Cart Items List */}
        <div className="lg:col-span-8 space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white p-4 sm:p-5 rounded-3xl border border-pink-100/80 shadow-xs flex items-center gap-4 sm:gap-6"
            >
              {/* Product Thumbnail */}
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden bg-slate-50 shrink-0 border border-slate-100">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Product Info */}
              <div className="flex-1 min-w-0">
                <span className="text-[10px] font-bold uppercase tracking-wider text-pink-500">
                  {item.category}
                </span>
                <h3 className="font-bold text-slate-800 text-sm sm:text-base truncate">
                  {item.name}
                </h3>
                <span className="text-xs text-slate-500 block mt-0.5">
                  Precio unitario: {formatCLP(item.price)}
                </span>

                {/* Quantity Controls */}
                <div className="flex items-center gap-3 mt-3">
                  <div className="flex items-center border border-slate-200 rounded-xl bg-slate-50">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="px-2.5 py-1 text-slate-600 hover:text-pink-600 font-bold text-xs"
                    >
                      -
                    </button>
                    <span className="px-3 py-1 font-bold text-xs text-slate-900">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="px-2.5 py-1 text-slate-600 hover:text-pink-600 font-bold text-xs"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => removeItem(item.id)}
                    className="p-1.5 text-slate-400 hover:text-rose-500 transition-colors"
                    title="Eliminar producto"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Subtotal */}
              <div className="text-right shrink-0">
                <span className="font-extrabold text-slate-900 text-base sm:text-lg block">
                  {formatCLP(item.price * item.quantity)}
                </span>
                <span className="text-[10px] text-slate-400">IVA incl.</span>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-pink-100 shadow-sm space-y-6">
            <h3 className="font-bold text-slate-900 text-lg border-b border-slate-100 pb-4">
              Resumen del Pedido
            </h3>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal ({items.length} productos)</span>
                <span className="font-semibold text-slate-900">{formatCLP(getTotalPrice)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Retiro en Tienda (Galería Escorial)</span>
                <span className="font-bold text-emerald-600">GRATIS</span>
              </div>
              <div className="border-t border-slate-100 pt-3 flex justify-between items-baseline">
                <span className="font-extrabold text-slate-900 text-base">Total a Pagar</span>
                <div className="text-right">
                  <span className="font-extrabold text-pink-600 text-2xl block">
                    {formatCLP(getTotalPrice)}
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium">Precios con IVA incluido</span>
                </div>
              </div>
            </div>

            <Link
              href="/checkout"
              className="w-full py-4 bg-pink-500 hover:bg-pink-600 text-white font-bold rounded-2xl shadow-lg shadow-pink-200 hover:shadow-pink-300 transition-all flex items-center justify-center gap-2 text-base hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Proceder al Checkout</span>
              <ArrowRight className="w-5 h-5" />
            </Link>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-2 text-xs text-slate-500">
              <div className="flex items-center gap-2 font-bold text-slate-700">
                <MapPin className="w-4 h-4 text-pink-500" />
                <span>Modalidades de Entrega</span>
              </div>
              <p>
                Retira gratis en nuestra tienda en Galería Escorial, Viña del Mar, o envía tu Uber Flash tras realizar el pago online.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
