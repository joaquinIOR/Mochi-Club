import Link from "next/link";
import { Instagram, MapPin, Clock, ShieldCheck, Truck, RefreshCw, Sparkles } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Value Proposition Badges */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-12 border-b border-slate-800 text-center md:text-left">
          <div className="flex flex-col md:flex-row items-center gap-4 bg-slate-800/50 p-5 rounded-2xl border border-slate-800">
            <div className="w-12 h-12 rounded-xl bg-pink-500/10 text-pink-400 flex items-center justify-center shrink-0">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-semibold text-white text-sm">Retiro Presencial en Tienda</h4>
              <p className="text-xs text-slate-400 mt-1">Galería Escorial, Plaza Vergara, Viña del Mar.</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-4 bg-slate-800/50 p-5 rounded-2xl border border-slate-800">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-semibold text-white text-sm">Opción Despacho Uber</h4>
              <p className="text-xs text-slate-400 mt-1">Gestiona tu propio retiro con Uber Flash tras comprar.</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-4 bg-slate-800/50 p-5 rounded-2xl border border-slate-800">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-semibold text-white text-sm">Pago 100% Seguro</h4>
              <p className="text-xs text-slate-400 mt-1">Procesado vía Mercado Pago Checkout Pro.</p>
            </div>
          </div>
        </div>

        {/* Links & Info */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 py-12">
          {/* Brand Col */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-pink-500 flex items-center justify-center text-white font-bold text-base">
                🍡
              </div>
              <span className="font-bold text-xl text-white">Mochi Club</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Tu tienda favorita de cultura asiática, snacks, peluches, K-pop, anime y cosmética Kawaii en Viña del Mar.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://www.instagram.com/mochiclub.cl/"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-slate-800 hover:bg-pink-500 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                title="Síguenos en Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <span className="text-xs text-pink-400 font-medium">@mochiclub.cl</span>
            </div>
          </div>

          {/* Categorías Col */}
          <div>
            <h4 className="font-semibold text-white text-sm mb-4">Categorías Popular</h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li><Link href="/productos?categoria=snacks" className="hover:text-pink-400 transition-colors">Snacks & Bebidas Asiáticas</Link></li>
              <li><Link href="/productos?categoria=peluches" className="hover:text-pink-400 transition-colors">Peluches Mochi Kawaii</Link></li>
              <li><Link href="/productos?categoria=k-pop" className="hover:text-pink-400 transition-colors">K-pop & Lightsticks</Link></li>
              <li><Link href="/productos?categoria=photocards" className="hover:text-pink-400 transition-colors">Photocards & Binders</Link></li>
              <li><Link href="/productos?categoria=beauty" className="hover:text-pink-400 transition-colors">Beauty & Skincare</Link></li>
            </ul>
          </div>

          {/* Horario & Local */}
          <div>
            <h4 className="font-semibold text-white text-sm mb-4">Local Físico</h4>
            <div className="space-y-3 text-xs text-slate-400">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-pink-400 shrink-0 mt-0.5" />
                <span>Galería Escorial, Plaza Vergara, Viña del Mar, Chile.</span>
              </p>
              <p className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-pink-400 shrink-0 mt-0.5" />
                <span>Lunes a Sábado: 11:00 a 20:00 hrs</span>
              </p>
            </div>
          </div>

          {/* Legal Notice */}
          <div>
            <h4 className="font-semibold text-white text-sm mb-4">Información Legal</h4>
            <div className="bg-slate-800/80 p-4 rounded-xl text-[11px] text-slate-400 space-y-2 border border-slate-700/50">
              <div className="flex items-center gap-1.5 text-amber-400 font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Aviso sobre Devoluciones</span>
              </div>
              <p className="leading-relaxed">
                De conformidad con la Ley 19.496, Mochi Club no contempla el derecho a retracto por arrepentimiento. Las devoluciones aplican únicamente por falla de fabricación. Snacks y comestibles no admiten devolución por higiene.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-slate-800 text-center md:flex md:items-center md:justify-between text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Mochi Club Chile. Todos los derechos reservados.</p>
          <p className="mt-2 md:mt-0 text-[11px]">
            Precios mostrados incluyen IVA (CLP).
          </p>
        </div>
      </div>
    </footer>
  );
}
