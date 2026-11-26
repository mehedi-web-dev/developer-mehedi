"use client";

import { createAuthClient } from "better-auth/react";

/**
 * Official Better Auth React client integration.
 * Communicates through the same-origin Next.js reverse proxy (/api/auth/*),
 * ensuring session cookies are stored and sent reliably as first-party cookies.
 */
export const authClient = createAuthClient({
  baseURL:
    typeof window !== "undefined"
      ? window.location.origin
      : process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  fetchOptions: {
    credentials: "include",
  },
});

/**
 * Export core authentication utilities and hooks for client-side usage.
 */
export const {
  signIn,
  signOut,
  signUp,
  useSession,
  getSession,
} = authClient;
