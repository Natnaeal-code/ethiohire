import Link from "next/link";
import { MapPin, Clock, Building2 } from "lucide-react";
import type { Job } from "@/types";
import { formatDate, isDeadlinePassed } from "@/lib/utils";

export function JobCard({ job, index = 0 }: { job: Job; index?: number }) {
  const closed = isDeadlinePassed(job.deadline);

  return (
    <Link
      href={`/jobs/${job.id}`}
      className={`group block border-b border-border py-6 transition hover:bg-surface/50 animate-fade-up stagger-${Math.min(index + 1, 4)}`}
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0 flex-1">
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <span className="text-xs font-medium uppercase tracking-wider text-primary">
              {job.category}
            </span>
            <span className="text-border">·</span>
            <span className="text-xs text-muted">{job.type}</span>
            {closed && (
              <span className="text-xs font-medium text-danger">Closed</span>
            )}
          </div>
          <h3 className="font-display text-xl font-semibold text-foreground transition group-hover:text-primary">
            {job.title}
          </h3>
          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted">
            <span className="inline-flex items-center gap-1.5">
              <Building2 size={14} />
              {job.company}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <MapPin size={14} />
              {job.location}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock size={14} />
              Apply by {formatDate(job.deadline)}
            </span>
          </div>
        </div>
        <p className="shrink-0 text-sm font-medium text-foreground sm:pt-1">
          {job.salary}
        </p>
      </div>
    </Link>
  );
}
