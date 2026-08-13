"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Package,
  FolderTree,
  ShoppingBag,
  Users,
  AlertTriangle,
  TrendingUp,
  Clock,
  CheckCircle2,
  BellRing,
  Sparkles,
} from "lucide-react";
import { formatCLP } from "@/lib/utils";

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<"pedidos" | "productos" | "categorias">("pedidos");

  const [orders, setOrders] = useState([
    {
      id: "ORD-1001",
      customer: "Constanza Silva",
      email: "constanza@example.com",
      itemsCount: 3,
      total: 19470,
      pickupMethod: "STORE_PICKUP",
      pickupDate: "2026-08-12",
      status: "PAID",
      createdAt: "12 Ago 2026, 11:20",
    },
    {
      id: "ORD-1002",
      customer: "Ignacio Morales",
      email: "ignacio@example.com",
      itemsCount: 1,
      total: 64990,
      pickupMethod: "UBER",
      pickupDate: "2026-08-12",
      status: "PREPARING",
      createdAt: "12 Ago 2026, 12:05",
    },
    {
      id: "ORD-1003",
      customer: "Camila Reyes",
      email: "camila@example.com",
      itemsCount: 2,
      total: 8980,
      pickupMethod: "STORE_PICKUP",
      pickupDate: "2026-08-13",
      status: "READY_FOR_PICKUP",
      createdAt: "12 Ago 2026, 14:15",
    },
  ]);

  const updateOrderStatus = (orderId: string, newStatus: string) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "PENDING":
        return <span className="bg-amber-100 text-amber-800 text-[11px] font-bold px-2.5 py-1 rounded-full">Pendiente</span>;
      case "PAID":
        return <span className="bg-blue-100 text-blue-800 text-[11px] font-bold px-2.5 py-1 rounded-full">Pagado</span>;
      case "PREPARING":
        return <span className="bg-purple-100 text-purple-800 text-[11px] font-bold px-2.5 py-1 rounded-full">Preparando</span>;
      case "READY_FOR_PICKUP":
        return <span className="bg-pink-100 text-pink-800 text-[11px] font-bold px-2.5 py-1 rounded-full">Listo para Retiro</span>;
      case "DELIVERED":
        return <span className="bg-emerald-100 text-emerald-800 text-[11px] font-bold px-2.5 py-1 rounded-full">Entregado</span>;
      default:
        return <span className="bg-slate-100 text-slate-800 text-[11px] font-bold px-2.5 py-1 rounded-full">{status}</span>;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Admin Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-pink-100 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 text-white text-xs font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-pink-400" />
            <span>Panel de Administración</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Mochi Club <span className="text-pink-500">Dashboard</span>
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/"
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors"
          >
            Ir a Tienda
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-pink-100 shadow-xs space-y-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Ventas del Día</span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-extrabold text-slate-900">{formatCLP(93440)}</span>
            <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" /> +12%
            </span>
          </div>
          <p className="text-[11px] text-slate-400">3 pedidos procesados hoy</p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-pink-100 shadow-xs space-y-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Por Entregar</span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-extrabold text-slate-900">2 Pedidos</span>
            <span className="text-xs font-bold text-pink-600 bg-pink-50 px-2 py-0.5 rounded-full">Retiro/Uber</span>
          </div>
          <p className="text-[11px] text-slate-400">Galería Escorial Viña</p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-pink-100 shadow-xs space-y-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Stock Bajo / Agotado</span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-extrabold text-rose-600">1 Producto</span>
            <AlertTriangle className="w-5 h-5 text-rose-500" />
          </div>
          <p className="text-[11px] text-slate-400">Lámpara Nube LED (Agotado)</p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-pink-100 shadow-xs space-y-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Solicitudes Recuérdame</span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-extrabold text-purple-600">5 Emails</span>
            <BellRing className="w-5 h-5 text-purple-500" />
          </div>
          <p className="text-[11px] text-slate-400">Clientes esperando restock</p>
        </div>
      </div>

      {/* Admin Tabs */}
      <div className="space-y-6">
        <div className="flex items-center gap-2 border-b border-slate-200">
          <button
            onClick={() => setActiveTab("pedidos")}
            className={`px-4 py-2.5 text-xs font-bold border-b-2 transition-all flex items-center gap-2 ${
              activeTab === "pedidos"
                ? "border-pink-500 text-pink-600"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Gestión de Pedidos</span>
          </button>
          <button
            onClick={() => setActiveTab("productos")}
            className={`px-4 py-2.5 text-xs font-bold border-b-2 transition-all flex items-center gap-2 ${
              activeTab === "productos"
                ? "border-pink-500 text-pink-600"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Productos & Inventario</span>
          </button>
        </div>

        {/* Tab Content: Pedidos */}
        {activeTab === "pedidos" && (
          <div className="bg-white rounded-3xl border border-pink-100 overflow-hidden shadow-xs">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-base">Últimos Pedidos Recibidos</h3>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 text-slate-400 uppercase font-bold border-b border-slate-100">
                    <th className="p-4">ID Pedido</th>
                    <th className="p-4">Cliente</th>
                    <th className="p-4">Entrega</th>
                    <th className="p-4">Fecha Retiro</th>
                    <th className="p-4">Total</th>
                    <th className="p-4">Estado</th>
                    <th className="p-4">Acción</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {orders.map((ord) => (
                    <tr key={ord.id} className="hover:bg-pink-50/30 transition-colors">
                      <td className="p-4 font-bold text-slate-900">{ord.id}</td>
                      <td className="p-4">
                        <span className="block font-bold text-slate-800">{ord.customer}</span>
                        <span className="text-[10px] text-slate-400">{ord.email}</span>
                      </td>
                      <td className="p-4 font-semibold text-slate-700">
                        {ord.pickupMethod === "STORE_PICKUP" ? "Retiro en Tienda" : "Uber Flash"}
                      </td>
                      <td className="p-4 font-medium text-slate-700">{ord.pickupDate}</td>
                      <td className="p-4 font-bold text-pink-600">{formatCLP(ord.total)}</td>
                      <td className="p-4">{getStatusBadge(ord.status)}</td>
                      <td className="p-4">
                        <select
                          value={ord.status}
                          onChange={(e) => updateOrderStatus(ord.id, e.target.value)}
                          className="bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-[11px] font-semibold text-slate-700 focus:outline-none focus:border-pink-400"
                        >
                          <option value="PENDING">Pendiente</option>
                          <option value="PAID">Pagado</option>
                          <option value="PREPARING">Preparando</option>
                          <option value="READY_FOR_PICKUP">Listo para retiro</option>
                          <option value="DELIVERED">Entregado</option>
                          <option value="CANCELLED">Cancelado</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab Content: Productos */}
        {activeTab === "productos" && (
          <div className="bg-white rounded-3xl border border-pink-100 p-6 space-y-4 shadow-xs">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-base">Inventario de Productos</h3>
              <button
                onClick={() => alert("Modal para crear nuevo producto")}
                className="px-4 py-2 bg-pink-500 hover:bg-pink-600 text-white rounded-xl text-xs font-bold shadow-sm transition-colors"
              >
                + Nuevo Producto
              </button>
            </div>
            <p className="text-xs text-slate-500">
              Administra el stock, precios y estado visible en el catálogo de Mochi Club.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
