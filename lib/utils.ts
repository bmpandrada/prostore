import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) { // para sa pag-combine ng class names
  // ang clsx ay ginagamit para sa pagbuo ng class names mula sa iba't ibang inputs
  // at ang twMerge ay ginagamit para sa pag-merge ng Tailwind CSS class names
  return twMerge(clsx(inputs))
}


// function convert prisma object to JSON
export function convertToPlainObject<T>(value: T): T {
  return JSON.parse(JSON.stringify(value))
}

// Format number with decimal places
export function formatNumberWithDecimal(num: number): string {
  const [intVal, decVal] = num.toString().split('.')
  return decVal ? `${intVal}.${decVal.padEnd(2, '0')}` : `${intVal}.00`;
}