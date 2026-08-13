"use client";

import { use, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ShoppingBag,
  Heart,
  ShieldCheck,
  MapPin,
  Clock,
  Check,
  BellRing,
  Star,
  Sparkles,
  ArrowLeft,
} from "lucide-react";
import { formatCLP } from "@/lib/utils";
import { useCartStore } from "@/store/useCartStore";

const MOCK_PRODUCTS_DETAILS: Record<string, any> = {
  "pocky-strawberry-cookie-crisp": {
    id: "prod-1",
    name: "Pocky Strawberry Cookie Crisp (Edición Japón)",
    slug: "pocky-strawberry-cookie-crisp",
    price: 2490,
    compareAtPrice: 2990,
    description:
      "Deliciosos palitos de galleta crujiente bañados en una suave crema de frutilla natural con trocitos crocantes de galleta. Importados directamente desde Japón, ideales para acompañar tus tardes de anime o compartir con amigos.",
    category: "Snacks",
    categorySlug: "snacks",
    brand: "Glico Japan",
    sku: "GLICO-POCKY-STRW",
    stock: 24,
    images: [
      "https://images.unsplash.com/photo-1582293041079-7814c2f12063?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?q=80&w=800&auto=format&fit=crop",
    ],
  },
  "peluche-mochi-cat-giant-pink": {
    id: "prod-3",
    name: "Peluche Mochi Cat Giant Pink Marshmallow",
    slug: "peluche-mochi-cat-giant-pink",
    price: 14990,
    compareAtPrice: 17990,
    description:
      "Peluche Mochi Cat tamaño gigante de 45cm fabricado con felpa ultra suave y relleno memory-foam elástico súper abrazable. Lavable a mano y perfecto para decorar tu cama o sillón.",
    category: "Peluches",
    categorySlug: "peluches",
    brand: "Mochi Club Exclusive",
    sku: "PLCH-MCAT-PNK",
    stock: 8,
    images: [
      "https://images.unsplash.com/photo-1559454403-b8fb88521f11?q=80&w=800&auto=format&fit=crop",
    ],
  },
};

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const product = MOCK_PRODUCTS_DETAILS[slug] || {
    id: "prod-default",
    name: slug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" "),
    slug,
    price: 4990,
    compareAtPrice: null,
    description: "Producto importado de alta calidad de la colección Mochi Club. Retiro en tienda presencial o despacho vía Uber.",
    category: "Cultura Asiática",
    categorySlug: "otros",
    brand: "Mochi Import",
    sku: "MOCHI-ITEM",
    stock: 10,
    images: [
      "https://images.unsplash.com/photo-1582293041079-7814c2f12063?q=80&w=800&auto=format&fit=crop",
    ],
  };

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [addedSuccess, setAddedSuccess] = useState(false);
  const [restockRequested, setRestockRequested] = useState(false);

  const addItemToCart = useCartStore((state) => state.addItem);

  const isOutOfStock = product.stock <= 0;

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    addItemToCart(
      {
        id: product.id,
        name: product.name,
        slug: product.slug,
        price: product.price,
        image: product.images[0],
        category: product.category,
        stock: product.stock,
      },
      quantity
    );
    setAddedSuccess(true);
    setTimeout(() => setAddedSuccess(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Back Link */}
      <Link
        href="/productos"
        className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-pink-600 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Volver al Catálogo</span>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column - Gallery */}
        <div className="lg:col-span-6 space-y-4">
          <div className="relative aspect-square w-full rounded-3xl overflow-hidden bg-slate-50 border border-pink-100 shadow-sm">
            <Image
              src={product.images[selectedImage]}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
          </div>

          {product.images.length > 1 && (
            <div className="flex items-center gap-3">
              {product.images.map((img: string, idx: number) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`relative w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all ${
                    selectedImage === idx
                      ? "border-pink-500 ring-2 ring-pink-100"
                      : "border-slate-200 hover:border-pink-300"
                  }`}
                >
                  <Image src={img} alt="preview" fill className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column - Product Info */}
        <div className="lg:col-span-6 space-y-6">
          <div>
            <span className="text-xs font-bold text-pink-500 uppercase tracking-widest bg-pink-50 px-3 py-1 rounded-full">
              {product.category}
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-3 leading-snug">
              {product.name}
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Marca: <span className="text-slate-700 font-semibold">{product.brand}</span> • SKU: {product.sku}
            </p>
          </div>

          {/* Pricing */}
          <div className="flex items-baseline gap-3 pt-2">
            <span className="text-3xl font-extrabold text-slate-900">
              {formatCLP(product.price)}
            </span>
            {product.compareAtPrice && (
              <span className="text-base text-slate-400 line-through">
                {formatCLP(product.compareAtPrice)}
              </span>
            )}
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
              IVA Incluido
            </span>
          </div>

          {/* Description */}
          <p className="text-sm text-slate-600 leading-relaxed pt-2">
            {product.description}
          </p>

          {/* Stock & Quantity Controls */}
          <div className="space-y-4 pt-4 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Disponibilidad:
              </span>
              {isOutOfStock ? (
                <span className="text-xs font-bold text-rose-600 bg-rose-50 px-3 py-1 rounded-full">
                  Sin Stock Disponible
                </span>
              ) : (
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
                  En Stock ({product.stock} unidades)
                </span>
              )}
            </div>

            {!isOutOfStock && (
              <div className="flex items-center gap-4">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Cantidad:
                </span>
                <div className="flex items-center border border-slate-200 rounded-2xl bg-slate-50">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3.5 py-2 text-slate-600 hover:text-pink-600 font-bold"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 font-bold text-sm text-slate-900">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="px-3.5 py-2 text-slate-600 hover:text-pink-600 font-bold"
                  >
                    +
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Main Action Buttons */}
          <div className="flex items-center gap-3 pt-2">
            {isOutOfStock ? (
              <button
                onClick={() => setRestockRequested(true)}
                disabled={restockRequested}
                className={`flex-1 py-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${
                  restockRequested
                    ? "bg-emerald-500 text-white"
                    : "bg-slate-900 hover:bg-pink-600 text-white"
                }`}
              >
                {restockRequested ? (
                  <>
                    <Check className="w-5 h-5" />
                    <span>¡Te avisaremos al correo cuando haya stock!</span>
                  </>
                ) : (
                  <>
                    <BellRing className="w-5 h-5" />
                    <span>Recuérdame cuando haya stock</span>
                  </>
                )}
              </button>
            ) : (
              <button
                onClick={handleAddToCart}
                className={`flex-1 py-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-lg ${
                  addedSuccess
                    ? "bg-emerald-500 text-white shadow-emerald-200"
                    : "bg-pink-500 hover:bg-pink-600 text-white shadow-pink-200 hover:scale-[1.02] active:scale-[0.98]"
                }`}
              >
                {addedSuccess ? (
                  <>
                    <Check className="w-5 h-5" />
                    <span>¡Agregado al Carrito!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-5 h-5" />
                    <span>Agregar al Carrito</span>
                  </>
                )}
              </button>
            )}

            <button
              onClick={() => setIsWishlisted(!isWishlisted)}
              className={`p-4 rounded-2xl border transition-all ${
                isWishlisted
                  ? "bg-rose-50 border-rose-200 text-rose-500"
                  : "border-slate-200 text-slate-500 hover:border-pink-300 hover:bg-pink-50"
              }`}
            >
              <Heart className={`w-5 h-5 ${isWishlisted ? "fill-rose-500" : ""}`} />
            </button>
          </div>

          {/* Delivery & Physical Store Pickup Info Box */}
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3 text-xs text-slate-600">
            <div className="flex items-center gap-2 font-bold text-slate-800">
              <MapPin className="w-4 h-4 text-pink-500" />
              <span>Retiro en Tienda Física</span>
            </div>
            <p>
              Galería Escorial, Plaza Vergara, Viña del Mar. Horario: 11:00 a 20:00 hrs.
              También puedes gestionar tu retiro presencial con Uber Flash tras realizar tu compra online.
            </p>
          </div>

          {/* Statutory Legal Disclaimer Notice */}
          <div className="bg-amber-50/70 p-4 rounded-2xl border border-amber-200/60 text-[11px] text-amber-900 space-y-1">
            <span className="font-bold block">Aviso Legal de Devoluciones (Ley 19.496):</span>
            <p className="leading-relaxed">
              Mochi Club excluye el derecho a retracto por arrepentimiento. Las devoluciones aplican únicamente por falla de fábrica demostrable. Productos comestibles (snacks/bebidas) no tienen devolución por razones de higiene.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
