import type { Metadata } from "next";
import { MessageSquareQuote } from "lucide-react";
import { ComingSoon } from "@/components/admin/coming-soon";

export const metadata: Metadata = {
  title: "Client Reviews Management | Admin Portal",
};

export default function AdminReviewsPage() {
  return (
    <ComingSoon
      title="Client Reviews Management"
      description="Client testimonials moderation, approval workflow, and rating controls will be delivered in Phase 07D."
      phase="Phase 07D"
      icon={<MessageSquareQuote className="w-8 h-8 text-cyan-400" />}
    />
  );
}
