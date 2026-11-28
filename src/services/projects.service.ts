import { api } from "@/lib/api";
import { ApiError } from "@/lib/api/errors";
import type { ProjectItem, PaginationMeta } from "@/types";

export interface GetProjectsParams {
  [key: string]: string | number | boolean | null | undefined;
  page?: number;
  limit?: number;
  category?: string;
}

export interface GetProjectsResponse {
  projects: ProjectItem[];
  pagination?: PaginationMeta;
}

export const FALLBACK_PROJECTS: ProjectItem[] = [
  {
    _id: "1",
    title: "MeetMate AI",
    slug: "meetmate-ai-saas",
    category: "Web Design & SaaS",
    shortDescription:
      "Bespoke design and full frontend development for an automated AI meeting intelligence platform, focused on enterprise conversion and interactive UI.",
    description: `### Project Overview
MeetMate AI is an intelligent meeting summarization and collaboration platform designed for modern remote teams. The goal of this project was to craft an ultra-fast, visually captivating marketing experience and interactive web app interface that directly communicates value to enterprise decision-makers.

### The Challenge
The client required a distinctive visual aesthetic that deviated from generic SaaS templates. The interface needed to demonstrate AI audio waveform playback, real-time transcript scrubbing, and automated action-item extraction while maintaining sub-second load times and flawless mobile responsiveness.

### Technical Engineering & Architecture
- **Framework:** Next.js App Router with TypeScript for type safety and server component streaming.
- **Design & Motion:** Custom design system built with Tailwind CSS, accented with fluid physics-based micro-interactions powered by Framer Motion.
- **Performance:** Optimized dynamic assets and vector graphics, achieving a 99/100 Google Lighthouse performance score.
- **Interactive Demos:** Built simulated live meeting transcription previews directly in the browser without third-party dependencies.

### Results & Impact
- **+42% increase** in organic signup conversion within the first 30 days post-launch.
- **0.6s First Contentful Paint** globally via Edge CDN deployment.
- Featured across major SaaS design galleries and product showcases.`,
    thumbnail: "https://framerusercontent.com/images/tbAYKmuCPrc8idgXtBNAyxXWA.png",
    gallery: [
      "https://framerusercontent.com/images/tbAYKmuCPrc8idgXtBNAyxXWA.png",
    ],
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion"],
    liveUrl: "https://meetmate.ai",
    featured: true,
    published: true,
    completionDate: "2024-02-15",
  },
  {
    _id: "2",
    title: "Rawink Tattoo",
    slug: "rawink-creative-studio",
    category: "Branding & Custom Web",
    shortDescription:
      "Raw Ink Tattoo, a creative and professional studio. Complete digital identity and dynamic portfolio showcase with artist profiles and instant booking.",
    description: `### Project Overview
Raw Ink Tattoo is a premier creative tattoo studio seeking a modern, moody, and highly visual digital presence. The new web platform serves as an art gallery, artist portfolio directory, and friction-free consultation booking portal.

### The Challenge
The existing site suffered from slow load times due to uncompressed photo galleries and lacked mobile booking functionality. The client needed a customized WordPress architecture where studio managers could easily upload new flash designs and manage artist availability without touching code.

### Technical Engineering & Architecture
- **CMS:** Custom WordPress with custom post types and Advanced Custom Fields (ACF Pro) for granular artist management.
- **Frontend:** Elementor Pro custom widgets combined with bespoke CSS animations and lightweight JavaScript filters.
- **Media Optimization:** Next-gen WebP image delivery and lazy-loading for heavy high-res tattoo photography portfolios.
- **Booking Flow:** Integrated multi-step consultation form with calendar booking and WhatsApp direct inquiry synchronization.

### Results & Impact
- **+65% increase** in direct mobile booking inquiries within 6 weeks.
- **70% reduction** in page weight and 3x faster page load speeds on mobile networks.
- 100% autonomous client content management with zero maintenance overhead.`,
    thumbnail: "https://framerusercontent.com/images/odZb6sCBuXZLQUkegaYdvpoPck.png",
    gallery: [
      "https://framerusercontent.com/images/odZb6sCBuXZLQUkegaYdvpoPck.png",
    ],
    technologies: ["WordPress", "Elementor Pro", "Custom CSS", "ACF Pro", "JavaScript"],
    liveUrl: "https://rawink.nl",
    featured: true,
    published: true,
    completionDate: "2023-11-20",
  },
  {
    _id: "3",
    title: "Gijs.nl",
    slug: "gijs-luxe-shutters",
    category: "Web Design & E-Commerce",
    shortDescription:
      "Elegant and functional website for a custom shutter and home maintenance specialist, engineered for uncompromising build quality and effortless usability.",
    description: `### Project Overview
Gijs.nl specializes in custom high-end window shutters and luxury home maintenance solutions in the Netherlands. The objective was to replace an outdated web presence with an authoritative, conversion-optimized platform that elevates brand perception and drives qualified quotation requests.

### The Challenge
Custom interior shutters require precise measurements and personalized consultation before ordering. The platform needed to guide homeowners through product styles, materials, and color options effortlessly while streamlining the quotation process.

### Technical Engineering & Architecture
- **Platform:** High-performance WooCommerce store with custom product configurator and step-by-step quote builder.
- **Speed Engineering:** Database indexing, object caching, and asset bundling achieving consistent 98+ PageSpeed scores on mobile.
- **Localization & SEO:** Dutch on-page SEO optimization, structured Schema.org markup for local services, and automated lead capture into the client's CRM.

### Results & Impact
- **+80% increase** in high-value custom quotation requests within 2 months of deployment.
- **Sub-1s page load times** on mobile devices across all product category catalogs.
- Zero cart abandonment on custom consultation bookings.`,
    thumbnail: "https://framerusercontent.com/images/8tYnYpe4DeBFntYlkXLzk8HvC9A.png",
    gallery: [
      "https://framerusercontent.com/images/8tYnYpe4DeBFntYlkXLzk8HvC9A.png",
    ],
    technologies: ["WooCommerce", "WordPress", "Custom Checkout", "Speed Optimization", "Tailwind CSS"],
    liveUrl: "https://gijs.nl",
    featured: true,
    published: true,
    completionDate: "2024-01-10",
  },
];

