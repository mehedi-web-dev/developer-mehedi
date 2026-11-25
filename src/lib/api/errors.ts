import type { ApiResponse } from "@/types";

/**
 * Custom error class representing API call failures.
 */
export class ApiError<T = unknown> extends Error {
  public readonly status: number;
  public readonly statusText: string;
  public readonly data?: ApiResponse<T>;
  public readonly isNetworkError: boolean;

  constructor(params: {
    message: string;
    status: number;
    statusText: string;
    data?: ApiResponse<T>;
    isNetworkError?: boolean;
  }) {
    super(params.message);
    this.name = "ApiError";
    this.status = params.status;
    this.statusText = params.statusText;
    this.data = params.data;
    this.isNetworkError = Boolean(params.isNetworkError);

    // Maintains proper stack trace in V8 engines
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ApiError);
    }
  }
}
