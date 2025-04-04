import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export function clamp(value: number, min: number, max: number): number {
	return Math.max(min, Math.min(value, max));
}
