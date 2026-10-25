"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { JobCard } from "@/components/job-card";
import { useAppStore } from "@/store/app-store";

export default function JobsPage() {
  const jobs = useAppStore((s) => s.jobs);
  const hydrated = useAppStore((s) => s.hydrated);
  const [query, setQuery] = useState("");
  const [type, setType] = useState("all");
  const [category, setCategory] = useState("all");

  const categories = useMemo(
    () => Array.from(new Set(jobs.map((j) => j.category))).sort(),
    [jobs]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return jobs.filter((job) => {
      const matchesQuery =
        !q ||
        job.title.toLowerCase().includes(q) ||
        job.company.toLowerCase().includes(q) ||
        job.location.toLowerCase().includes(q);
      const matchesType = type === "all" || job.type === type;
      const matchesCategory = category === "all" || job.category === category;
      return matchesQuery && matchesType && matchesCategory;
    });
  }, [jobs, query, type, category]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <div className="animate-fade-up">
        <h1 className="font-display text-3xl font-bold text-foreground sm:text-4xl">
          Job listings
        </h1>
        <p className="mt-2 text-muted">
          {hydrated
            ? `${jobs.length} openings available on EthioHire`
            : "Loading openings…"}
        </p>
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row animate-fade-up stagger-1">
        <label className="relative flex-1">
          <Search
            size={16}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted"
          />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search title, company, or location"
            className="w-full rounded-md border border-border bg-surface py-2.5 pl-9 pr-3 text-sm outline-none ring-primary/30 focus:ring-2"
          />
        </label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="rounded-md border border-border bg-surface px-3 py-2.5 text-sm outline-none ring-primary/30 focus:ring-2"
        >
          <option value="all">All types</option>
          <option value="Full-time">Full-time</option>
          <option value="Part-time">Part-time</option>
          <option value="Internship">Internship</option>
          <option value="Contract">Contract</option>
        </select>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="rounded-md border border-border bg-surface px-3 py-2.5 text-sm outline-none ring-primary/30 focus:ring-2"
        >
          <option value="all">All categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-4 border-t border-border">
        {!hydrated ? (
          <p className="py-12 text-center text-muted">Loading jobs…</p>
        ) : filtered.length === 0 ? (
          <p className="py-12 text-center text-muted">
            No jobs match your filters. Try adjusting your search.
          </p>
        ) : (
          filtered.map((job, i) => <JobCard key={job.id} job={job} index={i} />)
        )}
      </div>
    </div>
  );
}
