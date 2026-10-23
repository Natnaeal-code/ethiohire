
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <Link
          href="/"
          className="font-display text-lg font-bold text-primary"
        >
          EthioHire
        </Link>

        <p className="text-sm text-muted">
          Connecting Ethiopian talent with opportunity.
        </p>

        <Link
          href="/jobs"
          className="text-sm font-medium text-primary hover:text-primary-dark"
        >
          Explore jobs →
        </Link>
      </div>

      <div className="border-t border-border/70 px-4 py-4 text-center text-xs text-muted">
        © {new Date().getFullYear()} EthioHire. All rights reserved.
      </div>
    </footer>
  );
}
