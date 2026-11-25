"use client";

import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

/**
 * Idiomatic React 19 hook to detect client-side mounting without cascading re-renders.
 * Uses useSyncExternalStore to return false on the server and true on the client,
 * completely avoiding hydration mismatch.
 */
export function useMounted(): boolean {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}
