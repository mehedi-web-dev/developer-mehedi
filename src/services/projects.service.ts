import { api } from "@/lib/api";
import { ApiError } from "@/lib/api/errors";
import type { ProjectItem, PaginationMeta } from "@/types";

export interface GetProjectsParams {
  [key: string]: string | number | boolean | null | undefined;
  page?: number;
  limit?: number;
  category?: string;
}

export interface GetProjectsResponse {
  projects: ProjectItem[];
  pagination?: PaginationMeta;
}

/**
 * Fetch paginated list of published projects with optional category filter.
 */
export async function getProjects(
  params?: GetProjectsParams
): Promise<GetProjectsResponse> {
  try {
    const res = await api.get<ProjectItem[]>("/api/projects", { params });
    return {
      projects: Array.isArray(res.data) ? res.data : [],
      pagination: res.pagination,
    };
  } catch (error) {
    console.error("[Projects Service] Failed to fetch projects:", error);
    throw error;
  }
}

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

/**
 * Fetch a single published project by its slug.
 * Returns null if the project does not exist (404), or throws for other network/server errors.
 */
export async function getProjectBySlug(slug: string): Promise<ProjectItem | null> {
  try {
    const res = await api.get<ProjectItem>(`/api/projects/${encodeURIComponent(slug)}`);
    return res.data || null;
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      return null;
    }
    console.error(`[Projects Service] Failed to fetch project slug '${slug}':`, error);
    throw error;
  }
}
