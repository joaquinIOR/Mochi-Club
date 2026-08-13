import Link from "next/link";
import Image from "next/image";
import { Sparkles, ArrowRight, MapPin, Clock, ShoppingBag, Star } from "lucide-react";
import { ProductCard } from "@/components/products/ProductCard";
import { FeaturedCarousel } from "@/components/home/FeaturedCarousel";

export default function Home() {
  const featuredCategories = [
    {
      name: "Snacks & Bebidas",
      slug: "snacks",
      image: "https://images.unsplash.com/photo-1582293041079-7814c2f12063?q=80&w=800&auto=format&fit=crop",
      count: "Dulces, Ramens & Ramune",
      color: "from-amber-400/20 to-orange-400/20 border-amber-200",
    },
    {
      name: "Peluches Kawaii",
      slug: "peluches",
      image: "https://images.unsplash.com/photo-1559454403-b8fb88521f11?q=80&w=800&auto=format&fit=crop",
      count: "Mochi Cats & Sanrio",
      color: "from-pink-400/20 to-rose-400/20 border-pink-200",
    },
    {
      name: "K-pop & Lightsticks",
      slug: "k-pop",
      image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=800&auto=format&fit=crop",
      count: "Merch & Álbumes",
      color: "from-purple-400/20 to-indigo-400/20 border-purple-200",
    },
    {
      name: "K-pop: Photocards & Binders",
      slug: "k-pop",
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop",
      count: "Coleccionables & Protecciones",
      color: "from-sky-400/20 to-cyan-400/20 border-sky-200",
    },
  ];

  const featuredProducts = [
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
      id: "prod-2",
      name: "Bebida Ramune Sabor Melón Tradicional 200ml",
      slug: "bebida-ramune-melon-200ml",
      price: 1990,
      image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?q=80&w=800&auto=format&fit=crop",
      category: "Snacks",
      stock: 40,
      isFeatured: true,
    },
    {
      id: "prod-3",
      name: "Peluche Mochi Cat Giant Pink Marshmallow",
      slug: "peluche-mochi-cat-giant-pink",
      price: 14990,
      compareAtPrice: 17990,
      image: "https://images.unsplash.com/photo-1559454403-b8fb88521f11?q=80&w=800&auto=format&fit=crop",
      category: "Peluches",
      stock: 8,
      isFeatured: true,
    },
    {
      id: "prod-4",
      name: "Lightstick Oficial K-Pop Stray Kids Ver 2",
      slug: "lightstick-stray-kids-ver2",
      price: 64990,
      image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=800&auto=format&fit=crop",
      category: "K-pop",
      stock: 3,
      isFeatured: true,
    },
  ];

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      {false && (
      <section className="relative overflow-hidden gradient-hero pt-12 pb-20 border-b border-pink-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Hero Left Text */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 border border-pink-200 text-pink-600 text-xs font-bold shadow-sm backdrop-blur-sm">
                <Sparkles className="w-4 h-4 text-amber-400 fill-amber-400 animate-spin" />
                <span>Tienda Oficial • Galería Escorial, Viña del Mar</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
                Cultura Asiática, <br />
                <span className="gradient-text">Snacks & Estética Kawaii</span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Descubre nuestra cuidada selección de dulces importados de Japón y Corea, peluches mochi ultra suaves, photocards, K-pop y decoración para tu espacio.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  href="/productos"
                  className="w-full sm:w-auto px-8 py-4 bg-pink-500 hover:bg-pink-600 text-white font-bold rounded-2xl shadow-lg shadow-pink-200 hover:shadow-pink-300 transition-all flex items-center justify-center gap-2 text-base hover:scale-105 active:scale-95"
                >
                  <ShoppingBag className="w-5 h-5" />
                  <span>Explorar Catálogo Completo</span>
                </Link>

                <a
                  href="#categorias"
                  className="w-full sm:w-auto px-6 py-4 bg-white/90 hover:bg-white text-slate-700 font-semibold rounded-2xl border border-slate-200 hover:border-pink-300 transition-all text-center text-base"
                >
                  Ver Categorías
                </a>
              </div>

              {/* Quick Info Badges */}
              <div className="pt-6 border-t border-pink-200/60 grid grid-cols-3 gap-4 max-w-md mx-auto lg:mx-0 text-left">
                <div>
                  <span className="block font-bold text-slate-900 text-lg sm:text-xl">100%</span>
                  <span className="text-xs text-slate-500 font-medium">Original Importado</span>
                </div>
                <div>
                  <span className="block font-bold text-slate-900 text-lg sm:text-xl">Retiro</span>
                  <span className="text-xs text-slate-500 font-medium">En Tienda o Uber</span>
                </div>
                <div>
                  <span className="block font-bold text-slate-900 text-lg sm:text-xl">MercadoPago</span>
                  <span className="text-xs text-slate-500 font-medium">Checkout Seguro</span>
                </div>
              </div>
            </div>

            {/* Hero Right Visuals */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md">
                {/* Decorative Backglow */}
                <div className="absolute -inset-4 bg-gradient-to-tr from-pink-400 to-emerald-300 rounded-3xl blur-2xl opacity-40 animate-pulse"></div>

                {/* Card Stack */}
                <div className="relative bg-white/90 backdrop-blur-xl p-6 rounded-3xl border border-white shadow-2xl space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-pink-500 bg-pink-50 px-3 py-1 rounded-full">
                      Más Vendido de la Semana 🍡
                    </span>
                    <span className="text-xs font-semibold text-slate-400 flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" /> 4.9 (48)
                    </span>
                  </div>

                  <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-slate-100 shadow-md">
                    <Image
                      src="https://images.unsplash.com/photo-1559454403-b8fb88521f11?q=80&w=800&auto=format&fit=crop"
                      alt="Peluche Mochi Cat"
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <div>
                      <h4 className="font-bold text-slate-900 text-base">Peluche Mochi Cat Giant Pink</h4>
                      <p className="text-xs text-slate-500">Ultra suave, edición especial Kawaii</p>
                    </div>
                    <span className="font-extrabold text-pink-600 text-lg">$14.990</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      )}

      <FeaturedCarousel />

      {/* Featured Categories Grid */}
      <section id="categorias" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
          <div>
            <span className="text-xs font-bold text-pink-500 uppercase tracking-widest">
              Explora por Interés
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
              Categorías Destacadas
            </h2>
          </div>
          <Link
            href="/productos"
            className="mt-2 md:mt-0 text-sm font-semibold text-pink-600 hover:text-pink-700 flex items-center gap-1 group"
          >
            <span>Ver todas las categorías</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredCategories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/productos?categoria=${cat.slug}`}
              className={`group relative overflow-hidden rounded-3xl p-6 bg-gradient-to-br ${cat.color} border soft-shadow-hover transition-all duration-300 flex flex-col justify-between h-64`}
            >
              <div className="relative z-10">
                <span className="text-xs font-bold text-slate-600 bg-white/70 backdrop-blur-sm px-3 py-1 rounded-full shadow-xs">
                  {cat.count}
                </span>
                <h3 className="text-xl font-bold text-slate-900 mt-3 group-hover:text-pink-600 transition-colors">
                  {cat.name}
                </h3>
              </div>

              <div className="relative h-32 w-full rounded-2xl overflow-hidden mt-4">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-b from-pink-50/50 to-white p-8 sm:p-10 rounded-3xl border border-pink-100 shadow-xs">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
            <div>
              <span className="text-xs font-bold text-pink-500 uppercase tracking-widest">
                Favoritos de la Comunidad
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
                Productos Recién Llegados & Más Vendidos
              </h2>
            </div>
            <Link
              href="/productos"
              className="mt-2 md:mt-0 text-sm font-semibold text-pink-600 hover:text-pink-700 flex items-center gap-1 group"
            >
              <span>Ir al Catálogo</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((prod) => (
              <ProductCard key={prod.id} {...prod} />
            ))}
          </div>
        </div>
      </section>

      {/* Store Location & Hours Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-8 space-y-4">
              <span className="bg-pink-500/20 text-pink-300 text-xs font-bold px-3.5 py-1.5 rounded-full border border-pink-500/30">
                Visítanos en Viña del Mar
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
                Galería Escorial, Plaza Vergara
              </h2>
              <p className="text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
                Haz tu pedido online y retíralo directamente en nuestro local físico sin costo adicional. Si lo prefieres, también puedes pedir tu Uber Flash para retirar tu pedido a la hora que te convenga.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 text-sm text-slate-300">
                <div className="flex items-center gap-3 bg-slate-800/80 p-4 rounded-2xl border border-slate-700">
                  <Clock className="w-6 h-6 text-pink-400 shrink-0" />
                  <div>
                    <span className="block font-bold text-white">Horario de Atención</span>
                    <span className="text-xs text-slate-400">11:00 a 20:00 hrs (Lun a Sáb)</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-slate-800/80 p-4 rounded-2xl border border-slate-700">
                  <MapPin className="w-6 h-6 text-emerald-400 shrink-0" />
                  <div>
                    <span className="block font-bold text-white">Ubicación Céntrica</span>
                    <span className="text-xs text-slate-400">Plaza Vergara, Viña del Mar</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex justify-center">
              <div className="bg-gradient-to-tr from-pink-500 to-rose-400 p-8 rounded-3xl text-center shadow-xl space-y-3 w-full max-w-xs">
                <div className="w-16 h-16 rounded-2xl bg-white/20 text-white flex items-center justify-center mx-auto text-3xl">
                  🛍️
                </div>
                <h3 className="font-bold text-xl text-white">Comprar es Simple</h3>
                <p className="text-xs text-pink-100 leading-relaxed">
                  Elige tus productos → Selecciona fecha de retiro → Paga con Mercado Pago → Retira en tienda.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
