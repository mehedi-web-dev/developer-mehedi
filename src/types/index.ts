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
}

/**
 * Health check response from backend /api/health
 */
export interface HealthStatus {
  status: "ok" | "degraded" | "error";
  uptime: number;
  timestamp: string;
  database: string;
  services: {
    database: string;
    auth: string;
    storage: string;
  };
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
