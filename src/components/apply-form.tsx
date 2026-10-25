"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAppStore } from "@/store/app-store";
import { isDeadlinePassed } from "@/lib/utils";

export function ApplyForm({
  jobId,
  deadline,
}: {
  jobId: string;
  deadline: string;
}) {
  const router = useRouter();
  const currentUser = useAppStore((s) => s.currentUser);
  const hydrated = useAppStore((s) => s.hydrated);
  const applyToJob = useAppStore((s) => s.applyToJob);
  const hasApplied = useAppStore((s) => s.hasApplied);
  const [coverLetter, setCoverLetter] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  if (!hydrated) {
    return (
      <div className="rounded-lg border border-border bg-surface p-5 text-sm text-muted">
        Loading…
      </div>
    );
  }

  if (isDeadlinePassed(deadline)) {
    return (
      <div className="rounded-lg border border-border bg-surface-soft p-5 text-sm text-muted">
        This listing is closed. The application deadline has passed.
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="rounded-lg border border-border bg-surface p-5">
        <p className="text-sm text-muted">
          Sign in to submit an application for this role.
        </p>
        <div className="mt-4 flex gap-3">
          <Link
            href="/sign-in"
            className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary-dark"
          >
            Sign In
          </Link>
          <Link
            href="/sign-up"
            className="rounded-md border border-border px-4 py-2 text-sm font-semibold text-foreground hover:bg-surface-soft"
          >
            Sign Up
          </Link>
        </div>
      </div>
    );
  }

  if (currentUser.role === "admin") {
    return (
      <div className="rounded-lg border border-border bg-surface-soft p-5 text-sm text-muted">
        Administrators manage listings and cannot apply as job seekers.
      </div>
    );
  }

  if (hasApplied(currentUser.id, jobId) || success) {
    return (
      <div className="rounded-lg border border-success/30 bg-emerald-50 p-5">
        <p className="font-medium text-success">Application submitted</p>
        <p className="mt-1 text-sm text-muted">
          You can track it from your applications page.
        </p>
        <Link
          href="/dashboard/applications"
          className="mt-3 inline-block text-sm font-semibold text-primary hover:underline"
        >
          View my applications →
        </Link>
      </div>
    );
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    const result = applyToJob(jobId, coverLetter);
    if (!result.ok) {
      const message = result.error || "Something went wrong.";
      setError(message);
      toast.error(message);
      return;
    }
    setSuccess(true);
    toast.success("Application submitted successfully.");
    router.refresh();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-lg border border-border bg-surface p-5 shadow-sm"
    >
      <h3 className="font-display text-lg font-semibold text-foreground">
        Apply for this job
      </h3>
      <p className="mt-1 text-sm text-muted">
        Applying as {currentUser.name}. Include a short note for the employer.
      </p>
      <label className="mt-4 block text-sm font-medium text-foreground">
        Cover letter
        <textarea
          value={coverLetter}
          onChange={(e) => setCoverLetter(e.target.value)}
          rows={5}
          required
          placeholder="Why are you a good fit for this role?"
          className="mt-1.5 w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none ring-primary/30 focus:ring-2"
        />
      </label>
      {error && <p className="mt-2 text-sm text-danger">{error}</p>}
      <button
        type="submit"
        className="mt-4 w-full rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-dark"
      >
        Submit application
      </button>
    </form>
  );
}
