import { api } from "@/lib/api";
import type { ProjectItem } from "@/types";

/**
 * Fetch featured published projects (maximum 3) from the backend.
 */
export async function getFeaturedProjects(): Promise<ProjectItem[]> {
  try {
    const res = await api.get<ProjectItem[]>("/api/projects/featured");
    return Array.isArray(res.data) ? res.data : [];
  } catch (error) {
    console.error("[Projects Service] Failed to fetch featured projects:", error);
    throw error;
  }
}
