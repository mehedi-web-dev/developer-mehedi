import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { checkAdminAuthorization } from "@/lib/auth/server";
import { ReviewsManager } from "@/components/admin/reviews";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Reviews Management | Admin Portal",
  description: "Moderate client testimonials, review ratings, and homepage showcase states.",
};

export default async function AdminReviewsPage() {
  const authCheck = await checkAdminAuthorization();

  if (authCheck.status === "unauthenticated") {
    redirect("/login");
  }

  if (authCheck.status === "unauthorized") {
    redirect("/login?reason=unauthorized");
  }

  return <ReviewsManager />;
}
