"use client";

import { useEffect } from "react";
import { Toaster } from "sonner";
import { useAppStore } from "@/store/app-store";

export function Providers({ children }: { children: React.ReactNode }) {
  const setHydrated = useAppStore((s) => s.setHydrated);

  useEffect(() => {
    const finish = () => setHydrated(true);

    if (useAppStore.persist.hasHydrated()) {
      finish();
    }

    return useAppStore.persist.onFinishHydration(finish);
  }, [setHydrated]);

  return (
    <>
      {children}
      <Toaster
        position="top-right"
        richColors
        closeButton
        toastOptions={{
          className: "font-sans",
          duration: 3500,
        }}
      />
    </>
  );
}