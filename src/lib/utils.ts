import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isClient() {
  return typeof window !== "undefined";
}

export const loginUrl = "https://deepak-api.prashne.com/auth/google/authorize";

export function login() {
  window.location.href = loginUrl;
}
