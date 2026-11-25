import { api } from "@/lib/api";
import type { ServiceItem, PaginationMeta } from "@/types";

export interface AdminServicesQuery {
  page?: number;
  limit?: number;
  published?: boolean;
}

export interface AdminServicesResponse {
  services: ServiceItem[];
  pagination: PaginationMeta;
}

export interface CreateServiceInput {
  title: string;
  slug?: string;
  shortDescription: string;
  description: string;
  icon?: string;
  features?: string[];
  technologies?: string[];
  featured?: boolean;
  published?: boolean;
  order?: number;
}

export type UpdateServiceInput = Partial<CreateServiceInput>;

export interface DashboardStats {
  services: {
    total: number;
    published: number;
  };
  projects: {
    total: number;
  };
  reviews: {
    total: number;
  };
  faqs: {
    total: number;
  };
  contacts: {
    total: number;
    unread: number;
  };
  lastUpdated: string;
}

/**
 * Fetch paginated list of all services for the admin table.
 */
export async function getAdminServices(
  query: AdminServicesQuery = {}
): Promise<AdminServicesResponse> {
  const { page = 1, limit = 50, published } = query;
  const params: Record<string, string | number | boolean | undefined> = {
    page,
    limit,
  };
  if (published !== undefined) {
    params.published = published;
  }

  const res = await api.get<ServiceItem[]>("/api/admin/services", { params });

  return {
    services: Array.isArray(res.data) ? res.data : [],
    pagination: res.pagination || {
      page,
      limit,
      totalItems: Array.isArray(res.data) ? res.data.length : 0,
      totalPages: 1,
      hasNextPage: false,
      hasPrevPage: false,
    },
  };
}

/**
 * Fetch a single service by ID.
 */
export async function getAdminServiceById(id: string): Promise<ServiceItem> {
  const res = await api.get<ServiceItem>(`/api/admin/services/${id}`);
  if (!res.data) {
    throw new Error("Service not found");
  }
  return res.data;
}

/**
 * Create a new service.
 */
export async function createAdminService(
  data: CreateServiceInput
): Promise<ServiceItem> {
  const res = await api.post<ServiceItem>("/api/admin/services", data);
  if (!res.data) {
    throw new Error(res.message || "Failed to create service");
  }
  return res.data;
}

/**
 * Update an existing service.
 */
export async function updateAdminService(
  id: string,
  data: UpdateServiceInput
): Promise<ServiceItem> {
  const res = await api.patch<ServiceItem>(`/api/admin/services/${id}`, data);
  if (!res.data) {
    throw new Error(res.message || "Failed to update service");
  }
  return res.data;
}

/**
 * Delete a service by ID.
 */
export async function deleteAdminService(id: string): Promise<{ id: string }> {
  const res = await api.delete<{ id: string }>(`/api/admin/services/${id}`);
  return res.data || { id };
}

/**
 * Quick toggle for published state.
 */
export async function toggleServicePublished(
  id: string,
  currentPublished: boolean
): Promise<ServiceItem> {
  return updateAdminService(id, { published: !currentPublished });
}

/**
 * Quick toggle for featured state.
 */
export async function toggleServiceFeatured(
  id: string,
  currentFeatured: boolean
): Promise<ServiceItem> {
  return updateAdminService(id, { featured: !currentFeatured });
}

/**
 * Fetch live portfolio statistics across all backend resources.
 */
export async function getAdminDashboardStats(): Promise<DashboardStats> {
  const results = await Promise.allSettled([
    api.get<ServiceItem[]>("/api/admin/services", { params: { limit: 1 } }),
    api.get<ServiceItem[]>("/api/admin/services", {
      params: { limit: 1, published: true },
    }),
    api.get<unknown[]>("/api/admin/projects", { params: { limit: 1 } }),
    api.get<unknown[]>("/api/admin/reviews", { params: { limit: 1 } }),
    api.get<unknown[]>("/api/admin/faqs", { params: { limit: 1 } }),
    api.get<unknown[]>("/api/admin/contacts", { params: { limit: 1 } }),
    api.get<unknown[]>("/api/admin/contacts", {
      params: { limit: 1, status: "new" },
    }),
  ]);

  const extractTotal = (res: PromiseSettledResult<{ pagination?: PaginationMeta }>) => {
    if (res.status === "fulfilled" && res.value.pagination?.totalItems !== undefined) {
      return res.value.pagination.totalItems;
    }
    return 0;
  };

  const totalServices = extractTotal(results[0]);
  const publishedServices = extractTotal(results[1]);
  const totalProjects = extractTotal(results[2]);
  const totalReviews = extractTotal(results[3]);
  const totalFaqs = extractTotal(results[4]);
  const totalContacts = extractTotal(results[5]);
  const unreadContacts = extractTotal(results[6]);

  return {
    services: {
      total: totalServices,
      published: publishedServices,
    },
    projects: {
      total: totalProjects,
    },
    reviews: {
      total: totalReviews,
    },
    faqs: {
      total: totalFaqs,
    },
    contacts: {
      total: totalContacts,
      unread: unreadContacts,
    },
    lastUpdated: new Date().toISOString(),
  };
}
