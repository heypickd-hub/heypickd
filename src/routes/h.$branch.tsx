import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { useCart } from "@/lib/cart";

export const Route = createFileRoute("/h/$branch")({
  head: () => ({
    meta: [
      { title: "pickd — good food, pickd for you" },
      {
        name: "description",
        content: "Curated food delivered straight to your hotel stay.",
      },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: BranchPage,
});

function BranchPage() {
  const { branch: slug } = Route.useParams();
  const { setBranch } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const pretty = slug
      .split("-")
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" ");
    setBranch(pretty);
    navigate({ to: "/", replace: true });
  }, [slug, setBranch, navigate]);

  return (
    <div className="shell flex min-h-[50vh] items-center justify-center">
      <p className="text-sm lowercase text-muted-foreground">setting up your stay…</p>
    </div>
  );
}
