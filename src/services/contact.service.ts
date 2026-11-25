import { api } from "@/lib/api";
import type { ContactFormPayload, ApiResponse } from "@/types";

/**
 * Submit public contact inquiry with validation and honeypot.
 */
export async function submitContact(
  payload: ContactFormPayload
): Promise<ApiResponse<{ message: string }>> {
  return api.post<{ message: string }>("/api/contact", payload);
}
