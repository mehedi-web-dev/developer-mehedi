/**
 * Centralized SEO configuration and metadata helpers for Mehedi Hasan Portfolio.
 */

export function getSiteUrl(): string {
  const url = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  return url.replace(/\/$/, "");
}

export const SEO_CONFIG = {
  name: "Mehedi Hasan",
  jobTitle: "WordPress & Frontend Developer",
  shortDescription:
    "Mehedi Hasan is a professional WordPress and Frontend Developer with 3+ years of experience and 80+ completed projects specializing in custom WordPress themes, Elementor Pro, WooCommerce, React, and Next.js.",
  description:
    "Professional portfolio of Mehedi Hasan, a WordPress and Frontend Developer based in Bangladesh with 3+ years of experience and 80+ delivered projects. Specializing in custom WordPress development, Elementor Pro websites, WooCommerce solutions, and modern React/Next.js frontend engineering.",
  locale: "en_US",
  language: "en",
  location: "Bangladesh",
  sameAs: [
    "https://github.com/mehedi-web-dev",
    "https://www.linkedin.com/in/mehedi-hasan-dev81/",
    "https://mehedihasanbd.com",
  ],
  keywords: [
    "Mehedi Hasan",
    "WordPress Developer",
    "Frontend Developer",
    "WordPress Customization",
    "Elementor Pro Developer",
    "WooCommerce Specialist",
    "React Developer",
    "Next.js Developer",
    "Full-Stack Web Developer",
    "Web Developer Bangladesh",
    "Portfolio",
  ],
};

/**
 * Returns safe Person schema for JSON-LD structured data.
 */
export function getPersonJsonLd() {
  const siteUrl = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: SEO_CONFIG.name,
    jobTitle: SEO_CONFIG.jobTitle,
    url: siteUrl,
    sameAs: SEO_CONFIG.sameAs,
    description: SEO_CONFIG.shortDescription,
    nationality: {
      "@type": "Country",
      name: SEO_CONFIG.location,
    },
    knowsAbout: [
      "WordPress",
      "Elementor Pro",
      "WooCommerce",
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Full-Stack Web Development",
    ],
  };
}

/**
 * Returns safe WebSite schema for JSON-LD structured data.
 */
export function getWebSiteJsonLd() {
  const siteUrl = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: `${SEO_CONFIG.name} — Portfolio`,
    url: siteUrl,
    description: SEO_CONFIG.description,
    inLanguage: SEO_CONFIG.language,
    publisher: {
      "@type": "Person",
      name: SEO_CONFIG.name,
      url: siteUrl,
    },
  };
}
