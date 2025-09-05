import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getInitials(name: string): string {
  const nameParts = name.split(' ')
  const initials = nameParts.map((part) => part.charAt(0).toUpperCase()).slice(0, 2)
  return initials.join('')
}
