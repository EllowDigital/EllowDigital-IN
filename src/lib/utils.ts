import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * A utility function to combine class names using `clsx` and `tailwind-merge`.
 *
 * @param inputs - A list of class values to be merged and processed.
 * @returns A merged string of class names.
 */
export function cn(...inputs: ClassValue[]) {
  // Merge the class names and resolve any conflicts using `twMerge`
  return twMerge(clsx(...inputs));
}
