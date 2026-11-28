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

/**
 * Mehedi Hasan's official real projects.
 * Extracted directly from MongoDB production database.
 */
export const FALLBACK_PROJECTS: ProjectItem[] = [
  {
    _id: "6b0907bfb3f71514d1922a9e",
    title: "SalonBook",
    slug: "salonbook",
    category: "Full-Stack Web Development",
    shortDescription:
      "SalonBook is a modern salon and barber appointment booking platform featuring dynamic service and barber management, secure authentication, appointment scheduling, Stripe payments, and dedicated customer and admin dashboards.",
    description: `### Project Overview
SalonBook is a full-stack salon and barber appointment booking platform designed to simplify discovering salon services, exploring professional barbers, and scheduling appointments online.

### Key Features
- **Modern Homepage:** Responsive landing page showcasing featured services and verified barber profiles.
- **Service Browsing:** Dynamic service discovery with live search, category filtering, and itemized service details.
- **Barber Management:** Staff profiles with specialization tags, years of experience, and individual service assignments.
- **Secure Authentication:** Customer and admin registration and login powered by Better Auth with session management.
- **Smart Scheduling:** Interactive time slot booking system engineered with duplicate-booking prevention.
- **Stripe Payments:** Integrated Stripe Checkout for secure online deposit and payment processing.
- **Customer & Admin Dashboards:** Dedicated portal for appointment tracking, booking management, and revenue analytics.

### Technical Engineering & Architecture
- **Frontend:** Next.js App Router, React, TypeScript, Tailwind CSS, and Recharts for dashboard data visualization.
- **Backend & Database:** Node.js, Express.js REST API with MongoDB Native Driver for high-concurrency database queries.
- **Payments & Storage:** Stripe Checkout for transactions and ImgBB CDN integration for fast cloud photo delivery.

### Project Outcome
A battle-tested, production-ready appointment platform providing frictionless customer booking and automated schedule administration for barbershops and salons.`,
    thumbnail: "https://i.ibb.co/BKc9SmnV/Screenshot-2026-11-27-102749.png",
    gallery: [
      "https://i.ibb.co/xSxR5J0Q/screencapture-salonbook-virid-vercel-app-2026-11-27-10-27-24.png",
      "https://i.ibb.co/5grz3py5/Screenshot-2026-11-27-102929.png",
    ],
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Better Auth",
      "Stripe",
    ],
    liveUrl: "https://salonbook-virid.vercel.app/",
    githubUrl: "https://github.com/mehedi-web-dev/salonbook",
    featured: true,
    published: true,
    completionDate: "2026-11-22T00:00:00.000Z",
    order: 1,
  },
  {
    _id: "6b0972e9541532e7f8213876",
    title: "Morning Football Academy",
    slug: "morning-football-academy",
    category: "Full-Stack Web Development",
    shortDescription:
      "A modern football academy management platform featuring player profiles, match statistics, tournament management, friendly series, goal scorer leaderboards, and a secure admin dashboard.",
    description: `### Project Overview
Morning Football Academy is a comprehensive athletic management system designed to track players, organize competitive tournaments, record match results, and celebrate standout player performance through a responsive public platform and administrative portal.

### The Challenge
The academy previously operated on fragmented spreadsheets and manual message threads to track player rosters, tournament standings, and goal tallies. They needed an all-in-one platform to automate fixtures, compute league tables, and highlight player development.

### Technical Engineering & Architecture
- **Player & Squad Profiles:** Detailed player bio cards with match statistics, goals, assists, and player photography.
- **Automated Tournament Engine:** Round-robin fixture generator, live group standings, match scores, and Golden Boot race.
- **Friendly Series Format:** Best-of-3 and Best-of-5 tournament bracket scheduling and point calculation.
- **Live Leaderboards:** Real-time top scorer and top assist trackers on the public homepage.
- **Architecture:** Next.js and TypeScript frontend paired with Express.js REST API, Better Auth authentication, and MongoDB storage.

### Project Outcome
Centralized athletic administration that empowers coaches, inspires young players with live performance tracking, and keeps parents informed.`,
    thumbnail: "https://i.ibb.co/23m502LS/Screenshot-2026-11-27-180654.png",
    gallery: [
      "https://i.ibb.co/pjyxrBnw/Screenshot-2026-11-27-112130.png",
      "https://i.ibb.co/F4LzkwDf/Screenshot-2026-11-27-180713.png",
      "https://i.ibb.co/C59nKMsQ/Screenshot-2026-11-27-180739.png",
    ],
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Express.js",
      "Node.js",
      "MongoDB",
      "Better Auth",
    ],
    liveUrl: "https://morning-football-academy.vercel.app/",
    githubUrl: "https://github.com/mehedi-web-dev/morning-football-academy",
    featured: true,
    published: true,
    completionDate: "2026-11-26T00:00:00.000Z",
    order: 2,
  },
  {
    _id: "6b09755fc2c2bc432a46cff0",
    title: "StudioSpace",
    slug: "studiospace",
    category: "Full-Stack Web Development",
    shortDescription:
      "A full-stack peer-to-peer creative workspace booking platform where photographers, filmmakers, podcasters, and creators can discover, list, and book professional studios with secure authentication and booking management.",
    description: `### Project Overview
StudioSpace is a peer-to-peer creative workspace and production studio rental marketplace connecting photographers, podcasters, and videographers with creative studio spaces.

### The Challenge
Creative professionals often struggle to discover specialized studio facilities with specific acoustic treatments, lighting grids, and backdrops. At the same time, studio owners require a reliable mechanism to manage hourly availability and bookings.

### Technical Engineering & Architecture
- **Marketplace Listings:** Dynamic studio directory with search, filter by equipment/amenity, and location mapping.
- **Studio Detail Pages:** High-resolution image galleries, hourly pricing tiers, and host profiles.
- **Host Dashboard:** Studio hosts can create, edit, and manage their listings and review booking requests.
- **User Dashboard:** Creators can track upcoming reservation slots and manage booking statuses.
- **Tech Stack:** Next.js and Tailwind CSS frontend with dark/light theme support, Node.js and Express backend, MongoDB database, and Better Auth authentication.

### Project Outcome
A modern, intuitive rental marketplace that streamlines creative studio discovery and booking management.`,
    thumbnail: "https://i.ibb.co/Z1kRKh0S/Screenshot-2026-11-27-181734.png",
    gallery: [
      "https://i.ibb.co/ZzFcG9QR/Screenshot-2026-11-27-181744.png",
    ],
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Express.js",
      "Node.js",
      "MongoDB",
      "Better Auth",
    ],
    liveUrl: "https://studio-space-one.vercel.app/",
    githubUrl: "https://github.com/mehedi-web-dev/studio-space",
    featured: true,
    published: true,
    completionDate: "2026-11-05T00:00:00.000Z",
    order: 3,
  },
  {
    _id: "6b097709c2c2bc432a46cff1",
    title: "Voicecollective",
    slug: "voicecollective",
    category: "WordPress & Elementor",
    shortDescription:
      "A website for Voice Collective, a Dutch pop choir based in Heemstede, showcasing its members, musical repertoire, performances, events, and membership opportunities through an engaging and informative online experience.",
    description: `### Project Overview
Voice Collective is a celebrated pop choir based in Heemstede, Netherlands, comprising approximately 60 singers across Soprano, Alto, Tenor, and Bass vocal groups. The website serves as their primary digital presence to attract new members, announce concerts, and showcase their musical repertoire.

### The Challenge
The choir needed a vibrant, multilingual-ready website that choir committee members could effortlessly update with upcoming concerts, audition schedules, and photo albums without touching code.

### Technical Engineering & Architecture
- **Bespoke Theme:** Developed custom WordPress layout using Elementor Pro, tailored custom widgets, and lightweight styling.
- **Events & Performances:** Integrated upcoming performance schedule with venue maps and ticket reservation links.
- **Media Showcase:** High-performance responsive photo galleries and embedded performance audio/video players.
- **Membership Onboarding:** Dedicated audition guidelines and prospective member inquiry forms.

### Project Outcome
An inviting, accessible digital hub that successfully increased prospective member applications and concert attendance across the Netherlands.`,
    thumbnail: "https://i.ibb.co/8DwPLS3W/Screenshot-2026-11-27-182543.png",
    gallery: [
      "https://i.ibb.co/NdmpTVkz/Screenshot-2026-11-27-182602.png",
    ],
    technologies: [
      "WordPress",
      "Elementor",
      "Elementor Pro",
      "Custom CSS",
      "Speed Optimization",
    ],
    liveUrl: "https://voicecollective.nl/",
    githubUrl: "",
    featured: true,
    published: true,
    completionDate: "2026-03-19T00:00:00.000Z",
    order: 4,
  },
  {
    _id: "6b09786b799821a880f84e9e",
    title: "Topsloopautoverkopen",
    slug: "topsloopautoverkopen",
    category: "WordPress & Elementor",
    shortDescription:
      "A professional website for Top Sloop Auto Verkopen, helping customers sell scrap, damaged, and non-running vehicles through a convenient online car selling and inquiry process.",
    description: `### Project Overview
Top Sloop Auto Verkopen is an automotive valuation and scrap vehicle purchasing service operating across the Netherlands. The platform is engineered to convert vehicle owners into direct valuation inquiries.

### The Challenge
The automotive scrap market in the Netherlands is highly competitive with heavy search advertising. The platform required maximum loading speed on mobile 4G networks, clear trust indicators, and a 30-second quotation inquiry form.

### Technical Engineering & Architecture
- **Conversion-Driven Architecture:** High-contrast call-to-actions, clear pricing guarantees, and step-by-step vehicle submission forms.
- **Speed Optimization:** Aggressive asset minimization, image optimization, and CDN caching achieving top PageSpeed performance scores.
- **On-Page Local SEO:** Structured schema markup for Dutch automotive services and localized landing page hierarchy.
- **Direct Lead Capture:** Instant WhatsApp and phone inquiry integrations for immediate quotation responses.

### Project Outcome
A conversion-focused web asset that significantly lowered customer acquisition cost and doubled direct online quotation submissions.`,
    thumbnail: "https://i.ibb.co/CpbyLtMx/Screenshot-2026-11-27-183110.png",
    gallery: [
      "https://i.ibb.co/GfxHjxsF/Screenshot-2026-11-27-183124.png",
    ],
    technologies: [
      "WordPress",
      "Elementor Pro",
      "SEO",
      "Speed Optimization",
      "Conversion Optimization",
    ],
    liveUrl: "https://topsloopautoverkopen.nl/",
    githubUrl: "",
    featured: true,
    published: true,
    completionDate: "2026-01-15T00:00:00.000Z",
    order: 5,
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
        limit: 100,
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
        limit: 100,
        totalItems: FALLBACK_PROJECTS.length,
        totalPages: 1,
        hasNextPage: false,
        hasPrevPage: false,
      },
    };
  }
}

/**
 * Fetch featured published projects from the backend or fallback to all real projects.
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
 * Guaranteed to return project data by falling back to Mehedi's real projects if backend is offline.
 */
export async function getProjectBySlug(slug: string): Promise<ProjectItem | null> {
  try {
    const res = await api.get<ProjectItem>(`/api/projects/${encodeURIComponent(slug)}`);
    if (res.data) return res.data;
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      // Check fallback
    }
  }

  // Check fallback array
  const fallback = FALLBACK_PROJECTS.find(
    (p) => p.slug.toLowerCase() === slug.toLowerCase()
  );
  if (fallback) return fallback;

  return null;
}
