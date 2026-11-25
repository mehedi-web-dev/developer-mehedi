import { api } from "@/lib/api";
import type { ReviewItem } from "@/types";

/**
 * Fetch approved client reviews from the backend.
 */
export async function getApprovedReviews(limit = 10): Promise<ReviewItem[]> {
  try {
    const res = await api.get<ReviewItem[]>("/api/reviews", {
      params: { limit },
    });
    return Array.isArray(res.data) ? res.data : [];
  } catch (error) {
    console.error("[Reviews Service] Failed to fetch reviews:", error);
    throw error;
  }
}
