import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utility function for conditionally joining CSS class names.
 *
 * Combines clsx for conditional class logic with tailwind-merge to resolve
 * conflicting Tailwind CSS classes. This is the standard utility function
 * used throughout the application for dynamic styling.
 *
 * @param inputs - Class values (strings, objects, arrays, etc.) to merge
 * @returns Merged and deduplicated class string optimized for Tailwind CSS
 *
 * @example
 * ```ts
 * cn('px-4 py-2', isActive && 'bg-blue-500', className)
 * cn('bg-red-500 bg-blue-500') // Returns 'bg-blue-500' (last wins)
 * ```
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
