"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Briefcase, Menu, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useAppStore } from "@/store/app-store";

const publicLinks = [
  { href: "/", label: "Home" },
  { href: "/jobs", label: "Jobs" },
];

export function Navbar() {
  const pathname = usePathname();
  const currentUser = useAppStore((s) => s.currentUser);
  const signOut = useAppStore((s) => s.signOut);
  const hydrated = useAppStore((s) => s.hydrated);
  const [open, setOpen] = useState(false);

  function handleSignOut() {
    signOut();
    setOpen(false);
    toast.success("Signed out successfully.");
  }

  const authLinks = currentUser
    ? [
        ...(currentUser.role === "admin"
          ? [{ href: "/admin", label: "Admin" }]
          : [
              { href: "/dashboard", label: "Dashboard" },
              { href: "/dashboard/applications", label: "Applications" },
            ]),
      ]
    : [
        { href: "/sign-in", label: "Sign In" },
        { href: "/sign-up", label: "Sign Up" },
      ];

  const links = [...publicLinks, ...authLinks];

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-surface/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5 group">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-white transition group-hover:bg-primary-dark">
            <Briefcase className="h-4.5 w-4.5" size={18} />
          </span>
          <span className="font-display text-lg font-bold tracking-tight text-foreground">
            Ethio<span className="text-primary">Hire</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-md px-3 py-2 text-sm font-medium transition ${
                  active
                    ? "bg-surface-soft text-primary"
                    : "text-muted hover:bg-surface-soft hover:text-foreground"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          {hydrated && currentUser && (
            <div className="ml-2 flex items-center gap-3 border-l border-border pl-4">
              <span className="text-sm text-muted">
                {currentUser.name.split(" ")[0]}
              </span>
              <button
                type="button"
                onClick={handleSignOut}
                className="rounded-md px-3 py-2 text-sm font-medium text-muted transition hover:bg-surface-soft hover:text-foreground"
              >
                Sign Out
              </button>
            </div>
          )}
        </nav>

        <button
          type="button"
          className="rounded-md p-2 text-foreground md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <nav className="border-t border-border bg-surface px-4 py-3 md:hidden animate-fade-in">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block rounded-md px-3 py-2.5 text-sm font-medium text-foreground hover:bg-surface-soft"
            >
              {link.label}
            </Link>
          ))}
          {hydrated && currentUser && (
            <button
              type="button"
              onClick={handleSignOut}
              className="mt-1 block w-full rounded-md px-3 py-2.5 text-left text-sm font-medium text-muted hover:bg-surface-soft"
            >
              Sign Out ({currentUser.name})
            </button>
          )}
        </nav>
      )}
    </header>
  );
}
