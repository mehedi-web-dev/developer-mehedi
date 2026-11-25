import { api } from "@/lib/api";
import type {
  ServiceItem,
  ProjectItem,
  ReviewItem,
  FAQItem,
  ContactItem,
  SiteSettings,
  PaginationMeta,
} from "@/types";

/* =========================================================================
   SERVICES INTERFACES & METHODS (PHASE 07B)
   ========================================================================= */

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
 * Quick toggle for service published state.
 */
export async function toggleServicePublished(
  id: string,
  currentPublished: boolean
): Promise<ServiceItem> {
  return updateAdminService(id, { published: !currentPublished });
}

/**
 * Quick toggle for service featured state.
 */
export async function toggleServiceFeatured(
  id: string,
  currentFeatured: boolean
): Promise<ServiceItem> {
  return updateAdminService(id, { featured: !currentFeatured });
}

/* =========================================================================
   PROJECTS INTERFACES & METHODS (PHASE 07C)
   ========================================================================= */

export interface AdminProjectsQuery {
  page?: number;
  limit?: number;
  published?: boolean;
  category?: string;
}

export interface AdminProjectsResponse {
  projects: ProjectItem[];
  pagination: PaginationMeta;
}

export interface CreateProjectInput {
  title: string;
  slug?: string;
  category: string;
  shortDescription: string;
  description: string;
  thumbnail: string;
  gallery?: string[];
  technologies?: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
  published?: boolean;
  completionDate?: string | null;
  order?: number;
}

export type UpdateProjectInput = Partial<CreateProjectInput>;

export interface UploadResult {
  id: string;
  url: string;
  displayUrl: string;
  deleteUrl?: string;
  width: number | null;
  height: number | null;
  size: number;
  mimeType: string;
  extension: string;
}

/**
 * Fetch paginated list of projects for the admin table with optional category & published filter.
 */
export async function getAdminProjects(
  query: AdminProjectsQuery = {}
): Promise<AdminProjectsResponse> {
  const { page = 1, limit = 50, published, category } = query;
  const params: Record<string, string | number | boolean | undefined> = {
    page,
    limit,
  };
  if (published !== undefined) {
    params.published = published;
  }
  if (category) {
    params.category = category;
  }

  const res = await api.get<ProjectItem[]>("/api/admin/projects", { params });

  return {
    projects: Array.isArray(res.data) ? res.data : [],
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
 * Fetch a single project by ID.
 */
export async function getAdminProjectById(id: string): Promise<ProjectItem> {
  const res = await api.get<ProjectItem>(`/api/admin/projects/${id}`);
  if (!res.data) {
    throw new Error("Project not found");
  }
  return res.data;
}

/**
 * Create a new project.
 */
export async function createAdminProject(
  data: CreateProjectInput
): Promise<ProjectItem> {
  const res = await api.post<ProjectItem>("/api/admin/projects", data);
  if (!res.data) {
    throw new Error(res.message || "Failed to create project");
  }
  return res.data;
}

/**
 * Update an existing project.
 */
export async function updateAdminProject(
  id: string,
  data: UpdateProjectInput
): Promise<ProjectItem> {
  const res = await api.patch<ProjectItem>(`/api/admin/projects/${id}`, data);
  if (!res.data) {
    throw new Error(res.message || "Failed to update project");
  }
  return res.data;
}

/**
 * Delete a project by ID.
 */
export async function deleteAdminProject(id: string): Promise<{ id: string }> {
  const res = await api.delete<{ id: string }>(`/api/admin/projects/${id}`);
  return res.data || { id };
}

/**
 * Quick toggle for project published state.
 */
export async function toggleProjectPublished(
  id: string,
  currentPublished: boolean
): Promise<ProjectItem> {
  return updateAdminProject(id, { published: !currentPublished });
}

/**
 * Quick toggle for project featured state.
 */
export async function toggleProjectFeatured(
  id: string,
  currentFeatured: boolean
): Promise<ProjectItem> {
  return updateAdminProject(id, { featured: !currentFeatured });
}

/* =========================================================================
   MEDIA UPLOAD (IMGBB THROUGH BACKEND)
   ========================================================================= */

export const MAX_UPLOAD_SIZE_BYTES = 10 * 1024 * 1024; // 10 MB
export const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

/**
 * Uploads a single thumbnail image via POST /api/admin/upload/image
 */
export async function uploadSingleImage(file: File): Promise<UploadResult> {
  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
    throw new Error("Invalid image format. Only JPG, PNG, and WEBP files are allowed.");
  }
  if (file.size > MAX_UPLOAD_SIZE_BYTES) {
    throw new Error(
      `File size exceeds 10 MB limit (${(file.size / (1024 * 1024)).toFixed(2)} MB).`
    );
  }

  const formData = new FormData();
  formData.append("image", file);

  const res = await api.post<UploadResult>("/api/admin/upload/image", formData);
  if (!res.data) {
    throw new Error(res.message || "Failed to upload image");
  }
  return res.data;
}

/**
 * Uploads multiple gallery images via POST /api/admin/upload/images
 */
export async function uploadMultipleImages(files: File[]): Promise<UploadResult[]> {
  if (files.length === 0) return [];
  if (files.length > 10) {
    throw new Error("Cannot upload more than 10 images at once.");
  }

  for (const file of files) {
    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      throw new Error(`Invalid format for ${file.name}. Only JPG, PNG, and WEBP are allowed.`);
    }
    if (file.size > MAX_UPLOAD_SIZE_BYTES) {
      throw new Error(`File ${file.name} exceeds 10 MB limit.`);
    }
  }

  const formData = new FormData();
  files.forEach((file) => {
    formData.append("images", file);
  });

  const res = await api.post<UploadResult[]>("/api/admin/upload/images", formData);
  if (!res.data || !Array.isArray(res.data)) {
    throw new Error(res.message || "Failed to upload gallery images");
  }
  return res.data;
}

