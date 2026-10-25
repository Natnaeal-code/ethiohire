import type { ApplicationStatus } from "@/types";
import { statusLabel } from "@/lib/utils";

const styles: Record<ApplicationStatus, string> = {
  pending: "bg-accent-soft text-warning",
  reviewed: "bg-blue-50 text-info",
  accepted: "bg-emerald-50 text-success",
  rejected: "bg-red-50 text-danger",
};

export function StatusBadge({ status }: { status: ApplicationStatus }) {
  return (
    <span
      className={`inline-flex rounded px-2 py-0.5 text-xs font-semibold ${styles[status]}`}
    >
      {statusLabel(status)}
    </span>
  );
}
