import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/seo";
import { getProjects } from "@/services/projects.service";

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
      url: `${siteUrl}/services`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/portfolio`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];

  let projectRoutes: MetadataRoute.Sitemap = [];

  try {
    const res = await getProjects({ limit: 100 });
    const publishedProjects = (res.projects || []).filter(
      (p) => p.published !== false && p.slug
    );

    projectRoutes = publishedProjects.map((project) => {
      let lastModified: Date | undefined;
      if (project.completionDate) {
        const d = new Date(project.completionDate);
        if (!isNaN(d.getTime())) {
          lastModified = d;
        }
      }

      return {
        url: `${siteUrl}/portfolio/${encodeURIComponent(project.slug)}`,
        ...(lastModified ? { lastModified } : {}),
        changeFrequency: "monthly" as const,
        priority: project.featured ? 0.8 : 0.7,
      };
    });
  } catch (error) {
    console.error("[Sitemap] Failed to retrieve published projects:", error);
  }

  return [...staticRoutes, ...projectRoutes];
}
