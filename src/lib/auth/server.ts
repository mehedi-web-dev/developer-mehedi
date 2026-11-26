import { cookies } from "next/headers";
import { getBackendUrl } from "@/lib/api/config";
import type { User, Session } from "@/types";

export interface ServerSessionResult {
  user: User;
  session: Session;
}

export type AdminAuthCheck =
  | { status: "authenticated"; user: User; session: Session }
  | { status: "unauthenticated"; user: null; session: null }
  | { status: "unauthorized"; user: User; session: Session };

/**
 * Retrieves and validates the active session on the server.
 * Forwards incoming cookies to the backend /api/auth/get-session endpoint.
 */
export async function getServerSession(): Promise<ServerSessionResult | null> {
  try {
    const cookieStore = await cookies();
    const cookieHeader = cookieStore.toString();

    if (!cookieHeader) {
      return null;
    }

    const backendUrl = getBackendUrl();
    const response = await fetch(`${backendUrl}/api/auth/get-session`, {
      method: "GET",
      headers: {
        Cookie: cookieHeader,
        Accept: "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    if (!data || !data.user || !data.session) {
      return null;
    }

    return {
      user: data.user as User,
      session: data.session as Session,
    };
  } catch (error) {
    if (
      error &&
      typeof error === "object" &&
      "digest" in error &&
      typeof (error as { digest?: unknown }).digest === "string" &&
      ((error as { digest: string }).digest.startsWith("DYNAMIC_SERVER_USAGE") ||
        (error as { digest: string }).digest.startsWith("NEXT_REDIRECT"))
    ) {
      throw error;
    }
    console.error("[Auth Server] Failed to verify session on server:", error);
    return null;
  }
}

/**
 * Server-side authorization check specifically requiring an administrator account.
 */
export async function checkAdminAuthorization(): Promise<AdminAuthCheck> {
  const result = await getServerSession();

  if (!result || !result.user) {
    return { status: "unauthenticated", user: null, session: null };
  }

  if (result.user.role !== "admin") {
    return { status: "unauthorized", user: result.user, session: result.session };
  }

  return { status: "authenticated", user: result.user, session: result.session };
}
