import { api } from "@/lib/api";
import type { ServiceItem } from "@/types";

/**
 * Fetch featured published services (maximum 3) from the backend.
 */
export async function getFeaturedServices(): Promise<ServiceItem[]> {
  try {
    const res = await api.get<ServiceItem[]>("/api/services/featured");
    return Array.isArray(res.data) ? res.data : [];
  } catch (error) {
    console.error("[Services Service] Failed to fetch featured services:", error);
    throw error;
  }
}
