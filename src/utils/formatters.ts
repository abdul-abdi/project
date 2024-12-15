import { format } from 'date-fns';

export function formatCurrency(amount: number): string {
  return `$${amount}k`;
}

export function formatDate(date: Date): string {
  return format(date, 'MMM d');
}

export function formatPercentage(value: number): string {
  return `${Math.round(value)}%`;
}