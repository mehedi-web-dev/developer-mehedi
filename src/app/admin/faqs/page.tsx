import type { Metadata } from "next";
import { HelpCircle } from "lucide-react";
import { ComingSoon } from "@/components/admin/coming-soon";

export const metadata: Metadata = {
  title: "FAQs Management | Admin Portal",
};

export default function AdminFAQsPage() {
  return (
    <ComingSoon
      title="FAQs Management"
      description="Frequently asked questions editor, reordering, and visibility controls will be delivered in Phase 07D."
      phase="Phase 07D"
      icon={<HelpCircle className="w-8 h-8 text-cyan-400" />}
    />
  );
}
