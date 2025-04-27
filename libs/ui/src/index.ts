import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export * from './button';
export * from './checkbox';
export * from './form';
export * from './input';
export * from './label';
export * from './sonner';
export * from './tooltip';
export * from './icons';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
