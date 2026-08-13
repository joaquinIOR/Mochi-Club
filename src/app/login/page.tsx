"use client";

import { useState } from "react";
import Link from "next/link";
import { ShieldCheck, ArrowLeft, AlertCircle } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");

  const handleGoogleLogin = async () => {
    setLoading(true);
    setErrorMessage(null);

    try {
      const supabase = createClient();
      const origin = window.location.origin;

      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${origin}/auth/callback`,
        },
      });

      if (error) throw error;
    } catch (err: any) {
      console.error("Google Auth error:", err);
      setErrorMessage(
        "No se pudo conectar con Google OAuth. Verifica las credenciales de Supabase en tu archivo .env."
      );
      setLoading(false);
    }
  };

  const handleEmailAuth = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      const supabase = createClient();
      const origin = window.location.origin;

      if (mode === "register") {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { full_name: fullName },
            emailRedirectTo: `${origin}/auth/callback`,
          },
        });
        if (error) throw error;

        if (data.session) {
          window.location.href = "/";
          return;
        }
        setSuccessMessage("Revisa tu correo para confirmar tu cuenta antes de iniciar sesión.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        window.location.href = "/";
        return;
      }
    } catch (err: any) {
      setErrorMessage(err.message || "No pudimos procesar tu solicitud. Inténtalo nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white p-8 sm:p-10 rounded-3xl border border-pink-100 shadow-xl space-y-6 text-center">
        {/* Header */}
        <div className="space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-pink-400 to-rose-300 flex items-center justify-center text-white text-3xl mx-auto shadow-md">
            🍡
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            {mode === "login" ? "Bienvenido a" : "Crea tu cuenta en"} <span className="text-pink-500">Mochi Club</span>
          </h1>
          <p className="text-xs text-slate-500 max-w-xs mx-auto">
            Inicia sesión para gestionar tus pedidos, guardar tus productos favoritos e interactuar con la comunidad.
          </p>
        </div>

        {errorMessage && (
          <div className="bg-rose-50 border border-rose-200 p-3.5 rounded-2xl flex items-center gap-2.5 text-xs text-rose-700 font-semibold text-left">
            <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {successMessage && (
          <div className="bg-emerald-50 border border-emerald-200 p-3.5 rounded-2xl text-xs text-emerald-700 font-semibold text-left">
            {successMessage}
          </div>
        )}

        <form onSubmit={handleEmailAuth} className="space-y-3 text-left">
          {mode === "register" && (
            <div>
              <label className="mb-1 block text-xs font-bold text-slate-700">Nombre</label>
              <input
                required
                value={fullName}
                onChange={(event) => setFullName(event.target.value)}
                placeholder="Tu nombre"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs font-medium outline-none focus:border-pink-400"
              />
            </div>
          )}
          <div>
            <label className="mb-1 block text-xs font-bold text-slate-700">Correo electrónico</label>
            <input
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="tu@email.com"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs font-medium outline-none focus:border-pink-400"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-bold text-slate-700">Contraseña</label>
            <input
              type="password"
              required
              minLength={6}
              autoComplete={mode === "login" ? "current-password" : "new-password"}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Mínimo 6 caracteres"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs font-medium outline-none focus:border-pink-400"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-pink-500 px-4 py-3.5 text-xs font-bold text-white shadow-md shadow-pink-200 transition-colors hover:bg-pink-600 disabled:cursor-not-allowed disabled:bg-pink-300"
          >
            {loading ? "Procesando..." : mode === "login" ? "Iniciar sesión con correo" : "Crear cuenta"}
          </button>
        </form>

        <div className="flex items-center gap-3 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
          <span className="h-px flex-1 bg-slate-200" /> o continúa con <span className="h-px flex-1 bg-slate-200" />
        </div>

        {/* Google OAuth Login Button */}
        <div className="pt-2 space-y-3">
          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full py-3.5 px-4 border border-slate-200 hover:border-pink-300 rounded-2xl font-bold text-xs text-slate-700 hover:bg-pink-50/50 transition-all flex items-center justify-center gap-3 shadow-xs hover:scale-[1.01] active:scale-[0.99]"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>{loading ? "Conectando con Google..." : "Continuar con Google"}</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setMode(mode === "login" ? "register" : "login");
              setErrorMessage(null);
              setSuccessMessage(null);
            }}
            className="text-[11px] font-semibold text-pink-600 hover:text-pink-700"
          >
            {mode === "login" ? "¿No tienes cuenta? Regístrate con correo" : "¿Ya tienes cuenta? Inicia sesión"}
          </button>
        </div>

        {/* Info Note */}
        <div className="bg-slate-50 p-4 rounded-2xl text-left border border-slate-100 text-xs text-slate-500 space-y-1">
          <div className="flex items-center gap-1.5 font-bold text-slate-700">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>Seguridad & Privacidad</span>
          </div>
          <p className="text-[11px]">
            Tus datos de cuenta están protegidos vía Supabase Auth. Nunca compartimos tu información personal.
          </p>
        </div>

        <Link
          href="/"
          className="inline-flex items-center gap-1 text-xs font-semibold text-slate-400 hover:text-pink-500 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Volver al inicio</span>
        </Link>
      </div>
    </div>
  );
}
