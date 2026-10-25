import { format, parseISO, isPast } from "date-fns";

export function formatDate(dateStr: string): string {
  try {
    return format(parseISO(dateStr), "MMM d, yyyy");
  } catch {
    return dateStr;
  }
}

export function isDeadlinePassed(deadline: string): boolean {
  try {
    return isPast(parseISO(deadline + "T23:59:59"));
  } catch {
    return false;
  }
}

export function generateId(prefix: string): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function statusLabel(status: string): string {
  return status.charAt(0).toUpperCase() + status.slice(1);
}
