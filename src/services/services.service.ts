import { api } from "@/lib/api";
import type { ServiceItem, PaginationMeta } from "@/types";

export interface GetServicesParams {
  [key: string]: string | number | boolean | null | undefined;
  page?: number;
  limit?: number;
}

export interface GetServicesResponse {
  services: ServiceItem[];
  pagination?: PaginationMeta;
}

/**
 * Fetch paginated list of published services from the backend.
 */
export async function getServices(
  params?: GetServicesParams
): Promise<GetServicesResponse> {
  try {
    const res = await api.get<ServiceItem[]>("/api/services", { params });
    return {
      services: Array.isArray(res.data) ? res.data : [],
      pagination: res.pagination,
    };
  } catch (error) {
    console.error("[Services Service] Failed to fetch services:", error);
    throw error;
  }
}

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