/* =========================================================================
   DASHBOARD STATS
   ========================================================================= */

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

/* =========================================================================
   REVIEWS INTERFACES & METHODS (PHASE 07D)
   ========================================================================= */

export interface AdminReviewsQuery {
  page?: number;
  limit?: number;
  approved?: boolean;
  featured?: boolean;
}

export interface AdminReviewsResponse {
  reviews: ReviewItem[];
  pagination: PaginationMeta;
}

export interface CreateReviewInput {
  clientName: string;
  clientPosition?: string;
  clientImage?: string;
  review: string;
  rating: number;
  featured?: boolean;
  approved?: boolean;
  order?: number;
}

export type UpdateReviewInput = Partial<CreateReviewInput>;

export async function getAdminReviews(
  query: AdminReviewsQuery = {}
): Promise<AdminReviewsResponse> {
  const { page = 1, limit = 50, approved, featured } = query;
  const params: Record<string, string | number | boolean | undefined> = {
    page,
    limit,
  };
  if (approved !== undefined) params.approved = approved;
  if (featured !== undefined) params.featured = featured;

  const res = await api.get<ReviewItem[]>("/api/admin/reviews", { params });

  return {
    reviews: Array.isArray(res.data) ? res.data : [],
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

export async function getAdminReviewById(id: string): Promise<ReviewItem> {
  const res = await api.get<ReviewItem>(`/api/admin/reviews/${id}`);
  if (!res.data) throw new Error("Review not found");
  return res.data;
}

export async function createAdminReview(
  data: CreateReviewInput
): Promise<ReviewItem> {
  const res = await api.post<ReviewItem>("/api/admin/reviews", data);
  if (!res.data) throw new Error(res.message || "Failed to create review");
  return res.data;
}

export async function updateAdminReview(
  id: string,
  data: UpdateReviewInput
): Promise<ReviewItem> {
  const res = await api.patch<ReviewItem>(`/api/admin/reviews/${id}`, data);
  if (!res.data) throw new Error(res.message || "Failed to update review");
  return res.data;
}

export async function deleteAdminReview(id: string): Promise<{ id: string }> {
  const res = await api.delete<{ id: string }>(`/api/admin/reviews/${id}`);
  return res.data || { id };
}

export async function toggleReviewApproved(
  id: string,
  currentApproved: boolean
): Promise<ReviewItem> {
  return updateAdminReview(id, { approved: !currentApproved });
}

export async function toggleReviewFeatured(
  id: string,
  currentFeatured: boolean
): Promise<ReviewItem> {
  return updateAdminReview(id, { featured: !currentFeatured });
}

/* =========================================================================
   FAQS INTERFACES & METHODS (PHASE 07D)
   ========================================================================= */

export interface AdminFAQsQuery {
  page?: number;
  limit?: number;
  active?: boolean;
}

export interface AdminFAQsResponse {
  faqs: FAQItem[];
  pagination: PaginationMeta;
}

export interface CreateFAQInput {
  question: string;
  answer: string;
  active?: boolean;
  order?: number;
}

export type UpdateFAQInput = Partial<CreateFAQInput>;

export async function getAdminFAQs(
  query: AdminFAQsQuery = {}
): Promise<AdminFAQsResponse> {
  const { page = 1, limit = 50, active } = query;
  const params: Record<string, string | number | boolean | undefined> = {
    page,
    limit,
  };
  if (active !== undefined) params.active = active;

  const res = await api.get<FAQItem[]>("/api/admin/faqs", { params });

  return {
    faqs: Array.isArray(res.data) ? res.data : [],
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

export async function getAdminFAQById(id: string): Promise<FAQItem> {
  const res = await api.get<FAQItem>(`/api/admin/faqs/${id}`);
  if (!res.data) throw new Error("FAQ not found");
  return res.data;
}

export async function createAdminFAQ(data: CreateFAQInput): Promise<FAQItem> {
  const res = await api.post<FAQItem>("/api/admin/faqs", data);
  if (!res.data) throw new Error(res.message || "Failed to create FAQ");
  return res.data;
}

export async function updateAdminFAQ(
  id: string,
  data: UpdateFAQInput
): Promise<FAQItem> {
  const res = await api.patch<FAQItem>(`/api/admin/faqs/${id}`, data);
  if (!res.data) throw new Error(res.message || "Failed to update FAQ");
  return res.data;
}

export async function deleteAdminFAQ(id: string): Promise<{ id: string }> {
  const res = await api.delete<{ id: string }>(`/api/admin/faqs/${id}`);
  return res.data || { id };
}

export async function toggleFAQActive(
  id: string,
  currentActive: boolean
): Promise<FAQItem> {
  return updateAdminFAQ(id, { active: !currentActive });
}

/* =========================================================================
   CONTACT MESSAGES INTERFACES & METHODS (PHASE 07D)
   ========================================================================= */

export interface AdminContactsQuery {
  page?: number;
  limit?: number;
  status?: "new" | "read" | "replied";
}

export interface AdminContactsResponse {
  contacts: ContactItem[];
  pagination: PaginationMeta;
}

export async function getAdminContacts(
  query: AdminContactsQuery = {}
): Promise<AdminContactsResponse> {
  const { page = 1, limit = 50, status } = query;
  const params: Record<string, string | number | boolean | undefined> = {
    page,
    limit,
  };
  if (status) params.status = status;

  const res = await api.get<ContactItem[]>("/api/admin/contacts", { params });

  return {
    contacts: Array.isArray(res.data) ? res.data : [],
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

export async function getAdminContactById(id: string): Promise<ContactItem> {
  const res = await api.get<ContactItem>(`/api/admin/contacts/${id}`);
  if (!res.data) throw new Error("Contact message not found");
  return res.data;
}

export async function updateContactStatus(
  id: string,
  status: "new" | "read" | "replied"
): Promise<ContactItem> {
  const res = await api.patch<ContactItem>(`/api/admin/contacts/${id}`, { status });
  if (!res.data) throw new Error(res.message || "Failed to update contact status");
  return res.data;
}

export async function deleteAdminContact(id: string): Promise<{ id: string }> {
  const res = await api.delete<{ id: string }>(`/api/admin/contacts/${id}`);
  return res.data || { id };
}

/* =========================================================================
   SITE SETTINGS INTERFACES & METHODS (PHASE 07D)
   ========================================================================= */

export async function getAdminSiteSettings(): Promise<SiteSettings> {
  const res = await api.get<SiteSettings>("/api/admin/site-settings");
  if (!res.data) throw new Error("Site settings not found");
  return res.data;
}

export async function updateAdminSiteSettings(
  data: Partial<SiteSettings>
): Promise<SiteSettings> {
  const res = await api.patch<SiteSettings>("/api/admin/site-settings", data);
  if (!res.data) throw new Error(res.message || "Failed to update site settings");
  return res.data;
}
