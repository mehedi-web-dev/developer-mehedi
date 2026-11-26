import { api } from "@/lib/api";
import type { SiteSettings } from "@/types";

/**
 * Fetch public site settings and profile data from the backend.
 * Configured with cache: "no-store" to ensure saved profile image and resume
 * changes immediately reflect without stale caching.
 */
export async function getSiteSettings(): Promise<SiteSettings | null> {
  try {
    const res = await api.get<SiteSettings>("/api/site-settings", {
      cache: "no-store",
    });
    return res.data || null;
  } catch (error) {
    console.error("[SiteSettings Service] Failed to fetch settings:", error);
    return null;
  }
}
