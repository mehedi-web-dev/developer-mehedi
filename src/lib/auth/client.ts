"use client";

import { createAuthClient } from "better-auth/react";
import { getApiBaseUrl } from "@/lib/api/config";

/**
 * Official Better Auth React client integration.
 * Communicates with developer-mehedi-server Better Auth instance.
 * Automatically configured with cross-origin credentials support.
 */
export const authClient = createAuthClient({
  baseURL: getApiBaseUrl(),
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
