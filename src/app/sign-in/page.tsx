"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAppStore } from "@/store/app-store";

export default function SignInPage() {
  const router = useRouter();
  const signIn = useAppStore((s) => s.signIn);
  const currentUser = useAppStore((s) => s.currentUser);
  const hydrated = useAppStore((s) => s.hydrated);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!hydrated || !currentUser) return;
    router.replace(currentUser.role === "admin" ? "/admin" : "/dashboard");
  }, [hydrated, currentUser, router]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    const result = signIn(email, password);
    if (!result.ok) {
      const message = result.error || "Sign in failed.";
      setError(message);
      toast.error(message);
      return;
    }
    const user = useAppStore.getState().currentUser;
    toast.success(`Welcome back, ${user?.name.split(" ")[0] || "there"}!`);
    router.push(user?.role === "admin" ? "/admin" : "/dashboard");
  }

  function fillDemo(role: "admin" | "seeker") {
    if (role === "admin") {
      setEmail("admin@ethiohire.com");
      setPassword("admin123");
    } else {
      setEmail("seeker@ethiohire.com");
      setPassword("seeker123");
    }
    setError("");
  }

  const fieldClass =
    "mt-1.5 w-full rounded-md border border-border bg-surface px-3 py-2.5 text-sm outline-none ring-primary/30 focus:ring-2";

  return (
    <div className="mx-auto flex max-w-md flex-col px-4 py-14 sm:px-6">
      <div className="animate-fade-up">
        <h1 className="font-display text-3xl font-bold text-foreground">
          Sign in
        </h1>
        <p className="mt-2 text-sm text-muted">
          Welcome back to EthioHire. Use a demo account or your own.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mt-8 space-y-4 rounded-xl border border-border bg-surface p-6 shadow-sm animate-fade-up stagger-1"
      >
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={fieldClass}
            autoComplete="current-password"
          />
        </label>
        {error && <p className="text-sm text-danger">{error}</p>}
        <button
          type="submit"
          className="w-full rounded-md bg-primary py-2.5 text-sm font-semibold text-white hover:bg-primary-dark"
        >
          Sign in
        </button>
      </form>

      <div className="mt-6 rounded-xl border border-dashed border-border bg-surface-soft/60 p-4 animate-fade-up stagger-2">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted">
          Accounts for testing purposes
        </p>
        <div className="mt-3 flex flex-col gap-2 sm:flex-row">
          <button
            type="button"
            onClick={() => fillDemo("seeker")}
            className="flex-1 rounded-md border border-border bg-surface px-3 py-2 text-left text-sm hover:bg-white"
          >
            <span className="font-medium text-foreground">Job seeker</span>
            <span className="mt-0.5 block text-xs text-muted">
              seeker@ethiohire.com
            </span>
          </button>
          <button
            type="button"
            onClick={() => fillDemo("admin")}
            className="flex-1 rounded-md border border-border bg-surface px-3 py-2 text-left text-sm hover:bg-white"
          >
            <span className="font-medium text-foreground">Administrator</span>
            <span className="mt-0.5 block text-xs text-muted">
              admin@ethiohire.com
            </span>
          </button>
        </div>
      </div>

      <p className="mt-6 text-center text-sm text-muted">
        New here?{" "}
        <Link
          href="/sign-up"
          className="font-semibold text-primary hover:underline"
        >
          Create an account
        </Link>
      </p>
    </div>
  );
}
