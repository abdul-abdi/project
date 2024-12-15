import { isAfter, isBefore, addDays, isFuture } from 'date-fns';

export function isWithinDays(date: Date, days: number): boolean {
  const now = new Date();
  const futureDate = addDays(now, days);
  return isAfter(date, now) && isBefore(date, futureDate);
}

export function isUpcomingDeadline(endDate: Date, withinDays: number): boolean {
  return isFuture(endDate) && isWithinDays(endDate, withinDays);
}

export function isRecentlyUpdated(date: Date, withinDays: number): boolean {
  const now = new Date();
  const pastDate = addDays(now, -withinDays);
  return isAfter(date, pastDate) && isBefore(date, now);
}