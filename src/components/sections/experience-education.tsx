import { GraduationCap, Award, BookOpen, Clock } from "lucide-react";

export function ExperienceEducationSection() {
  return (
    <section className="py-20 sm:py-28 border-t border-[var(--border)] bg-[var(--surface-subtle)]/40">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1 text-xs font-medium text-[var(--primary)]">
            <GraduationCap className="h-3 w-3" />
            Education &amp; Training
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-[var(--foreground)]">
            Professional Learning &amp; Foundations
          </h2>
          <p className="text-sm leading-relaxed text-[var(--muted)]">
            Continuous development through structured programs and dedicated specialization in modern web technologies.
          </p>
        </div>

        {/* Milestone Grid */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Milestone 1: Sorobindu */}
          <div className="glass rounded-3xl p-8 border border-[var(--border)] shadow-md hover:border-[var(--primary)] hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-500/10 text-[var(--primary)]">
                <Award className="h-6 w-6" />
              </div>
              <span className="rounded-full bg-emerald-500/10 text-emerald-500 px-3 py-1 text-xs font-semibold">
                Completed
              </span>
            </div>

            <h3 className="text-xl font-bold text-[var(--foreground)]">
              WordPress Customization
            </h3>
            <p className="font-mono text-sm font-medium text-[var(--primary)] mt-1">
              Sorobindu
            </p>

            <p className="mt-4 text-sm leading-relaxed text-[var(--muted)]">
              Comprehensive practical training covering WordPress theme architecture, Elementor Pro design techniques, WooCommerce store configurations, and dynamic data modeling.
            </p>

            <div className="mt-6 flex flex-wrap gap-2 pt-4 border-t border-[var(--border)]">
              <span className="rounded-md bg-[var(--surface)] px-2.5 py-1 text-xs text-[var(--foreground)] border border-[var(--border)]">
                WordPress Core
              </span>
              <span className="rounded-md bg-[var(--surface)] px-2.5 py-1 text-xs text-[var(--foreground)] border border-[var(--border)]">
                Elementor Pro
              </span>
              <span className="rounded-md bg-[var(--surface)] px-2.5 py-1 text-xs text-[var(--foreground)] border border-[var(--border)]">
                WooCommerce
              </span>
            </div>
          </div>

          {/* Milestone 2: Programming Hero */}
          <div className="glass rounded-3xl p-8 border border-[var(--border)] shadow-md hover:border-[var(--secondary)] hover:-translate-y-1 hover:shadow-xl transition-all duration-300 relative overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-500/10 text-[var(--secondary)]">
                <BookOpen className="h-6 w-6" />
              </div>
              <span className="flex items-center gap-1.5 rounded-full bg-cyan-500/10 text-[var(--secondary)] px-3 py-1 text-xs font-semibold">
                <Clock className="h-3.5 w-3.5" />
                Ongoing / In Progress
              </span>
            </div>

            <h3 className="text-xl font-bold text-[var(--foreground)]">
              Full-Stack Web Development
            </h3>
            <p className="font-mono text-sm font-medium text-[var(--secondary)] mt-1">
              Programming Hero
            </p>

            <p className="mt-4 text-sm leading-relaxed text-[var(--muted)]">
              Intensive full-stack development curriculum focusing on modern JavaScript, React, Next.js, Node.js, Express, MongoDB, and production deployment standards.
            </p>

            <div className="mt-6 flex flex-wrap gap-2 pt-4 border-t border-[var(--border)]">
              <span className="rounded-md bg-[var(--surface)] px-2.5 py-1 text-xs text-[var(--foreground)] border border-[var(--border)]">
                React &amp; Next.js
              </span>
              <span className="rounded-md bg-[var(--surface)] px-2.5 py-1 text-xs text-[var(--foreground)] border border-[var(--border)]">
                Node &amp; Express
              </span>
              <span className="rounded-md bg-[var(--surface)] px-2.5 py-1 text-xs text-[var(--foreground)] border border-[var(--border)]">
                MongoDB
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
