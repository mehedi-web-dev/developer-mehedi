import {
  Layers,
  Globe,
  ShoppingCart,
  Boxes,
  Code,
  FileCode,
  Atom,
  Server,
  Database,
  Cpu,
  Sparkles,
  Zap,
} from "lucide-react";

interface SkillItem {
  name: string;
  level: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
}

interface SkillCategory {
  title: string;
  tagline: string;
  skills: SkillItem[];
}

const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "WordPress Ecosystem",
    tagline: "Core Specialization & Production Experience",
    skills: [
      {
        name: "WordPress",
        level: "Advanced",
        icon: Globe,
        description: "Custom themes, plugin setup, site architecture, and speed optimization.",
      },
      {
        name: "Elementor Pro",
        level: "Advanced",
        icon: Layers,
        description: "Pixel-perfect visual design, theme builder templates, and responsive layouts.",
      },
      {
        name: "WooCommerce",
        level: "Proficient",
        icon: ShoppingCart,
        description: "E-commerce store setup, product filtering, payment gateways, and checkout flows.",
      },
      {
        name: "Crocoblock",
        level: "Proficient",
        icon: Boxes,
        description: "JetEngine custom post types, dynamic listings, relations, and advanced filters.",
      },
    ],
  },
  {
    title: "Frontend Engineering",
    tagline: "Modern JavaScript & Component Architecture",
    skills: [
      {
        name: "HTML & CSS",
        level: "Advanced",
        icon: Code,
        description: "Semantic HTML5, CSS3, modern flexbox/grid, and accessible markup.",
      },
      {
        name: "JavaScript",
        level: "Advanced",
        icon: FileCode,
        description: "ES6+ syntax, asynchronous programming, DOM manipulation, and browser APIs.",
      },
      {
        name: "TypeScript",
        level: "Proficient",
        icon: Cpu,
        description: "Type safety, interfaces, strict compiler options, and generic utilities.",
      },
      {
        name: "React",
        level: "Advanced",
        icon: Atom,
        description: "Functional components, custom hooks, state management, and modern React 19.",
      },
      {
        name: "Next.js",
        level: "Advanced",
        icon: Zap,
        description: "App Router, Server Components (RSC), SSR, SEO optimization, and metadata.",
      },
      {
        name: "Tailwind CSS",
        level: "Advanced",
        icon: Sparkles,
        description: "Tailwind v4 utility styling, custom themes, dark mode, and responsive designs.",
      },
    ],
  },
  {
    title: "Backend & Database",
    tagline: "Server & Data Layer Foundations",
    skills: [
      {
        name: "Node.js",
        level: "Foundational",
        icon: Server,
        description: "JavaScript runtime, asynchronous I/O, server scripts, and npm tooling.",
      },
      {
        name: "Express.js",
        level: "Foundational",
        icon: Code,
        description: "RESTful API routes, middleware architecture, CORS, and request validation.",
      },
      {
        name: "MongoDB",
        level: "Foundational",
        icon: Database,
        description: "NoSQL document models, Mongoose schemas, indexes, and queries.",
      },
    ],
  },
];

export function SkillsSection() {
  return (
    <section id="skills" className="py-20 sm:py-28">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1 text-xs font-medium text-[var(--primary)]">
            <Sparkles className="h-3 w-3" />
            Skills &amp; Technologies
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-[var(--foreground)]">
            My Technical Toolkit
          </h2>
          <p className="text-sm leading-relaxed text-[var(--muted)]">
            A comprehensive set of tools and technologies honed through 80+ completed client websites
            and continuous modern frontend engineering.
          </p>
        </div>

        {/* Categories Stack */}
        <div className="mt-16 space-y-12">
          {SKILL_CATEGORIES.map((category) => (
            <div key={category.title} className="space-y-6">
              <div className="border-b border-[var(--border)] pb-3 flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                <h3 className="text-xl font-bold text-[var(--foreground)]">
                  {category.title}
                </h3>
                <span className="font-mono text-xs text-[var(--muted)]">
                  {category.tagline}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {category.skills.map((skill) => {
                  const Icon = skill.icon;
                  return (
                    <div
                      key={skill.name}
                      className="group relative rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 transition-all duration-200 hover:border-[var(--primary)] hover:shadow-lg hover:shadow-[var(--primary)]/5"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--surface-subtle)] text-[var(--primary)] transition-transform duration-200 group-hover:scale-110">
                          <Icon className="h-5 w-5" />
                        </div>
                        <span className="rounded-full bg-[var(--surface-subtle)] px-2.5 py-0.5 text-[10px] font-mono font-medium text-[var(--muted)]">
                          {skill.level}
                        </span>
                      </div>

                      <h4 className="text-base font-bold text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors">
                        {skill.name}
                      </h4>

                      <p className="mt-1.5 text-xs leading-relaxed text-[var(--muted)]">
                        {skill.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
