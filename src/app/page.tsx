import type { Metadata } from "next";
import {
  HeroSection,
  AboutSection,
  SkillsSection,
  ServicesPreviewSection,
  ProjectsPreviewSection,
  ExperienceEducationSection,
  ReviewsSection,
  FAQSection,
  ContactSection,
} from "@/components/sections";

export const metadata: Metadata = {
  title: "Mehedi Hasan | WordPress & Frontend Developer",
  description:
    "Mehedi Hasan is a WordPress and Frontend Developer specializing in WordPress, Elementor, React and Next.js.",
};

export default function Home() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ServicesPreviewSection />
      <ProjectsPreviewSection />
      <ExperienceEducationSection />
      <ReviewsSection />
      <FAQSection />
      <ContactSection />
    </div>
  );
}
