"use client";

import { useState } from "react";
import Link from "next/link";
import { Pencil, Trash2, Plus, Users } from "lucide-react";
import { toast } from "sonner";
import { AuthGate } from "@/components/auth-gate";
import { JobForm } from "@/components/job-form";
import { StatusBadge } from "@/components/status-badge";
import { useAppStore } from "@/store/app-store";
import type { ApplicationStatus, Job } from "@/types";
import { formatDate } from "@/lib/utils";

export default function AdminPage() {
  return (
    <AuthGate role="admin">
      <AdminContent />
    </AuthGate>
  );
}

function AdminContent() {
  const currentUser = useAppStore((s) => s.currentUser)!;
  const jobs = useAppStore((s) => s.jobs);
  const applications = useAppStore((s) => s.applications);
  const users = useAppStore((s) => s.users);
  const addJob = useAppStore((s) => s.addJob);
  const updateJob = useAppStore((s) => s.updateJob);
  const deleteJob = useAppStore((s) => s.deleteJob);
  const updateApplicationStatus = useAppStore((s) => s.updateApplicationStatus);

  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Job | null>(null);
  const [tab, setTab] = useState<"jobs" | "applications">("jobs");

  function handleDelete(id: string, title: string) {
    if (
      typeof window !== "undefined" &&
      !window.confirm(
        `Delete “${title}”? Related applications will also be removed.`,
      )
    ) {
      return;
    }
    const result = deleteJob(id);
    if (!result.ok) {
      toast.error(result.error || "Could not delete job.");
      return;
    }
    toast.success(`Deleted “${title}”.`);
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between animate-fade-up">
        <div>
          <h1 className="font-display text-3xl font-bold text-foreground">
            Admin dashboard
          </h1>
          <p className="mt-2 text-muted">
            Manage listings and review applications · signed in as{" "}
            {currentUser.name}
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            setEditing(null);
            setShowForm(true);
            setTab("jobs");
          }}
          className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-white hover:bg-primary-dark"
        >
          <Plus size={16} />
          Add job
        </button>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-3 animate-fade-up stagger-1">
        <div className="rounded-xl border border-border bg-surface p-5">
          <p className="text-sm text-muted">Active jobs</p>
          <p className="mt-1 font-display text-3xl font-bold">{jobs.length}</p>
        </div>
        <div className="rounded-xl border border-border bg-surface p-5">
          <p className="text-sm text-muted">Applications</p>
          <p className="mt-1 font-display text-3xl font-bold">
            {applications.length}
          </p>
        </div>
        <div className="rounded-xl border border-border bg-surface p-5">
          <p className="flex items-center gap-1.5 text-sm text-muted">
            <Users size={14} /> Registered users
          </p>
          <p className="mt-1 font-display text-3xl font-bold">{users.length}</p>
        </div>
      </div>

      {(showForm || editing) && (
        <section className="mt-8 rounded-xl border border-border bg-surface p-6 shadow-sm animate-fade-in">
          <h2 className="font-display text-xl font-semibold">
            {editing ? "Edit job listing" : "Create job listing"}
          </h2>
          <div className="mt-4">
            <JobForm
              initialJob={editing || undefined}
              submitLabel={editing ? "Save changes" : "Publish job"}
              onCancel={() => {
                setShowForm(false);
                setEditing(null);
              }}
              onSubmit={(values) => {
                const result = editing
                  ? updateJob(editing.id, values)
                  : addJob(values);
                if (!result.ok) {
                  toast.error(result.error || "Could not save job.");
                  return result;
                }
                toast.success(
                  editing
                    ? "Job listing updated."
                    : "Job listing published."
                );
                setShowForm(false);
                setEditing(null);
                return result;
              }}
            />
          </div>
        </section>
      )}

      <div className="mt-10 animate-fade-up stagger-2">
        <div className="flex gap-1 border-b border-border">
          {(
            [
              { id: "jobs", label: "Job listings" },
              { id: "applications", label: "Applications" },
            ] as const
          ).map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className={`border-b-2 px-4 py-2.5 text-sm font-semibold transition ${
                tab === t.id
                  ? "border-primary text-primary"
                  : "border-transparent text-muted hover:text-foreground"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {tab === "jobs" ? (
          <div className="mt-4 overflow-x-auto rounded-xl border border-border bg-surface">
            <table className="w-full min-w-160 text-left text-sm">
              <thead className="border-b border-border bg-surface-soft/60 text-xs uppercase tracking-wider text-muted">
                <tr>
                  <th className="px-4 py-3 font-semibold">Title</th>
                  <th className="px-4 py-3 font-semibold">Company</th>
                  <th className="px-4 py-3 font-semibold">Type</th>
                  <th className="px-4 py-3 font-semibold">Deadline</th>
                  <th className="px-4 py-3 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {jobs.map((job) => (
                  <tr key={job.id} className="hover:bg-surface-soft/40">
                    <td className="px-4 py-3">
                      <Link
                        href={`/jobs/${job.id}`}
                        className="font-medium text-foreground hover:text-primary"
                      >
                        {job.title}
                      </Link>
                      <p className="text-xs text-muted">{job.location}</p>
                    </td>
                    <td className="px-4 py-3 text-muted">{job.company}</td>
                    <td className="px-4 py-3 text-muted">{job.type}</td>
                    <td className="px-4 py-3 text-muted">
                      {formatDate(job.deadline)}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            setShowForm(false);
                            setEditing(job);
                          }}
                          className="rounded-md border border-border p-2 text-muted hover:bg-surface-soft hover:text-foreground"
                          aria-label="Edit job"
                        >
                          <Pencil size={14} />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(job.id, job.title)}
                          className="rounded-md border border-border p-2 text-muted hover:border-danger/40 hover:bg-red-50 hover:text-danger"
                          aria-label="Delete job"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {jobs.length === 0 && (
              <p className="p-8 text-center text-muted">
                No jobs yet. Add your first listing.
              </p>
            )}
          </div>
        ) : (
          <div className="mt-4 space-y-3">
            {applications.length === 0 ? (
              <p className="rounded-xl border border-dashed border-border bg-surface p-8 text-center text-muted">
                No applications submitted yet.
              </p>
            ) : (
              applications.map((app) => {
                const job = jobs.find((j) => j.id === app.jobId);
                const seeker = users.find((u) => u.id === app.userId);
                return (
                  <article
                    key={app.id}
                    className="rounded-xl border border-border bg-surface p-5"
                  >
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="font-display font-semibold">
                            {job?.title || "Removed job"}
                          </h3>
                          <StatusBadge status={app.status} />
                        </div>
                        <p className="mt-1 text-sm text-muted">
                          {seeker?.name || "Unknown"} ({seeker?.email || "—"}) ·{" "}
                          {formatDate(app.appliedAt)}
                        </p>
                      </div>
                      <select
                        value={app.status}
                        onChange={(e) => {
                          const status = e.target.value as ApplicationStatus;
                          const result = updateApplicationStatus(app.id, status);
                          if (!result.ok) {
                            toast.error(
                              result.error || "Could not update status."
                            );
                            return;
                          }
                          toast.success(
                            `Application marked as ${status}.`
                          );
                        }}
                        className="rounded-md border border-border bg-background px-3 py-1.5 text-sm outline-none ring-primary/30 focus:ring-2"
                      >
                        <option value="pending">Pending</option>
                        <option value="reviewed">Reviewed</option>
                        <option value="accepted">Accepted</option>
                        <option value="rejected">Rejected</option>
                      </select>
                    </div>
                    <p className="mt-3 line-clamp-3 text-sm text-muted">
                      {app.coverLetter}
                    </p>
                  </article>
                );
              })
            )}
          </div>
        )}
      </div>
    </div>
  );
}
