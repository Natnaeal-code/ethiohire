"use client";

import { useState } from "react";
import type { Job } from "@/types";

export type JobFormValues = {
  title: string;
  company: string;
  location: string;
  type: Job["type"];
  category: string;
  salary: string;
  description: string;
  requirementsText: string;
  responsibilitiesText: string;
  deadline: string;
};

const emptyValues: JobFormValues = {
  title: "",
  company: "",
  location: "",
  type: "Full-time",
  category: "",
  salary: "",
  description: "",
  requirementsText: "",
  responsibilitiesText: "",
  deadline: "",
};

function jobToValues(job: Job): JobFormValues {
  return {
    title: job.title,
    company: job.company,
    location: job.location,
    type: job.type,
    category: job.category,
    salary: job.salary,
    description: job.description,
    requirementsText: job.requirements.join("\n"),
    responsibilitiesText: job.responsibilities.join("\n"),
    deadline: job.deadline,
  };
}

export function JobForm({
  initialJob,
  submitLabel,
  onSubmit,
  onCancel,
}: {
  initialJob?: Job;
  submitLabel: string;
  onSubmit: (values: {
    title: string;
    company: string;
    location: string;
    type: Job["type"];
    category: string;
    salary: string;
    description: string;
    requirements: string[];
    responsibilities: string[];
    deadline: string;
  }) => { ok: boolean; error?: string };
  onCancel?: () => void;
}) {
  const [values, setValues] = useState<JobFormValues>(
    initialJob ? jobToValues(initialJob) : emptyValues
  );
  const [error, setError] = useState("");

  function update<K extends keyof JobFormValues>(key: K, value: JobFormValues[K]) {
    setValues((v) => ({ ...v, [key]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    const result = onSubmit({
      title: values.title,
      company: values.company,
      location: values.location,
      type: values.type,
      category: values.category,
      salary: values.salary,
      description: values.description,
      requirements: values.requirementsText
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean),
      responsibilities: values.responsibilitiesText
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean),
      deadline: values.deadline,
    });
    if (!result.ok) {
      setError(result.error || "Could not save job.");
      return;
    }
    if (!initialJob) setValues(emptyValues);
  }

  const fieldClass =
    "mt-1.5 w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none ring-primary/30 focus:ring-2";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm font-medium">
          Job title
          <input
            required
            value={values.title}
            onChange={(e) => update("title", e.target.value)}
            className={fieldClass}
          />
        </label>
        <label className="block text-sm font-medium">
          Company
          <input
            required
            value={values.company}
            onChange={(e) => update("company", e.target.value)}
            className={fieldClass}
          />
        </label>
        <label className="block text-sm font-medium">
          Location
          <input
            required
            value={values.location}
            onChange={(e) => update("location", e.target.value)}
            className={fieldClass}
          />
        </label>
        <label className="block text-sm font-medium">
          Category
          <input
            required
            value={values.category}
            onChange={(e) => update("category", e.target.value)}
            className={fieldClass}
            placeholder="e.g. Technology"
          />
        </label>
        <label className="block text-sm font-medium">
          Employment type
          <select
            value={values.type}
            onChange={(e) => update("type", e.target.value as Job["type"])}
            className={fieldClass}
          >
            <option>Full-time</option>
            <option>Part-time</option>
            <option>Internship</option>
            <option>Contract</option>
          </select>
        </label>
        <label className="block text-sm font-medium">
          Salary
          <input
            required
            value={values.salary}
            onChange={(e) => update("salary", e.target.value)}
            className={fieldClass}
            placeholder="e.g. ETB 15,000 – 20,000 / month"
          />
        </label>
        <label className="block text-sm font-medium sm:col-span-2">
          Deadline
          <input
            required
            type="date"
            value={values.deadline}
            onChange={(e) => update("deadline", e.target.value)}
            className={fieldClass}
          />
        </label>
      </div>

      <label className="block text-sm font-medium">
        Description
        <textarea
          required
          rows={4}
          value={values.description}
          onChange={(e) => update("description", e.target.value)}
          className={fieldClass}
        />
      </label>

      <label className="block text-sm font-medium">
        Requirements (one per line)
        <textarea
          rows={4}
          value={values.requirementsText}
          onChange={(e) => update("requirementsText", e.target.value)}
          className={fieldClass}
        />
      </label>

      <label className="block text-sm font-medium">
        Responsibilities (one per line)
        <textarea
          rows={4}
          value={values.responsibilitiesText}
          onChange={(e) => update("responsibilitiesText", e.target.value)}
          className={fieldClass}
        />
      </label>

      {error && <p className="text-sm text-danger">{error}</p>}

      <div className="flex gap-3">
        <button
          type="submit"
          className="rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-white hover:bg-primary-dark"
        >
          {submitLabel}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="rounded-md border border-border px-4 py-2.5 text-sm font-semibold text-foreground hover:bg-surface-soft"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
