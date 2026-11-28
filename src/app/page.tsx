import type { Metadata } from "next";
import {
  HeroSection,
  ExpectationsSection,
  AboutSection,
  ServicesPreviewSection,
  ProjectsPreviewSection,
  ReviewsSection,
  FAQSection,
  ContactSection,
} from "@/components/sections";
import { getSiteSettings, getFeaturedProjects } from "@/services";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Mehedi Hasan | Digital Developer & WordPress Specialist",
  description:
    "Explore high-performance WordPress, Elementor Pro, React, and Next.js web applications by Mehedi Hasan. Guaranteed fast delivery, clean architecture, and conversion-focused design.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Mehedi Hasan | Digital Developer & WordPress Specialist",
    description:
      "Explore high-performance WordPress, Elementor Pro, React, and Next.js web applications by Mehedi Hasan.",
    url: "/",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mehedi Hasan | Digital Developer & WordPress Specialist",
    description:
      "Explore high-performance WordPress, Elementor Pro, React, and Next.js web applications by Mehedi Hasan.",
  },
};

export default async function Home() {
  const [siteSettings, initialProjects] = await Promise.all([
    getSiteSettings().catch(() => null),
    getFeaturedProjects().catch(() => null),
  ]);

  return (
    <div className="flex flex-col bg-[#0c0d0e] text-[#f4f4f5] selection:bg-[#c6ff00] selection:text-black">
      <HeroSection siteSettings={siteSettings} />
      <ExpectationsSection />
      <AboutSection siteSettings={siteSettings} />
      <ServicesPreviewSection />
      <ProjectsPreviewSection initialProjects={initialProjects} />
      <ReviewsSection />
      <FAQSection />
      <ContactSection />
    </div>
  );
}
