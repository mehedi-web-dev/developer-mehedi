import { api } from "@/lib/api";
import type { HealthStatus } from "@/types";

export interface BackendHealthResponse {
  success: boolean;
  status: string;
  uptime?: number;
  database?: string;
  timestamp?: string;
  services?: Record<string, string>;
}

/**
 * Service to check developer-mehedi-server health status.
 */
export async function checkBackendHealth(): Promise<BackendHealthResponse> {
  const response = await api.get<HealthStatus>("/api/health");
  return {
    success: response.success,
    status: response.data?.status || "ok",
    uptime: response.data?.uptime,
    database: response.data?.database,
    timestamp: response.data?.timestamp,
    services: response.data?.services,
  };
}
