import { createFileRoute, Link } from "@tanstack/react-router";
import { Mascot } from "@/components/pickd/Logo";

export const Route = createFileRoute("/sent")({
  head: () => ({
    meta: [
      { title: "almost there — pickd" },
      {
        name: "description",
        content: "Send the message in WhatsApp to place your pickd.",
      },
      { property: "og:title", content: "almost there — pickd" },
      {
        property: "og:description",
        content: "Send the message in WhatsApp to place your pickd.",
      },
      { property: "og:url", content: "/sent" },
      { name: "robots", content: "noindex" },
    ],
    links: [{ rel: "canonical", href: "/sent" }],
  }),
  component: SentPage,
});

function SentPage() {
  return (
    <div className="shell flex min-h-[70vh] flex-col items-center justify-center text-center">
      <Mascot className="h-28 w-28" />
      <h1 className="mt-4 text-2xl font-extrabold lowercase">almost there.</h1>
      <p className="mt-2 max-w-xs text-sm lowercase text-muted-foreground">
        send the message in whatsapp to place your pickd.
      </p>
      <Link
        to="/menu"
        search={{ q: "", cat: "all" }}
        className="mt-6 rounded-full border border-border bg-card px-5 py-3 text-sm font-bold lowercase hover:bg-secondary"
      >
        back to the menu
      </Link>
    </div>
  );
}
