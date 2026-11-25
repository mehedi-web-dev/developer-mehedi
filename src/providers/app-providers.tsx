"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { RouterProvider } from "@heroui/react";
import { ThemeProvider } from "./theme-provider";

export interface AppProvidersProps {
  children: React.ReactNode;
}

/**
 * Root Application Provider.
 * Combines NextThemes provider, HeroUI client-side navigation router integration,
 * and future global application contexts.
 */
export function AppProviders({ children }: AppProvidersProps) {
  const router = useRouter();

  return (
    <ThemeProvider>
      <RouterProvider navigate={router.push}>{children}</RouterProvider>
    </ThemeProvider>
  );
}
