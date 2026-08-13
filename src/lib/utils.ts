import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format currency in Chilean Pesos (CLP)
 * Example: 2990 -> "$2.990"
 */
export function formatCLP(amount: number): string {
  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Format dates into Spanish standard format
 */
export function formatDate(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat("es-CL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(d);
}

/**
 * Returns suggested pickup date based on store schedule (11:00 - 20:00)
 * If current time is after 20:00, default is tomorrow.
 */
export function getSuggestedPickupDate(): Date {
  const now = new Date();
  const closingHour = 20; // 20:00 hrs
  
  if (now.getHours() >= closingHour) {
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow;
  }
  
  return now;
}
