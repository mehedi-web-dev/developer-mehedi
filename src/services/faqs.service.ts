import { api } from "@/lib/api";
import type { FAQItem } from "@/types";

/**
 * Fetch active FAQs from the backend.
 */
export async function getActiveFAQs(): Promise<FAQItem[]> {
  try {
    const res = await api.get<FAQItem[]>("/api/faqs");
    return Array.isArray(res.data) ? res.data : [];
  } catch (error) {
    console.error("[FAQs Service] Failed to fetch faqs:", error);
    throw error;
  }
}
