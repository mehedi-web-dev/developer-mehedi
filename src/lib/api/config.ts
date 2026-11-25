/**
 * Environment configuration and validation for API requests.
 */

const DEFAULT_API_URL = "http://localhost:5000";

/**
 * Returns the normalized backend API base URL.
 * Falls back to http://localhost:5000 if not specified in environment.
 */
export function getApiBaseUrl(): string {
  const url = process.env.NEXT_PUBLIC_API_URL || DEFAULT_API_URL;
  return url.trim().replace(/\/+$/, "");
}

export const API_BASE_URL = getApiBaseUrl();
