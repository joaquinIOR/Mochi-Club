"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useMemo, Suspense } from "react";
import { Search, Filter, SlidersHorizontal, RefreshCw, ShoppingBag, Sparkles } from "lucide-react";
import { ProductCard } from "@/components/products/ProductCard";
import { formatCLP } from "@/lib/utils";

// Mock dataset for catalog presentation
const ALL_PRODUCTS = [
  {
    id: "prod-1",
    name: "Pocky Strawberry Cookie Crisp (Edición Japón)",
    slug: "pocky-strawberry-cookie-crisp",
    price: 2490,
    compareAtPrice: 2990,
    image: "https://images.unsplash.com/photo-1582293041079-7814c2f12063?q=80&w=800&auto=format&fit=crop",
    category: "snacks",
    categoryName: "Snacks",
    stock: 24,
    isFeatured: true,
  },
  {
    id: "prod-2",
    name: "Bebida Ramune Sabor Melón Tradicional 200ml",
    slug: "bebida-ramune-melon-200ml",
    price: 1990,
    compareAtPrice: null,
    image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?q=80&w=800&auto=format&fit=crop",
    category: "snacks",
    categoryName: "Snacks",
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
    category: "peluches",
    categoryName: "Peluches",
    stock: 8,
    isFeatured: true,
  },
  {
    id: "prod-4",
    name: "Lightstick Oficial K-Pop Stray Kids Ver 2",
    slug: "lightstick-stray-kids-ver2",
    price: 64990,
    compareAtPrice: null,
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=800&auto=format&fit=crop",
    category: "k-pop",
    categoryName: "K-pop",
    stock: 3,
    isFeatured: true,
  },
  {
    id: "prod-5",
    name: "Figura Acrílica Nezuko Demon Slayer Standee 15cm",
    slug: "figura-acrilica-nezuko-demon-slayer",
    price: 5990,
    compareAtPrice: null,
    image: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=800&auto=format&fit=crop",
    category: "anime",
    categoryName: "Anime",
    stock: 12,
    isFeatured: false,
  },
  {
    id: "prod-6",
    name: "Binder Photocards Pastel Pink Holográfico (64 bolsillos)",
    slug: "binder-photocards-pink-holografico",
    price: 8990,
    compareAtPrice: 10990,
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop",
    category: "k-pop",
    categoryName: "K-pop · Photocards",
    stock: 15,
    isFeatured: true,
  },
  {
    id: "prod-7",
    name: "Mascarilla Sheet Mask Peach & Honey Glowing Skin",
    slug: "mascarilla-peach-honey-skincare",
    price: 1490,
    compareAtPrice: null,
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=800&auto=format&fit=crop",
    category: "beauty",
    categoryName: "Beauty",
    stock: 50,
    isFeatured: false,
  },
  {
    id: "prod-8",
    name: "Lámpara Nube LED Kawaii Sensible al Tacto",
    slug: "lampara-nube-led-kawaii",
    price: 11990,
    compareAtPrice: null,
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=800&auto=format&fit=crop",
    category: "decoracion",
    categoryName: "Decoración",
    stock: 0, // Out of stock
    isFeatured: false,
  },
];

function CatalogContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const selectedCategory = searchParams.get("categoria") || "todas";
  const searchQuery = searchParams.get("q") || "";
  const sortOption = searchParams.get("orden") || "recientes";
  const inStockOnly = searchParams.get("stock") === "true";
  const offersOnly = searchParams.get("oferta") === "true";

  const [maxPriceFilter, setMaxPriceFilter] = useState<number>(70000);

  const categoriesList = [
    { slug: "todas", name: "Todas las Categorías" },
    { slug: "snacks", name: "Snacks & Bebidas" },
    { slug: "peluches", name: "Peluches Kawaii" },
    { slug: "k-pop", name: "K-pop + Photocards" },
    { slug: "anime", name: "Anime" },
    { slug: "descuentos", name: "Descuentos" },
    { slug: "beauty", name: "Beauty & Skincare" },
    { slug: "decoracion", name: "Decoración" },
    { slug: "pancartas", name: "Pancartas" },
    { slug: "otros", name: "Otros" },
  ];

  const updateFilter = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`/productos?${params.toString()}`);
  };

  const filteredProducts = useMemo(() => {
    return ALL_PRODUCTS.filter((prod) => {
      // Category filter
      if (selectedCategory !== "todas" && selectedCategory !== "descuentos" && prod.category !== selectedCategory) {
        return false;
      }
      if ((selectedCategory === "descuentos" || offersOnly) && !(prod.compareAtPrice && prod.compareAtPrice > prod.price)) {
        return false;
      }
      // Search filter
      if (
        searchQuery &&
        !prod.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !prod.categoryName.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }
      // Price filter
      if (prod.price > maxPriceFilter) {
        return false;
      }
      // In stock filter
      if (inStockOnly && prod.stock <= 0) {
        return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortOption === "precio-asc") return a.price - b.price;
      if (sortOption === "precio-desc") return b.price - a.price;
      if (sortOption === "nombre-az") return a.name.localeCompare(b.name);
      return 0; // default recientes
    });
  }, [selectedCategory, searchQuery, sortOption, maxPriceFilter, inStockOnly, offersOnly]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header title */}
      <div className="mb-8 border-b border-pink-100 pb-6">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Catálogo <span className="text-pink-500">Mochi Club</span>
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          {filteredProducts.length} productos encontrados
          {selectedCategory !== "todas" && ` en ${selectedCategory}`}
          {searchQuery && ` para "${searchQuery}"`}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Filters */}
        <aside className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-pink-100 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-pink-500" />
                <span>Filtros</span>
              </h3>
              {(selectedCategory !== "todas" || searchQuery || inStockOnly || offersOnly) && (
                <button
                  onClick={() => router.push("/productos")}
                  className="text-xs text-pink-600 font-semibold hover:underline flex items-center gap-1"
                >
                  <RefreshCw className="w-3 h-3" /> Limpiar
                </button>
              )}
            </div>

            {/* Category Filter */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                Categoría
              </label>
              <div className="space-y-1">
                {categoriesList.map((cat) => (
                  <button
                    key={cat.slug}
                    onClick={() =>
                      updateFilter(
                        "categoria",
                        cat.slug === "todas" ? null : cat.slug
                      )
                    }
                    className={`w-full text-left px-3.5 py-2 rounded-xl text-xs font-medium transition-colors flex items-center justify-between ${
                      selectedCategory === cat.slug
                        ? "bg-pink-500 text-white font-bold shadow-xs"
                        : "text-slate-700 hover:bg-pink-50"
                    }`}
                  >
                    <span>{cat.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Price Max Filter */}
            <div className="border-t border-slate-100 pt-5">
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Precio Máximo
                </label>
                <span className="text-xs font-bold text-pink-600">
                  {formatCLP(maxPriceFilter)}
                </span>
              </div>
              <input
                type="range"
                min="1500"
                max="70000"
                step="1000"
                value={maxPriceFilter}
                onChange={(e) => setMaxPriceFilter(Number(e.target.value))}
                className="w-full accent-pink-500"
              />
            </div>

            {/* In Stock Toggle */}
            <div className="border-t border-slate-100 pt-5">
              <label className="flex items-center gap-2.5 cursor-pointer text-xs font-semibold text-slate-700">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) =>
                    updateFilter("stock", e.target.checked ? "true" : null)
                  }
                  className="rounded border-slate-300 text-pink-500 focus:ring-pink-400 w-4 h-4"
                />
                <span>Solo disponibles en stock</span>
              </label>
            </div>
          </div>
        </aside>

        {/* Catalog Main Grid */}
        <main className="lg:col-span-3 space-y-6">
          {/* Top Bar Sort Controls */}
          <div className="bg-white p-4 rounded-2xl border border-pink-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-medium">
            <div className="flex items-center gap-2">
              <span className="text-slate-400">Ordenar por:</span>
              <select
                value={sortOption}
                onChange={(e) => updateFilter("orden", e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 font-semibold text-slate-700 focus:outline-none focus:border-pink-400"
              >
                <option value="recientes">Más Recientes</option>
                <option value="precio-asc">Precio: Menor a Mayor</option>
                <option value="precio-desc">Precio: Mayor a Menor</option>
                <option value="nombre-az">Nombre (A-Z)</option>
              </select>
            </div>
          </div>

          {/* Product Grid or Empty State */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  slug={product.slug}
                  price={product.price}
                  compareAtPrice={product.compareAtPrice}
                  image={product.image}
                  category={product.categoryName}
                  stock={product.stock}
                  isFeatured={product.isFeatured}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-12 text-center border border-pink-100 space-y-4">
              <div className="w-16 h-16 bg-pink-50 rounded-full flex items-center justify-center mx-auto text-2xl">
                🌸
              </div>
              <h3 className="font-bold text-slate-800 text-lg">
                No encontramos productos
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Intenta ajustando los filtros de búsqueda o explorando otra categoría.
              </p>
              <button
                onClick={() => router.push("/productos")}
                className="px-5 py-2.5 bg-pink-500 text-white rounded-xl text-xs font-bold hover:bg-pink-600 transition-colors"
              >
                Ver Todo el Catálogo
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default function CatalogPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-slate-400">Cargando catálogo...</div>}>
      <CatalogContent />
    </Suspense>
  );
}