/**
 * Fetch paginated list of published projects with optional category filter.
 */
export async function getProjects(
  params?: GetProjectsParams
): Promise<GetProjectsResponse> {
  try {
    const res = await api.get<ProjectItem[]>("/api/projects", { params });
    const projects = Array.isArray(res.data) && res.data.length > 0 ? res.data : FALLBACK_PROJECTS;
    return {
      projects,
      pagination: res.pagination || {
        page: 1,
        limit: 10,
        totalItems: projects.length,
        totalPages: 1,
        hasNextPage: false,
        hasPrevPage: false,
      },
    };
  } catch {
    return {
      projects: FALLBACK_PROJECTS,
      pagination: {
        page: 1,
        limit: 10,
        totalItems: FALLBACK_PROJECTS.length,
        totalPages: 1,
        hasNextPage: false,
        hasPrevPage: false,
      },
    };
  }
}

/**
 * Fetch featured published projects (maximum 3) from the backend.
 */
export async function getFeaturedProjects(): Promise<ProjectItem[]> {
  try {
    const res = await api.get<ProjectItem[]>("/api/projects/featured", {
      cache: "no-store",
    });
    if (Array.isArray(res.data) && res.data.length > 0) {
      return res.data;
    }
    return FALLBACK_PROJECTS;
  } catch {
    return FALLBACK_PROJECTS;
  }
}

/**
 * Fetch a single published project by its slug.
 * Guaranteed to return project data by falling back to built-in projects if backend is offline.
 */
export async function getProjectBySlug(slug: string): Promise<ProjectItem | null> {
  try {
    const res = await api.get<ProjectItem>(`/api/projects/${encodeURIComponent(slug)}`);
    if (res.data) return res.data;
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      // Check fallback before returning null
    }
  }

  // Check fallback array
  const fallback = FALLBACK_PROJECTS.find(
    (p) => p.slug.toLowerCase() === slug.toLowerCase()
  );
  if (fallback) return fallback;

  return null;
}
