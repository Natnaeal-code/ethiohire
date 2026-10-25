"use client";

import { useMemo } from "react";
import Link from "next/link";
import { Briefcase, FileText, ArrowRight } from "lucide-react";
import { AuthGate } from "@/components/auth-gate";
import { useAppStore } from "@/store/app-store";
import { formatDate } from "@/lib/utils";

export default function DashboardPage() {
  return (
    <AuthGate role="seeker">
      <DashboardContent />
    </AuthGate>
  );
}

function DashboardContent() {
  const currentUser = useAppStore((s) => s.currentUser)!;
  const jobs = useAppStore((s) => s.jobs);
  const allApplications = useAppStore((s) => s.applications);

  const applications = useMemo(
    () => allApplications.filter((a) => a.userId === currentUser.id),
    [allApplications, currentUser.id]
  );

  const pending = applications.filter((a) => a.status === "pending").length;
  const recent = applications.slice(0, 3);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <div className="animate-fade-up">
        <h1 className="font-display text-3xl font-bold text-foreground">
          Hello, {currentUser.name.split(" ")[0]}
        </h1>
        <p className="mt-2 text-muted">
          Your EthioHire seeker dashboard — track progress and keep applying.
        </p>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-3 animate-fade-up stagger-1">
        <div className="rounded-xl border border-border bg-surface p-5">
          <p className="text-sm text-muted">Applications</p>
          <p className="mt-1 font-display text-3xl font-bold">
            {applications.length}
          </p>
        </div>
        <div className="rounded-xl border border-border bg-surface p-5">
          <p className="text-sm text-muted">Pending review</p>
          <p className="mt-1 font-display text-3xl font-bold">{pending}</p>
        </div>
        <div className="rounded-xl border border-border bg-surface p-5">
          <p className="text-sm text-muted">Open listings</p>
          <p className="mt-1 font-display text-3xl font-bold">{jobs.length}</p>
        </div>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        <section className="animate-fade-up stagger-2">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-xl font-semibold">
              Recent applications
            </h2>
            <Link
              href="/dashboard/applications"
              className="text-sm font-semibold text-primary hover:underline"
            >
              View all
            </Link>
          </div>
          {recent.length === 0 ? (
            <div className="rounded-xl border border-dashed border-border bg-surface-soft/50 p-6 text-sm text-muted">
              You have not applied to any jobs yet.{" "}
              <Link href="/jobs" className="font-semibold text-primary">
                Browse openings
              </Link>
            </div>
          ) : (
            <ul className="divide-y divide-border rounded-xl border border-border bg-surface">
              {recent.map((app) => {
                const job = jobs.find((j) => j.id === app.jobId);
                return (
                  <li key={app.id} className="flex items-start gap-3 p-4">
                    <FileText size={18} className="mt-0.5 text-primary" />
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-foreground">
                        {job?.title || "Removed job"}
                      </p>
                      <p className="text-sm text-muted">
                        {job?.company} · Applied {formatDate(app.appliedAt)}
                      </p>
                    </div>
                    <span className="text-xs font-semibold capitalize text-muted">
                      {app.status}
                    </span>
                  </li>
                );
              })}
            </ul>
          )}
        </section>

        <section className="animate-fade-up stagger-3">
          <h2 className="mb-4 font-display text-xl font-semibold">
            Quick actions
          </h2>
          <div className="space-y-3">
            <Link
              href="/jobs"
              className="flex items-center justify-between rounded-xl border border-border bg-surface p-4 transition hover:border-primary/40 hover:bg-surface-soft/40"
            >
              <span className="flex items-center gap-3">
                <Briefcase size={18} className="text-primary" />
                <span className="font-medium">Browse job listings</span>
              </span>
              <ArrowRight size={16} className="text-muted" />
            </Link>
            <Link
              href="/dashboard/applications"
              className="flex items-center justify-between rounded-xl border border-border bg-surface p-4 transition hover:border-primary/40 hover:bg-surface-soft/40"
            >
              <span className="flex items-center gap-3">
                <FileText size={18} className="text-primary" />
                <span className="font-medium">Review my applications</span>
              </span>
              <ArrowRight size={16} className="text-muted" />
            </Link>
          </div>
          <p className="mt-6 text-xs text-muted">
            Signed in as {currentUser.email} · account stored in this browser
          </p>
        </section>
      </div>
    </div>
  );
}
