"use client";

import { useState } from "react";
import Link from "next/link";
import {
  MapPin,
  Clock,
  ShieldCheck,
  CreditCard,
  Truck,
  ArrowLeft,
  AlertCircle,
} from "lucide-react";
import { formatCLP, getSuggestedPickupDate } from "@/lib/utils";
import { useCartStore } from "@/store/useCartStore";

export default function CheckoutPage() {
  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);
  const getTotalPrice = useCartStore((state) => state.getTotalPrice());

  // Default suggested pickup date based on store 20:00 hrs closing time
  const defaultSuggestedDate = getSuggestedPickupDate();
  const defaultFormattedDate = defaultSuggestedDate.toISOString().split("T")[0];

  const [pickupMethod, setPickupMethod] = useState<"STORE_PICKUP" | "UBER">("STORE_PICKUP");
  const [pickupDate, setPickupDate] = useState<string>(defaultFormattedDate);
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleCheckoutSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!acceptedTerms) {
      setErrorMessage("Por favor acepta los términos de compra y el aviso legal de retracto para continuar.");
      return;
    }

    if (items.length === 0) {
      setErrorMessage("Tu carrito está vacío.");
      return;
    }

    setIsProcessing(true);

    try {
      const response = await fetch("/api/checkout/preference", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items,
          customer: {
            name: customerName,
            email: customerEmail,
          },
          pickupMethod,
          pickupDate,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "No se pudo generar el pago con Mercado Pago.");
      }

      if (data.init_point) {
        clearCart();
        // Redirect to official Mercado Pago Checkout Pro gateway
        window.location.href = data.init_point;
      } else {
        throw new Error("Respuesta inválida de Mercado Pago.");
      }
    } catch (err: any) {
      setErrorMessage(err.message || "Error al conectar con la pasarela de pago.");
      setIsProcessing(false);
    }
  };

  const isAfterClosing = new Date().getHours() >= 20;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Back Link */}
      <Link
        href="/carrito"
        className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-pink-600 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Volver al Carrito</span>
      </Link>

      <div className="border-b border-pink-100 pb-6">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Finalizar <span className="text-pink-500">Compra</span>
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Selecciona tu modalidad de entrega y fecha para procesar con Mercado Pago
        </p>
      </div>

      {errorMessage && (
        <div className="bg-rose-50 border border-rose-200 p-4 rounded-2xl flex items-center gap-3 text-xs text-rose-700 font-semibold">
          <AlertCircle className="w-5 h-5 text-rose-500 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      <form onSubmit={handleCheckoutSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Form Column */}
        <div className="lg:col-span-7 space-y-6">
          {/* Step 1: Customer Info */}
          <div className="bg-white p-6 rounded-3xl border border-pink-100 shadow-xs space-y-4">
            <h3 className="font-bold text-slate-900 text-base flex items-center gap-2 border-b border-slate-100 pb-3">
              <span className="w-6 h-6 rounded-full bg-pink-500 text-white text-xs font-bold flex items-center justify-center">
                1
              </span>
              <span>Datos del Comprador</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Nombre Completo</label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Ej. Constanza Silva"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-pink-400 font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Correo Electrónico</label>
                <input
                  type="email"
                  required
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  placeholder="tu@email.com"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-pink-400 font-medium"
                />
              </div>
            </div>
          </div>

          {/* Step 2: Pickup Method */}
          <div className="bg-white p-6 rounded-3xl border border-pink-100 shadow-xs space-y-4">
            <h3 className="font-bold text-slate-900 text-base flex items-center gap-2 border-b border-slate-100 pb-3">
              <span className="w-6 h-6 rounded-full bg-pink-500 text-white text-xs font-bold flex items-center justify-center">
                2
              </span>
              <span>Modalidad de Entrega</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Option Store Pickup */}
              <label
                className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex flex-col justify-between ${
                  pickupMethod === "STORE_PICKUP"
                    ? "border-pink-500 bg-pink-50/50 shadow-xs"
                    : "border-slate-200 hover:border-pink-200"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                    <MapPin className="w-4 h-4 text-pink-500" />
                    <span>Retiro en Tienda</span>
                  </div>
                  <input
                    type="radio"
                    name="pickupMethod"
                    checked={pickupMethod === "STORE_PICKUP"}
                    onChange={() => setPickupMethod("STORE_PICKUP")}
                    className="accent-pink-500"
                  />
                </div>
                <p className="text-xs text-slate-500 mt-2">
                  Galería Escorial, Plaza Vergara, Viña del Mar. Gratis.
                </p>
              </label>

              {/* Option Uber */}
              <label
                className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex flex-col justify-between ${
                  pickupMethod === "UBER"
                    ? "border-pink-500 bg-pink-50/50 shadow-xs"
                    : "border-slate-200 hover:border-pink-200"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                    <Truck className="w-4 h-4 text-emerald-500" />
                    <span>Retiro con Uber</span>
                  </div>
                  <input
                    type="radio"
                    name="pickupMethod"
                    checked={pickupMethod === "UBER"}
                    onChange={() => setPickupMethod("UBER")}
                    className="accent-pink-500"
                  />
                </div>
                <p className="text-xs text-slate-500 mt-2">
                  Gestionas tu propio Uber Flash tras confirmarse el pago.
                </p>
              </label>
            </div>
          </div>

          {/* Step 3: Pickup Date Selector */}
          <div className="bg-white p-6 rounded-3xl border border-pink-100 shadow-xs space-y-4">
            <h3 className="font-bold text-slate-900 text-base flex items-center gap-2 border-b border-slate-100 pb-3">
              <span className="w-6 h-6 rounded-full bg-pink-500 text-white text-xs font-bold flex items-center justify-center">
                3
              </span>
              <span>Fecha Estimada de Retiro</span>
            </h3>

            <div className="space-y-3">
              <div className="flex items-center gap-3 bg-pink-50/60 p-3.5 rounded-2xl border border-pink-100 text-xs text-pink-900">
                <Clock className="w-4 h-4 text-pink-500 shrink-0" />
                <span>
                  Horario de cierre de tienda: <strong>20:00 hrs</strong>.
                  {isAfterClosing
                    ? " Como ya pasaron las 20:00 hrs, la fecha sugerida es para MAÑANA."
                    : " Sugerida por defecto para HOY."}
                </span>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Selecciona la fecha en que retirarás tu pedido:
                </label>
                <input
                  type="date"
                  required
                  value={pickupDate}
                  min={new Date().toISOString().split("T")[0]}
                  onChange={(e) => setPickupDate(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:border-pink-400"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Summary & Payment Column */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-pink-100 shadow-sm space-y-6">
            <h3 className="font-bold text-slate-900 text-lg border-b border-slate-100 pb-4 flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-pink-500" />
              <span>Pago con Mercado Pago</span>
            </h3>

            {/* Cart Items Quick List */}
            <div className="space-y-3 max-h-48 overflow-y-auto pr-1">
              {items.map((item) => (
                <div key={item.id} className="flex items-center justify-between text-xs">
                  <span className="font-medium text-slate-700 truncate max-w-[200px]">
                    {item.quantity}x {item.name}
                  </span>
                  <span className="font-bold text-slate-900">{formatCLP(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-slate-100 pt-4 space-y-2 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal</span>
                <span className="font-semibold text-slate-900">{formatCLP(getTotalPrice)}</span>
              </div>
              <div className="flex justify-between items-baseline pt-2">
                <span className="font-extrabold text-slate-900 text-base">Total Final</span>
                <span className="font-extrabold text-pink-600 text-2xl">{formatCLP(getTotalPrice)}</span>
              </div>
            </div>

            {/* Legal Consent Checkbox */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
              <label className="flex items-start gap-2.5 cursor-pointer text-xs text-slate-700">
                <input
                  type="checkbox"
                  required
                  checked={acceptedTerms}
                  onChange={(e) => setAcceptedTerms(e.target.checked)}
                  className="mt-0.5 rounded border-slate-300 text-pink-500 focus:ring-pink-400 w-4 h-4 shrink-0"
                />
                <span className="leading-relaxed">
                  Acepto las políticas de compra y declaro estar informado de que Mochi Club <strong>excluye el derecho a retracto</strong> (Ley 19.496). Devoluciones aplican únicamente por falla de fábrica.
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isProcessing || !acceptedTerms || items.length === 0}
              className={`w-full py-4 rounded-2xl font-extrabold text-base text-white shadow-lg transition-all flex items-center justify-center gap-2 ${
                acceptedTerms && !isProcessing && items.length > 0
                  ? "bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 shadow-pink-200 hover:scale-[1.02] active:scale-[0.98]"
                  : "bg-slate-300 cursor-not-allowed shadow-none"
              }`}
            >
              {isProcessing ? (
                <span>Generando preferencia Mercado Pago...</span>
              ) : (
                <>
                  <ShieldCheck className="w-5 h-5" />
                  <span>Pagar ${formatCLP(getTotalPrice)} en Mercado Pago</span>
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
