"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  Lock,
  Mail,
  Eye,
  EyeOff,
  Loader2,
  AlertCircle,
  Code2,
  ShieldAlert,
  ArrowLeft,
} from "lucide-react";
import { authClient } from "@/lib/auth/client";
import { cn } from "@/lib/utils";
import type { User } from "@/types";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectReason = searchParams.get("reason");

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(() => {
    if (redirectReason === "unauthorized") {
      return "Access denied. Your account does not have administrator privileges.";
    }
    if (redirectReason === "session_expired") {
      return "Your admin session has expired. Please log in again.";
    }
    return null;
  });

  const [fieldErrors, setFieldErrors] = React.useState<{ email?: string; password?: string }>({});

  const validate = (): boolean => {
    const errs: { email?: string; password?: string } = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email.trim()) {
      errs.email = "Email address is required";
    } else if (!emailRegex.test(email.trim())) {
      errs.email = "Please enter a valid email address";
    }

    if (!password) {
      errs.password = "Password is required";
    } else if (password.length < 6) {
      errs.password = "Password must be at least 6 characters";
    }

    setFieldErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isSubmitting) return;

    if (!validate()) return;

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const result = await authClient.signIn.email({
        email: email.trim().toLowerCase(),
        password,
      });

      if (result.error) {
        // Generic, safe error message to prevent account enumeration
        setErrorMessage(
          result.error.message || "Invalid credentials. Please check your email and password."
        );
        setIsSubmitting(false);
        return;
      }

      // Verify that the signed-in user possesses the admin role
      const sessionResult = await authClient.getSession();
      const user = (sessionResult?.data?.user || (result.data as { user?: User })?.user) as User | undefined;

      if (!user || user.role !== "admin") {
        // Sign out immediately to prevent leaving a non-admin session active
        await authClient.signOut();
        setErrorMessage("Access denied: You do not possess administrator credentials.");
        setIsSubmitting(false);
        return;
      }

      // Successful admin login
      router.push("/admin");
      router.refresh();
    } catch {
      setErrorMessage(
        "Unable to connect to the authentication service. Please check your connection or retry."
      );
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Back to Home Link */}
      <div className="mb-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-[var(--muted)] hover:text-[var(--foreground)] transition-colors group"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          <span>Return to Portfolio</span>
        </Link>
      </div>

      <div className="glass rounded-3xl p-8 sm:p-10 border border-[var(--border)] shadow-2xl relative overflow-hidden">
        {/* Ambient Top Glow */}
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[var(--primary)] via-violet-500 to-[var(--secondary)]" />

        {/* Brand Header */}
        <div className="text-center space-y-2 mb-8">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-[var(--primary)] to-[var(--secondary)] text-white mx-auto shadow-md shadow-[var(--primary)]/20 mb-4">
            <Code2 className="h-6 w-6" />
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-[var(--foreground)]">
            Admin Portal
          </h1>
          <p className="text-xs text-[var(--muted)]">
            Mehedi Hasan Portfolio &bull; Administrator Access Only
          </p>
        </div>

        {/* Global Error Banner */}
        {errorMessage && (
          <div className="mb-6 rounded-xl border border-red-500/20 bg-red-500/10 p-4 flex items-start gap-3 text-red-500 text-xs">
            {redirectReason === "unauthorized" ? (
              <ShieldAlert className="h-4 w-4 shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
            )}
            <span className="leading-relaxed">{errorMessage}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} noValidate className="space-y-5">
          {/* Email Field */}
          <div className="space-y-1.5">
            <label htmlFor="email" className="block text-xs font-semibold text-[var(--foreground)]">
              Admin Email
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-[var(--muted)]">
                <Mail className="h-4 w-4" />
              </span>
              <input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="admin@developermehedi.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (fieldErrors.email) setFieldErrors((p) => ({ ...p, email: undefined }));
                  if (errorMessage) setErrorMessage(null);
                }}
                disabled={isSubmitting}
                className={cn(
                  "w-full rounded-xl border bg-[var(--surface)] pl-10 pr-4 py-3 text-sm text-[var(--foreground)] placeholder:text-[var(--muted)]/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]",
                  fieldErrors.email ? "border-red-500" : "border-[var(--border)]"
                )}
                aria-invalid={Boolean(fieldErrors.email)}
                aria-describedby={fieldErrors.email ? "email-error" : undefined}
              />
            </div>
            {fieldErrors.email && (
              <p id="email-error" className="text-[11px] text-red-500">
                {fieldErrors.email}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div className="space-y-1.5">
            <label
              htmlFor="password"
              className="block text-xs font-semibold text-[var(--foreground)]"
            >
              Password
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-[var(--muted)]">
                <Lock className="h-4 w-4" />
              </span>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (fieldErrors.password) setFieldErrors((p) => ({ ...p, password: undefined }));
                  if (errorMessage) setErrorMessage(null);
                }}
                disabled={isSubmitting}
                className={cn(
                  "w-full rounded-xl border bg-[var(--surface)] pl-10 pr-11 py-3 text-sm text-[var(--foreground)] placeholder:text-[var(--muted)]/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]",
                  fieldErrors.password ? "border-red-500" : "border-[var(--border)]"
                )}
                aria-invalid={Boolean(fieldErrors.password)}
                aria-describedby={fieldErrors.password ? "password-error" : undefined}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-[var(--muted)] hover:text-[var(--foreground)] transition-colors focus-visible:outline-none"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {fieldErrors.password && (
              <p id="password-error" className="text-[11px] text-red-500">
                {fieldErrors.password}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--primary)] px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[var(--primary)]/20 transition-all hover:bg-[var(--primary-hover)] active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Authenticating...</span>
              </>
            ) : (
              <span>Sign In to Dashboard</span>
            )}
          </button>
        </form>

        {/* Security Notice */}
        <div className="mt-8 pt-6 border-t border-[var(--border)] text-center">
          <p className="text-[11px] text-[var(--muted)]">
            Protected by Better Auth session encryption and server-side RBAC authorization.
          </p>
        </div>
      </div>
    </div>
  );
}
