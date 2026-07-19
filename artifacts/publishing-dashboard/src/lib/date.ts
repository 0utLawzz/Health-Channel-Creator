// Asia/Karachi (UTC+5) date/time formatting for all dashboard UI.
// Database values are stored in UTC; all user-facing timestamps are converted
// to PKT before display. Hardcoded "UTC" labels are removed.

export const PK_TIMEZONE = "Asia/Karachi";

const dateFormatter = new Intl.DateTimeFormat("en-PK", {
  timeZone: PK_TIMEZONE,
  dateStyle: "medium",
});

const dateTimeFormatter = new Intl.DateTimeFormat("en-PK", {
  timeZone: PK_TIMEZONE,
  dateStyle: "medium",
  timeStyle: "short",
});

const timeFormatter = new Intl.DateTimeFormat("en-PK", {
  timeZone: PK_TIMEZONE,
  timeStyle: "short",
});

function toDate(value: string | Date | null | undefined): Date | null {
  if (!value) return null;
  const d = typeof value === "string" ? new Date(value) : value;
  return Number.isNaN(d.getTime()) ? null : d;
}

/** Format a date (no time) in Asia/Karachi. */
export function formatPKDate(value: string | Date | null | undefined): string {
  const d = toDate(value);
  return d ? dateFormatter.format(d) : "—";
}

/** Format a date + time in Asia/Karachi. */
export function formatPKT(value: string | Date | null | undefined): string {
  const d = toDate(value);
  return d ? dateTimeFormatter.format(d) : "—";
}

/** Format only the time in Asia/Karachi. */
export function formatPKTime(value: string | Date | null | undefined): string {
  const d = toDate(value);
  return d ? timeFormatter.format(d) : "—";
}
