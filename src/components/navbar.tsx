
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Briefcase, Menu, X } from "lucide-react";
import { useState } from "react";

const publicLinks = [
  { href: "/", label: "Home" },
  { href: "/jobs", label: "Jobs" },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-surface/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="group flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-white transition group-hover:bg-primary-dark">
            <Briefcase size={18} />
          </span>

          <span className="font-display text-lg font-bold tracking-tight text-foreground">
            Ethio<span className="text-primary">Hire</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {publicLinks.map((link) => {
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

          <Link
            href="/sign-up"
            className="ml-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary-dark"
          >
            Create account
          </Link>
        </nav>

        <button
          type="button"
          className="rounded-md p-2 text-foreground md:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <nav className="animate-fade-in border-t border-border bg-surface px-4 py-3 md:hidden">
          {publicLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block rounded-md px-3 py-2.5 text-sm font-medium text-foreground hover:bg-surface-soft"
            >
              {link.label}
            </Link>
          ))}

          <Link
            href="/sign-up"
            onClick={() => setOpen(false)}
            className="mt-2 block rounded-md bg-primary px-3 py-2.5 text-center text-sm font-semibold text-white hover:bg-primary-dark"
          >
            Create account
          </Link>
        </nav>
      )}
    </header>
  );
}
