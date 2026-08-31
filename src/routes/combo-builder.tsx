import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { ComboBuilder } from "@/components/pickd/ComboBuilder";

export const Route = createFileRoute("/combo-builder")({
  head: () => ({
    meta: [
      { title: "build your combo — pickd" },
      {
        name: "description",
        content:
          "Pick your snacks, sweets and drinks to build your own custom combo, delivered straight to your stay.",
      },
      { property: "og:title", content: "build your combo — pickd" },
      {
        property: "og:description",
        content: "Pick your snacks, sweets and drinks to build your own custom combo.",
      },
      { property: "og:url", content: "/combo-builder" },
    ],
    links: [{ rel: "canonical", href: "/combo-builder" }],
  }),
  component: ComboBuilderPage,
});

function ComboBuilderPage() {
  return (
    <div className="pb-24 pt-6">
      <div className="shell space-y-6">
        {/* Back Link */}
        <div>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-semibold lowercase text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> back to home
          </Link>
        </div>

        {/* Page Title & Subtitle */}
        <div className="space-y-1">
          <h1 className="text-2xl font-extrabold lowercase sm:text-3xl">build your combo</h1>
          <p className="text-sm lowercase text-muted-foreground">
            pick your snacks, sweets and drinks.
          </p>
        </div>

        {/* Combo Builder Component */}
        <div>
          <ComboBuilder />
        </div>
      </div>
    </div>
  );
}
