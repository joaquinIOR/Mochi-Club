"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Heart, ShoppingBag, BellRing, Check, Sparkles } from "lucide-react";
import { formatCLP } from "@/lib/utils";
import { useCartStore } from "@/store/useCartStore";

interface ProductCardProps {
  id: string;
  name: string;
  slug: string;
  price: number;
  compareAtPrice?: number | null;
  image: string;
  category: string;
  stock: number;
  isFeatured?: boolean;
}

export function ProductCard({
  id,
  name,
  slug,
  price,
  compareAtPrice,
  image,
  category,
  stock,
  isFeatured = false,
}: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [addedSuccess, setAddedSuccess] = useState(false);
  const [restockRequested, setRestockRequested] = useState(false);

  const addItemToCart = useCartStore((state) => state.addItem);

  const discountPercent =
    compareAtPrice && compareAtPrice > price
      ? Math.round(((compareAtPrice - price) / compareAtPrice) * 100)
      : null;

  const isOutOfStock = stock <= 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isOutOfStock) return;

    addItemToCart({
      id,
      name,
      slug,
      price,
      image,
      category,
      stock,
    });

    setAddedSuccess(true);
    setTimeout(() => setAddedSuccess(false), 2000);
  };

  const handleRestockRequest = (e: React.MouseEvent) => {
    e.preventDefault();
    setRestockRequested(true);
  };

  return (
    <div className="group relative bg-white rounded-3xl border border-pink-100/70 p-3.5 flex flex-col justify-between soft-shadow-hover transition-all duration-300 hover:border-pink-300">
      {/* Image Container */}
      <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-slate-50 mb-3">
        <Link href={`/productos/${slug}`} className="block w-full h-full">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        </Link>

        {/* Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10">
          {discountPercent && (
            <span className="bg-rose-500 text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-sm">
              -{discountPercent}%
            </span>
          )}
          {isFeatured && (
            <span className="bg-amber-400 text-slate-900 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full shadow-sm flex items-center gap-1">
              <Sparkles className="w-3 h-3 fill-slate-900" />
              Destacado
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            setIsWishlisted(!isWishlisted);
          }}
          className={`absolute top-2.5 right-2.5 z-10 p-2 rounded-full backdrop-blur-md transition-all ${
            isWishlisted
              ? "bg-rose-500 text-white shadow-md"
              : "bg-white/80 text-slate-400 hover:text-rose-500 hover:bg-white"
          }`}
          title="Guardar en lista de deseos"
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? "fill-white" : ""}`} />
        </button>

        {/* Out of stock overlay badge */}
        {isOutOfStock && (
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px] flex items-center justify-center p-2 text-center">
            <span className="bg-slate-900/90 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg border border-slate-700">
              Agotado
            </span>
          </div>
        )}
      </div>

      {/* Product Content */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <span className="text-[11px] font-semibold text-pink-500 tracking-wider uppercase">
            {category}
          </span>
          <Link href={`/productos/${slug}`}>
            <h3 className="font-semibold text-slate-800 text-sm line-clamp-2 mt-0.5 hover:text-pink-600 transition-colors">
              {name}
            </h3>
          </Link>
        </div>

        {/* Price & Cart Actions */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-bold text-slate-900 text-base">
                {formatCLP(price)}
              </span>
              {compareAtPrice && compareAtPrice > price && (
                <span className="text-xs text-slate-400 line-through">
                  {formatCLP(compareAtPrice)}
                </span>
              )}
            </div>
            <span className="text-[10px] text-slate-400 font-medium">IVA incl.</span>
          </div>

          {/* Action Button */}
          {isOutOfStock ? (
            <button
              onClick={handleRestockRequest}
              disabled={restockRequested}
              className={`p-2.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                restockRequested
                  ? "bg-emerald-100 text-emerald-700"
                  : "bg-slate-100 hover:bg-pink-100 text-slate-700 hover:text-pink-600"
              }`}
              title="Notificarme cuando vuelva a estar disponible"
            >
              {restockRequested ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span className="hidden sm:inline">Avisaremos</span>
                </>
              ) : (
                <>
                  <BellRing className="w-4 h-4" />
                  <span className="hidden sm:inline">Recuérdame</span>
                </>
              )}
            </button>
          ) : (
            <button
              onClick={handleAddToCart}
              className={`p-2.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm ${
                addedSuccess
                  ? "bg-emerald-500 text-white shadow-emerald-200"
                  : "bg-pink-500 hover:bg-pink-600 text-white shadow-pink-200 hover:scale-105 active:scale-95"
              }`}
            >
              {addedSuccess ? (
                <Check className="w-4 h-4" />
              ) : (
                <ShoppingBag className="w-4 h-4" />
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
