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
export * from './select';
export * from './gender-select';
export * from './avatar';
export * from './calendar';
export * from './card';
export * from './dropdown-menu';
export * from './country-dropdown';
export * from './dialog';
export * from './date-picker';
export * from './command';
export * from './sidebar';
export * from './tabs';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
