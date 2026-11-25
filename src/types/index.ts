/**
 * Central type definitions for the developer-mehedi portfolio.
 */

export type ThemeMode = "light" | "dark" | "system";

/**
 * Common API Response structure returned by developer-mehedi-server.
 */
export interface ApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
  errors?: Record<string, string[]>;
  timestamp?: string;
  pagination?: PaginationMeta;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

/**
 * Health check response from backend /api/health
 */
export interface HealthStatus {
  status: "ok" | "healthy" | "degraded" | "error";
  uptime: number;
  timestamp: string;
  database: string;
  services?: {
    database: string;
    auth: string;
    storage: string;
  };
}

/**
 * Service Model
 */
export interface ServiceItem {
  _id: string;
  title: string;
  slug: string;
  shortDescription: string;
  description: string;
  icon?: string;
  features: string[];
  technologies?: string[];
  featured: boolean;
  published: boolean;
  order?: number;
  createdAt?: string;
  updatedAt?: string;
}

/**
 * Project Model
 */
export interface ProjectItem {
  _id: string;
  title: string;
  slug: string;
  category: string;
  shortDescription: string;
  description: string;
  thumbnail: string;
  gallery?: string[];
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  published: boolean;
  completionDate?: string | null;
  order?: number;
  createdAt?: string;
  updatedAt?: string;
}

/**
 * Client Review Model
 */
export interface ReviewItem {
  _id: string;
  clientName: string;
  clientPosition?: string;
  clientImage?: string;
  review: string;
  rating: number;
  featured?: boolean;
  approved: boolean;
  order?: number;
  createdAt?: string;
}

/**
 * FAQ Model
 */
export interface FAQItem {
  _id: string;
  question: string;
  answer: string;
  active: boolean;
  order?: number;
  createdAt?: string;
}

/**
 * Site Settings Model
 */
export interface SiteSettings {
  personalInfo?: {
    name?: string;
    title?: string;
    bio?: string;
    profileImage?: string;
    email?: string;
    phone?: string;
    location?: string;
    resumeUrl?: string;
    availableForHire?: boolean;
  };
  socialLinks?: Array<{
    platform: string;
    url: string;
    icon?: string;
  }>;
  skills?: Array<{
    category: string;
    items: string[];
  }>;
  experience?: Array<{
    title: string;
    company: string;
    location?: string;
    startDate?: string | null;
    endDate?: string | null;
    current?: boolean;
    description?: string;
    technologies?: string[];
  }>;
  education?: Array<{
    degree: string;
    institution: string;
    fieldOfStudy?: string;
    startDate?: string | null;
    endDate?: string | null;
    grade?: string;
    description?: string;
  }>;
}

/**
 * Contact Form Payload
 */
export interface ContactFormPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
  _hp?: string; // Honeypot field
  website?: string;
}

/**
 * Contact Message Model (from backend Contact collection)
 */
export interface ContactItem {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: "new" | "read" | "replied";
  createdAt: string;
}

/**
 * User representation from Better Auth
 */
export interface User {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image?: string | null;
  role?: "admin" | "user";
  createdAt: Date | string;
  updatedAt: Date | string;
}

/**
 * Session representation from Better Auth
 */
export interface Session {
  id: string;
  userId: string;
  token: string;
  expiresAt: Date | string;
  ipAddress?: string | null;
  userAgent?: string | null;
}
