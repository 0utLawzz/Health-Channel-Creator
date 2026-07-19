// Asia/Karachi (UTC+5) date/time formatting for all dashboard UI.
// Database values are stored in UTC; all user-facing timestamps are converted
// to PKT before display. Format: DD-MMM-YY hh:mm AM/PM (e.g. 20-Jul-26 02:00 PM)

export const PK_TIMEZONE = "Asia/Karachi";

function toDate(value: string | Date | null | undefined): Date | null {
  if (!value) return null;
  const d = typeof value === "string" ? new Date(value) : value;
  return Number.isNaN(d.getTime()) ? null : d;
}

function getParts(
  value: Date,
  options: Intl.DateTimeFormatOptions,
): Record<string, string> {
  const parts = new Intl.DateTimeFormat("en-PK", {
    timeZone: PK_TIMEZONE,
    ...options,
  }).formatToParts(value);
  const map: Record<string, string> = {};
  for (const p of parts) map[p.type] = p.value;
  return map;
}

/** Format a date (no time) in Asia/Karachi — DD-MMM-YY */
export function formatPKDate(value: string | Date | null | undefined): string {
  const d = toDate(value);
  if (!d) return "—";
  const p = getParts(d, { day: "2-digit", month: "short", year: "2-digit" });
  return `${p.day}-${p.month}-${p.year}`;
}

/** Format a date + time in Asia/Karachi — DD-MMM-YY hh:mm AM/PM */
export function formatPKT(value: string | Date | null | undefined): string {
  const d = toDate(value);
  if (!d) return "—";
  const p = getParts(d, {
    day: "2-digit",
    month: "short",
    year: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
  return `${p.day}-${p.month}-${p.year} ${p.hour}:${p.minute} ${p.dayPeriod}`;
}

/** Format only the time in Asia/Karachi — hh:mm AM/PM */
export function formatPKTime(value: string | Date | null | undefined): string {
  const d = toDate(value);
  if (!d) return "—";
  const p = getParts(d, { hour: "2-digit", minute: "2-digit", hour12: true });
  return `${p.hour}:${p.minute} ${p.dayPeriod}`;
}
