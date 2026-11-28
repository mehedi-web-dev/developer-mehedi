import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/seo";
import { FALLBACK_PROJECTS } from "@/services/projects.service";

/**
 * Dynamic Next.js App Router sitemap generation.
 * Generates canonical XML sitemap for public, indexable pages.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = getSiteUrl();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${siteUrl}/#about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/#portfolio-preview`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];

  const projectRoutes: MetadataRoute.Sitemap = FALLBACK_PROJECTS.map((project) => ({
    url: `${siteUrl}/portfolio/${encodeURIComponent(project.slug)}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...projectRoutes];
}
