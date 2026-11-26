/**
 * Environment configuration and validation for API requests.
 */

const DEFAULT_BACKEND_URL = "http://localhost:5000";

/**
 * Returns the backend API URL for server-side requests (SSR, Next.js server components, rewrites).
 * Prioritizes INTERNAL_BACKEND_URL, then NEXT_PUBLIC_API_URL, falling back to localhost:5000.
 */
export function getBackendUrl(): string {
  const url =
    process.env.INTERNAL_BACKEND_URL ||
    process.env.NEXT_PUBLIC_API_URL ||
    DEFAULT_BACKEND_URL;
  return url.trim().replace(/\/+$/, "");
}

/**
 * Returns the normalized API base URL.
 * In the browser, returns an empty string so all requests are same-origin relative (/api/...).
 * On the server, returns the backend URL so server-side operations can connect directly to the backend.
 */
export function getApiBaseUrl(): string {
  if (typeof window !== "undefined") {
    return "";
  }
  return getBackendUrl();
}

export const API_BASE_URL = getApiBaseUrl();
