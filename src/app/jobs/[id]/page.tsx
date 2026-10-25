"use client";

import { Suspense, use } from "react";
import Link from "next/link";
import { ArrowLeft, Building2, MapPin, Clock, Banknote } from "lucide-react";
import { ApplyForm } from "@/components/apply-form";
import { useAppStore } from "@/store/app-store";
import { formatDate, isDeadlinePassed } from "@/lib/utils";

export default function JobDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-6xl px-4 py-16 text-center text-muted sm:px-6">
          Loading job…
        </div>
      }
    >
      <JobDetailsContent params={params} />
    </Suspense>
  );
}

function JobDetailsContent({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const job = useAppStore((s) => s.getJobById(id));
  const hydrated = useAppStore((s) => s.hydrated);

  if (!hydrated) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-16 text-center text-muted sm:px-6">
        Loading job…
      </div>
    );
  }

  if (!job) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-16 text-center sm:px-6">
        <h1 className="font-display text-2xl font-bold">Job not found</h1>
        <p className="mt-2 text-muted">
          This listing may have been removed by an administrator.
        </p>
        <Link
          href="/jobs"
          className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
        >
          <ArrowLeft size={16} />
          Back to jobs
        </Link>
      </div>
    );
  }

  const closed = isDeadlinePassed(job.deadline);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <Link
        href="/jobs"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-muted transition hover:text-primary animate-fade-in"
      >
        <ArrowLeft size={16} />
        All jobs
      </Link>

      <div className="mt-6 grid gap-10 lg:grid-cols-[1fr_340px]">
        <article className="animate-fade-up">
          <div className="flex flex-wrap items-center gap-2 text-sm">
            <span className="font-medium uppercase tracking-wider text-primary">
              {job.category}
            </span>
            <span className="text-border">·</span>
            <span className="text-muted">{job.type}</span>
            {closed && (
              <>
                <span className="text-border">·</span>
                <span className="font-medium text-danger">Applications closed</span>
              </>
            )}
          </div>

          <h1 className="mt-3 font-display text-3xl font-bold text-foreground sm:text-4xl">
            {job.title}
          </h1>

          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted">
            <span className="inline-flex items-center gap-1.5">
              <Building2 size={15} />
              {job.company}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <MapPin size={15} />
              {job.location}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Banknote size={15} />
              {job.salary}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock size={15} />
              Deadline {formatDate(job.deadline)}
            </span>
          </div>

          <section className="mt-10">
            <h2 className="font-display text-xl font-semibold">About the role</h2>
            <p className="mt-3 leading-relaxed text-muted">{job.description}</p>
          </section>

          {job.responsibilities.length > 0 && (
            <section className="mt-8">
              <h2 className="font-display text-xl font-semibold">
                Responsibilities
              </h2>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-muted">
                {job.responsibilities.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          )}

          {job.requirements.length > 0 && (
            <section className="mt-8">
              <h2 className="font-display text-xl font-semibold">Requirements</h2>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-muted">
                {job.requirements.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          )}
        </article>

        <aside className="lg:sticky lg:top-24 lg:self-start animate-fade-up stagger-2">
          <ApplyForm jobId={job.id} deadline={job.deadline} />
        </aside>
      </div>
    </div>
  );
}
