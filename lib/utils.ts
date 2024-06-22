import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export const backgroundColor = '#f5f5f5';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatAnswer(word: string): string {
  // Split the input string by '---'
  let parts = word.split('-');

  // Trim spaces and ensure each part ends with a period
  parts = parts.map(part => {
    // Trim leading and trailing spaces
    part = part.trim();
    // Add a period at the end if it doesn't have one
    if (part && part[part.length - 1] !== '.') {
      part += '.';
    }
    return part;
  });

  // Join the parts with paragraph tags
  return parts.join(' ');
}