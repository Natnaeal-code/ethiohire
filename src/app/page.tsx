import Link from "next/link";
import { ArrowRight, Search, FileCheck, Shield } from "lucide-react";

export default function HomePage() {
  return (
    <div>
      <section className="hero-mesh relative overflow-hidden text-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:py-28">
          <div className="animate-fade-up">
            <p className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
              EthioHire
            </p>
            <h1 className="mt-4 max-w-xl text-2xl font-medium leading-snug text-white/95 sm:text-3xl">
              Find your next role across Ethiopia — from campus to first career.
            </h1>
            <p className="mt-4 max-w-lg text-base text-white/75 sm:text-lg">
              Browse openings, apply in minutes, and keep every application in
              one place.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/jobs"
                className="inline-flex items-center gap-2 rounded-md bg-accent px-5 py-3 text-sm font-bold text-primary-dark transition hover:brightness-105"
              >
                Browse jobs
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/sign-up"
                className="inline-flex items-center gap-2 rounded-md border border-white/30 bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20"
              >
                Create account
              </Link>
            </div>
          </div>

          <div className="relative hidden min-h-70 lg:block animate-fade-up stagger-2">
            <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-white/15 to-white/5 ring-1 ring-white/20" />
            <div className="absolute inset-6 flex flex-col justify-end gap-3">
              <div className="rounded-lg bg-white/95 p-4 text-foreground shadow-lg animate-slide-in">
                <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                  Featured
                </p>
                <p className="mt-1 font-display text-lg font-semibold">
                  Junior Software Engineer
                </p>
                <p className="text-sm text-muted">Addis Ababa · Full-time</p>
              </div>
              <div className="rounded-lg bg-white/90 p-4 text-foreground shadow-md animate-slide-in stagger-2">
                <p className="font-display font-semibold">Marketing Intern</p>
                <p className="text-sm text-muted">Hybrid · Paid internship</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <h2 className="font-display text-2xl font-bold text-foreground sm:text-3xl animate-fade-up">
          Built for seekers and admins
        </h2>
        <p className="mt-2 max-w-2xl text-muted animate-fade-up stagger-1">
          Whether you are graduating soon or managing listings, EthioHire keeps
          the path from discovery to application clear.
        </p>

        <div className="mt-10 grid gap-8 sm:grid-cols-3">
          {[
            {
              icon: Search,
              title: "Discover roles",
              body: "Filter by location, type, and category to find openings that match where you are in your career.",
            },
            {
              icon: FileCheck,
              title: "Apply & track",
              body: "Submit applications with a cover letter and review status from your personal dashboard.",
            },
            {
              icon: Shield,
              title: "Admin control",
              body: "Authorized admins create, update, and remove job listings so seekers always see fresh info.",
            },
          ].map((item, i) => (
            <div
              key={item.title}
              className={`animate-fade-up stagger-${i + 1}`}
            >
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <item.icon size={20} />
              </div>
              <h3 className="font-display text-lg font-semibold">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-border/70 bg-surface/70">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-4 py-12 sm:flex-row sm:items-center sm:px-6">
          <div>
            <h2 className="font-display text-xl font-bold sm:text-2xl">
              Ready to explore openings?
            </h2>
          </div>
          <Link
            href="/jobs"
            className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-semibold text-white hover:bg-primary-dark"
          >
            View all jobs
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
