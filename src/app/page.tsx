import type { Metadata } from "next";
import {
  HeroSection,
  AboutSection,
  SkillsSection,
  ServicesPreviewSection,
  DevelopmentProcessSection,
  ProjectsPreviewSection,
  ExperienceEducationSection,
  ReviewsSection,
  FAQSection,
  ContactSection,
} from "@/components/sections";
import { getSiteSettings, getFeaturedProjects } from "@/services";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Mehedi Hasan | WordPress & Frontend Developer",
  description:
    "Explore 80+ completed WordPress and modern frontend web projects by Mehedi Hasan. Specializing in custom themes, Elementor Pro, WooCommerce, React, and Next.js.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Mehedi Hasan | WordPress & Frontend Developer",
    description:
      "Explore 80+ completed WordPress and modern frontend web projects by Mehedi Hasan. Specializing in custom themes, Elementor Pro, WooCommerce, React, and Next.js.",
    url: "/",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mehedi Hasan | WordPress & Frontend Developer",
    description:
      "Explore 80+ completed WordPress and modern frontend web projects by Mehedi Hasan. Specializing in custom themes, Elementor Pro, WooCommerce, React, and Next.js.",
  },
};

export default async function Home() {
  const [siteSettings, initialProjects] = await Promise.all([
    getSiteSettings(),
    getFeaturedProjects().catch(() => null),
  ]);

  return (
    <div className="flex flex-col">
      <HeroSection siteSettings={siteSettings} />
      <AboutSection siteSettings={siteSettings} />
      <SkillsSection />
      <ServicesPreviewSection />
      <DevelopmentProcessSection />
      <ProjectsPreviewSection initialProjects={initialProjects} />
      <ExperienceEducationSection />
      <ReviewsSection />
      <FAQSection />
      <ContactSection />
    </div>
  );
}
