import * as React from "react";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { LoginForm } from "@/components/auth/login-form";
import { checkAdminAuthorization } from "@/lib/auth/server";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admin Login | Mehedi Hasan",
  description: "Secure administrator authentication portal for Mehedi Hasan Portfolio.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

export default async function LoginPage() {
  // If already authenticated as an admin on the server, redirect directly to /admin
  const authCheck = await checkAdminAuthorization();
  if (authCheck.status === "authenticated") {
    redirect("/admin");
  }

  return (
    <div className="flex min-h-[calc(100vh-14rem)] items-center justify-center py-16 px-4">
      <React.Suspense
        fallback={
          <div className="w-full max-w-md mx-auto p-8 rounded-3xl border border-[var(--border)] bg-[var(--surface)] animate-pulse h-96" />
        }
      >
        <LoginForm />
      </React.Suspense>
    </div>
  );
}
