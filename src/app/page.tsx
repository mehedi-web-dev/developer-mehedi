import { ThemeToggle } from "@/components/ui/theme-toggle";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-6 sm:p-12">
      {/* Top Bar with Theme Toggle */}
      <header className="container-custom flex items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-[var(--primary)]" />
          <span className="font-mono text-sm font-semibold tracking-wider text-[var(--foreground)]">
            MEHEDI.DEV
          </span>
        </div>
        <div className="flex items-center gap-3">
          <ThemeToggle showLabel />
        </div>
      </header>

      {/* Foundation Showcase */}
      <main className="container-custom flex flex-1 flex-col items-center justify-center text-center">
        <div className="glass max-w-2xl rounded-2xl p-8 sm:p-12">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface-subtle)] px-3 py-1 text-xs font-medium text-[var(--muted)]">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Phase 04 — Frontend Foundation & Design System
          </div>

          <h1 className="text-3xl font-bold tracking-tight sm:text-5xl text-[var(--foreground)]">
            Mehedi Hasan
          </h1>

          <p className="mt-3 text-lg font-medium text-[var(--primary)]">
            WordPress & Frontend Developer
          </p>

          <p className="mt-4 text-sm leading-relaxed text-[var(--muted)]">
            Design system foundation established with Next.js 16, React 19, Tailwind CSS v4, HeroUI,
            Framer Motion, next-themes, and Better Auth client integration.
          </p>

          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 text-left">
            <div className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-3">
              <span className="block text-xs text-[var(--muted)]">Theme</span>
              <span className="text-sm font-semibold text-[var(--foreground)]">Dark & Light</span>
            </div>
            <div className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-3">
              <span className="block text-xs text-[var(--muted)]">Framework</span>
              <span className="text-sm font-semibold text-[var(--foreground)]">Next.js 16</span>
            </div>
            <div className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-3">
              <span className="block text-xs text-[var(--muted)]">Styling</span>
              <span className="text-sm font-semibold text-[var(--foreground)]">Tailwind v4</span>
            </div>
            <div className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-3">
              <span className="block text-xs text-[var(--muted)]">Auth</span>
              <span className="text-sm font-semibold text-[var(--foreground)]">Better Auth</span>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="container-custom py-4 text-center text-xs text-[var(--muted)]">
        &copy; {new Date().getFullYear()} Mehedi Hasan. All rights reserved.
      </footer>
    </div>
  );
}
