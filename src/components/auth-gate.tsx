"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/store/app-store";
import type { UserRole } from "@/types";

export function AuthGate({
  children,
  role,
}: {
  children: React.ReactNode;
  role?: UserRole;
}) {
  const router = useRouter();
  const currentUser = useAppStore((s) => s.currentUser);
  const hydrated = useAppStore((s) => s.hydrated);

  useEffect(() => {
    if (!hydrated) return;
    if (!currentUser) {
      router.replace("/sign-in");
      return;
    }
    if (role && currentUser.role !== role) {
      router.replace(currentUser.role === "admin" ? "/admin" : "/dashboard");
    }
  }, [hydrated, currentUser, role, router]);

  if (!hydrated) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-16 text-center text-muted sm:px-6">
        Loading…
      </div>
    );
  }

  if (!currentUser) return null;
  if (role && currentUser.role !== role) return null;

  return <>{children}</>;
}
