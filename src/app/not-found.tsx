import Link from "next/link";
import { ArrowLeft, Home, FileQuestion } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center py-20 px-4 text-center">
      <div className="container-custom max-w-lg space-y-6">
        <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-[var(--surface-subtle)] text-[var(--primary)] mx-auto border border-[var(--border)] shadow-sm">
          <FileQuestion className="h-10 w-10" />
        </div>

        <div className="space-y-2">
          <span className="font-mono text-xs font-semibold uppercase tracking-wider text-[var(--primary)]">
            404 Error
          </span>
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-[var(--foreground)]">
            Page Not Found
          </h1>
          <p className="text-sm leading-relaxed text-[var(--muted)]">
            The page or project you are looking for does not exist, has been removed, or is temporarily unavailable.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-5 py-2.5 text-xs font-semibold text-[var(--foreground)] hover:bg-[var(--surface-hover)] transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Portfolio
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl bg-[var(--primary)] px-5 py-2.5 text-xs font-semibold text-white hover:bg-[var(--primary-hover)] transition-colors shadow-sm"
          >
            <Home className="h-3.5 w-3.5" />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
