
import Link from "next/link";
import { notFound } from "next/navigation";
import { MapPin, Briefcase, CalendarDays, Banknote } from "lucide-react";
import { DEMO_JOBS } from "@/lib/mock-data";

export default async function JobDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const job = DEMO_JOBS.find((item) => item.id === id);

  if (!job) {
    notFound();
  }

  return (
    <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <Link
        href="/jobs"
        className="mb-8 inline-flex font-medium text-primary hover:text-primary-dark"
      >
        ← Back to Jobs
      </Link>

      <article className="mt-6 rounded-xl border border-border bg-surface p-6 sm:p-8">
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-surface-soft px-3 py-1 text-sm font-medium text-primary">
            {job.type}
          </span>

          <span className="text-sm text-muted">{job.category}</span>
        </div>

        <h1 className="font-display text-3xl font-extrabold text-foreground sm:text-4xl">
          {job.title}
        </h1>

        <p className="mt-3 text-lg font-medium text-muted">
          {job.company}
        </p>

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <div className="flex items-center gap-2 text-sm text-muted">
            <MapPin size={18} />
            <span>{job.location}</span>
          </div>

          <div className="flex items-center gap-2 text-sm text-muted">
            <Banknote size={18} />
            <span>{job.salary}</span>
          </div>

          <div className="flex items-center gap-2 text-sm text-muted">
            <CalendarDays size={18} />
            <span>Deadline: {job.deadline}</span>
          </div>

          <div className="flex items-center gap-2 text-sm text-muted">
            <Briefcase size={18} />
            <span>{job.type}</span>
          </div>
        </div>

        <div className="mt-8 border-t border-border pt-6">
          <h2 className="text-xl font-bold text-foreground">
            About this job
          </h2>

          <p className="mt-3 leading-7 text-muted">
            {job.description}
          </p>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-bold text-foreground">
            Responsibilities
          </h2>

          <ul className="mt-3 list-disc space-y-2 pl-5 leading-7 text-muted">
            {job.responsibilities.map((responsibility) => (
              <li key={responsibility}>{responsibility}</li>
            ))}
          </ul>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-bold text-foreground">
            Requirements
          </h2>

          <ul className="mt-3 list-disc space-y-2 pl-5 leading-7 text-muted">
            {job.requirements.map((requirement) => (
              <li key={requirement}>{requirement}</li>
            ))}
          </ul>
        </div>
      </article>
    </section>
  );
}
