"use client";

import { useMemo } from "react";
import Link from "next/link";
import { AuthGate } from "@/components/auth-gate";
import { StatusBadge } from "@/components/status-badge";
import { useAppStore } from "@/store/app-store";
import { formatDate } from "@/lib/utils";

export default function ApplicationsPage() {
  return (
    <AuthGate role="seeker">
      <ApplicationsContent />
    </AuthGate>
  );
}

function ApplicationsContent() {
  const currentUser = useAppStore((s) => s.currentUser)!;
  const jobs = useAppStore((s) => s.jobs);
  const allApplications = useAppStore((s) => s.applications);

  const sorted = useMemo(() => {
    return allApplications
      .filter((a) => a.userId === currentUser.id)
      .sort(
        (a, b) =>
          new Date(b.appliedAt).getTime() - new Date(a.appliedAt).getTime()
      );
  }, [allApplications, currentUser.id]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <div className="animate-fade-up">
        <h1 className="font-display text-3xl font-bold text-foreground">
          My applications
        </h1>
        <p className="mt-2 text-muted">
          Every application you have submitted on EthioHire.
        </p>
      </div>

      {sorted.length === 0 ? (
        <div className="mt-10 rounded-xl border border-dashed border-border bg-surface p-10 text-center animate-fade-up stagger-1">
          <p className="text-muted">No applications yet.</p>
          <Link
            href="/jobs"
            className="mt-4 inline-block rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-white hover:bg-primary-dark"
          >
            Find a job to apply
          </Link>
        </div>
      ) : (
        <div className="mt-8 space-y-4 animate-fade-up stagger-1">
          {sorted.map((app) => {
            const job = jobs.find((j) => j.id === app.jobId);
            return (
              <article
                key={app.id}
                className="rounded-xl border border-border bg-surface p-5 shadow-sm"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="font-display text-lg font-semibold text-foreground">
                        {job?.title || "Job removed"}
                      </h2>
                      <StatusBadge status={app.status} />
                    </div>
                    <p className="mt-1 text-sm text-muted">
                      {job?.company || "—"} · Applied{" "}
                      {formatDate(app.appliedAt)}
                    </p>
                  </div>
                  {job && (
                    <Link
                      href={`/jobs/${job.id}`}
                      className="shrink-0 text-sm font-semibold text-primary hover:underline"
                    >
                      View job
                    </Link>
                  )}
                </div>
                <div className="mt-4 rounded-lg bg-surface-soft/70 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted">
                    Cover letter
                  </p>
                  <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-foreground">
                    {app.coverLetter}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
