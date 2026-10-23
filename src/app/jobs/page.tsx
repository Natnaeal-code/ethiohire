
import Link from "next/link";
import { MapPin, Briefcase, ArrowRight } from "lucide-react";
import { DEMO_JOBS } from "@/lib/mock-data";

export default function JobsPage() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <div className="mb-10">
        <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-primary">
          Find your opportunity
        </p>

        <h1 className="font-display text-3xl font-bold text-foreground sm:text-4xl">
          Explore Jobs
        </h1>

        <p className="mt-3 text-muted">
          Discover opportunities and take the next step in your career.
        </p>

        <p className="mt-4 text-sm text-muted">
          {DEMO_JOBS.length} opportunities available
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {DEMO_JOBS.map((job) => (
          <article
            key={job.id}
            className="flex flex-col rounded-xl border border-border bg-surface p-6 transition hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="mb-4 flex items-center justify-between gap-3">
              <span className="rounded-full bg-surface-soft px-3 py-1 text-xs font-medium text-primary">
                {job.type}
              </span>

              <span className="text-xs text-muted">
                {job.category}
              </span>
            </div>

            <h2 className="text-lg font-bold text-foreground">
              {job.title}
            </h2>

            <p className="mt-1 text-sm font-medium text-muted">
              {job.company}
            </p>

            <div className="mt-4 flex items-center gap-2 text-sm text-muted">
              <MapPin size={16} />
              <span>{job.location}</span>
            </div>

            <div className="mt-2 flex items-center gap-2 text-sm text-muted">
              <Briefcase size={16} />
              <span>{job.salary}</span>
            </div>

            <div className="mt-auto pt-6">
              <Link
                href={`/jobs/${job.id}`}
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-dark"
              >
                View Details
                <ArrowRight size={16} />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
