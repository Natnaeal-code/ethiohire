"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAppStore } from "@/store/app-store";
import type { UserRole } from "@/types";

export default function SignUpPage() {
  const router = useRouter();
  const signUp = useAppStore((s) => s.signUp);
  const currentUser = useAppStore((s) => s.currentUser);
  const hydrated = useAppStore((s) => s.hydrated);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<UserRole>("seeker");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!hydrated || !currentUser) return;
    router.replace(currentUser.role === "admin" ? "/admin" : "/dashboard");
  }, [hydrated, currentUser, router]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    const result = signUp({ name, email, password, role });
    if (!result.ok) {
      const message = result.error || "Sign up failed.";
      setError(message);
      toast.error(message);
      return;
    }
    toast.success(
      role === "admin"
        ? "Admin account created. Welcome to EthioHire!"
        : "Account created. Start exploring jobs!"
    );
    router.push(role === "admin" ? "/admin" : "/dashboard");
  }

  const fieldClass =
    "mt-1.5 w-full rounded-md border border-border bg-surface px-3 py-2.5 text-sm outline-none ring-primary/30 focus:ring-2";

  return (
    <div className="mx-auto flex max-w-md flex-col px-4 py-14 sm:px-6">
      <div className="animate-fade-up">
        <h1 className="font-display text-3xl font-bold text-foreground">
          Create account
        </h1>
        <p className="mt-2 text-sm text-muted">
          Register as a job seeker or administrator. Accounts are stored locally
          in this browser.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mt-8 space-y-4 rounded-xl border border-border bg-surface p-6 shadow-sm animate-fade-up stagger-1"
      >
        <label className="block text-sm font-medium">
          Full name
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={fieldClass}
            autoComplete="name"
          />
        </label>
        <label className="block text-sm font-medium">
          Email
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={fieldClass}
            autoComplete="email"
          />
        </label>
        <label className="block text-sm font-medium">
          Password
          <input
            type="password"
            required
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={fieldClass}
            autoComplete="new-password"
          />
        </label>
        <fieldset>
          <legend className="text-sm font-medium">I am signing up as</legend>
          <div className="mt-2 grid grid-cols-2 gap-2">
            {(
              [
                { value: "seeker", label: "Job seeker" },
                { value: "admin", label: "Administrator" },
              ] as const
            ).map((option) => (
              <label
                key={option.value}
                className={`cursor-pointer rounded-md border px-3 py-2.5 text-center text-sm font-medium transition ${
                  role === option.value
                    ? "border-primary bg-primary/5 text-primary"
                    : "border-border bg-background text-muted hover:bg-surface-soft"
                }`}
              >
                <input
                  type="radio"
                  name="role"
                  value={option.value}
                  checked={role === option.value}
                  onChange={() => setRole(option.value)}
                  className="sr-only"
                />
                {option.label}
              </label>
            ))}
          </div>
        </fieldset>
        {error && <p className="text-sm text-danger">{error}</p>}
        <button
          type="submit"
          className="w-full rounded-md bg-primary py-2.5 text-sm font-semibold text-white hover:bg-primary-dark"
        >
          Create account
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-muted">
        Already registered?{" "}
        <Link href="/sign-in" className="font-semibold text-primary hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}
