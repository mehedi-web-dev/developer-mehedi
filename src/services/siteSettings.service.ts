import { api } from "@/lib/api";
import type { SiteSettings } from "@/types";

/**
 * Fetch public site settings and profile data from the backend.
 */
export async function getSiteSettings(): Promise<SiteSettings | null> {
  try {
    const res = await api.get<SiteSettings>("/api/site-settings");
    return res.data || null;
  } catch (error) {
    console.error("[SiteSettings Service] Failed to fetch settings:", error);
    return null;
  }
}
