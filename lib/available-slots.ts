/**
 * Mock availability data for the Floberg appointment booking system.
 * In production, replace with a real calendar/CRM API.
 */

const WEEKDAY_SLOTS = [
  "09:00", "09:30", "10:00", "10:30", "11:00",
  "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00",
];

const SATURDAY_SLOTS = ["10:00", "10:30", "11:00", "11:30"];

/** Returns available time slots for a given date. */
export function getAvailableSlots(date: Date): string[] {
  const day = date.getDay(); // 0=Sun, 1=Mon, ..., 6=Sat
  if (day === 0) return [];         // Sunday — closed
  if (day === 6) return SATURDAY_SLOTS;
  return WEEKDAY_SLOTS;
}

/** Utility: get start of day (midnight) for a date */
function startOfDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

/** Returns a Date that is `n` days from today (local time). */
function addDays(base: Date, n: number): Date {
  const d = new Date(base);
  d.setDate(d.getDate() + n);
  return d;
}

/**
 * Simulated fully-booked dates.
 * Calculated lazily relative to today so they stay relevant.
 */
function buildBlockedDates(): Date[] {
  const today = new Date();
  const results: Date[] = [];

  // Next Monday
  const dayOfWeek = today.getDay(); // 0=Sun
  const daysUntilMonday = (8 - dayOfWeek) % 7 || 7;
  results.push(startOfDay(addDays(today, daysUntilMonday)));

  // Next Wednesday (Mon + 2)
  results.push(startOfDay(addDays(today, daysUntilMonday + 2)));

  // Two weeks from today
  results.push(startOfDay(addDays(today, 14)));

  return results;
}

export const BLOCKED_DATES: Date[] = buildBlockedDates();

/** Check whether a date is in the BLOCKED_DATES list. */
export function isBlocked(date: Date): boolean {
  const normalized = startOfDay(date).getTime();
  return BLOCKED_DATES.some((d) => d.getTime() === normalized);
}
