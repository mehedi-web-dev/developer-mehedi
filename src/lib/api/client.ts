import { getApiBaseUrl } from "./config";
import { ApiError } from "./errors";
import type { ApiResponse } from "@/types";

export interface RequestOptions extends Omit<RequestInit, "body"> {
  params?: Record<string, string | number | boolean | undefined | null>;
  body?: unknown;
}

/**
 * Builds a full URL including query parameters.
 */
function buildUrl(endpoint: string, params?: RequestOptions["params"]): string {
  const base = getApiBaseUrl();
  const path = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  const url = new URL(`${base}${path}`);

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.append(key, String(value));
      }
    });
  }

  return url.toString();
}

/**
 * Centralized fetch wrapper with JSON parsing, credentials support, and type safety.
 */
export async function apiClient<T = unknown>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<ApiResponse<T>> {
  const { params, body, headers, ...restOptions } = options;
  const url = buildUrl(endpoint, params);

  const requestHeaders = new Headers(headers);
  if (!requestHeaders.has("Accept")) {
    requestHeaders.set("Accept", "application/json");
  }

  const isFormData = typeof FormData !== "undefined" && body instanceof FormData;
  if (!isFormData && body && !requestHeaders.has("Content-Type")) {
    requestHeaders.set("Content-Type", "application/json");
  }

  const config: RequestInit = {
    ...restOptions,
    headers: requestHeaders,
    credentials: restOptions.credentials || "include",
    body: isFormData ? (body as FormData) : body !== undefined ? JSON.stringify(body) : undefined,
  };

  try {
    const response = await fetch(url, config);

    let data: ApiResponse<T> | undefined;
    const contentType = response.headers.get("content-type");

    if (contentType && contentType.includes("application/json")) {
      data = (await response.json()) as ApiResponse<T>;
    }

    if (!response.ok) {
      const errorMessage =
        data?.message || data?.error || `Request failed with status ${response.status}: ${response.statusText}`;

      throw new ApiError<T>({
        message: errorMessage,
        status: response.status,
        statusText: response.statusText,
        data,
      });
    }

    return (
      data ?? {
        success: true,
        message: response.statusText,
      }
    );
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }

    const networkErrorMessage =
      error instanceof Error ? error.message : "Network request failed. Is the backend server running?";

    throw new ApiError({
      message: networkErrorMessage,
      status: 0,
      statusText: "NETWORK_ERROR",
      isNetworkError: true,
    });
  }
}

/**
 * Convenience methods for HTTP verbs.
 */
export const api = {
  get<T = unknown>(endpoint: string, options?: Omit<RequestOptions, "method" | "body">) {
    return apiClient<T>(endpoint, { ...options, method: "GET" });
  },

  post<T = unknown>(endpoint: string, body?: unknown, options?: Omit<RequestOptions, "method" | "body">) {
    return apiClient<T>(endpoint, { ...options, method: "POST", body });
  },

  put<T = unknown>(endpoint: string, body?: unknown, options?: Omit<RequestOptions, "method" | "body">) {
    return apiClient<T>(endpoint, { ...options, method: "PUT", body });
  },

  patch<T = unknown>(endpoint: string, body?: unknown, options?: Omit<RequestOptions, "method" | "body">) {
    return apiClient<T>(endpoint, { ...options, method: "PATCH", body });
  },

  delete<T = unknown>(endpoint: string, options?: Omit<RequestOptions, "method" | "body">) {
    return apiClient<T>(endpoint, { ...options, method: "DELETE" });
  },
};
