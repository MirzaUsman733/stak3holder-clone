import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(value: number | null | undefined) {
  if (value == null || Number.isNaN(value)) return "$0.00";
  return `$${value.toFixed(2)}`;
}

export function formatPercent(value: number | null | undefined) {
  if (value == null || Number.isNaN(value)) return "-";
  const amount =
    Math.abs(value) >= 1000
      ? Math.abs(value)
      : Number(Math.abs(value).toFixed(2));
  const arrow = value > 0 ? "▲" : value < 0 ? "▼" : "";
  return `${arrow} ${amount}%`.trim();
}

export function getPercentClass(value: number | null | undefined) {
  if (value == null || Number.isNaN(value) || value === 0) {
    return "text-muted-foreground";
  }
  return value > 0 ? "text-success" : "text-destructive";
}
