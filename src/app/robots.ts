import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/seo";

/**
 * Next.js App Router robots.txt configuration.
 * Permits crawling of public portfolio pages while disallowing private admin/login portals.
 */
export default function robots(): MetadataRoute.Robots {
  const siteUrl = getSiteUrl();

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin",
          "/admin/*",
          "/login",
          "/api/*",
        ],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
