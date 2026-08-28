import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Phone } from "lucide-react";
import { useState } from "react";
import { BannerRail } from "@/components/pickd/BannerRail";
import { Mascot } from "@/components/pickd/Logo";
import { ProductSheet } from "@/components/pickd/ProductSheet";
import { Section } from "@/components/pickd/Section";
import { StatusBanner } from "@/components/pickd/StatusBanner";
import { config, isOpenNow } from "@/config";
import { byCategory, menu, mostPickd, type Product } from "@/data/menu";
import { useFoodFilter } from "@/lib/veg-filter";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "pickd — good food, pickd for you" },
      {
        name: "description",
        content:
          "Curated food, snacks and drinks delivered straight to your hotel stay. Order in seconds on WhatsApp.",
      },
      { property: "og:title", content: "pickd — good food, pickd for you" },
      {
        property: "og:description",
        content: "Curated food, snacks and drinks delivered straight to your hotel stay.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

function Home() {
  const [active, setActive] = useState<Product | null>(null);
  const open = isOpenNow();
  const { filter } = useFoodFilter();

  const filtered = (items: Product[]) =>
    filter === "all"
      ? items
      : items.filter((p) =>
          filter === "veg" ? p.foodType === "veg" : p.foodType === "non-veg",
        );

  const dinnerUnder199 = filtered(
    menu.filter((p) => p.price <= 199 && p.category !== "Drinks & Shakes"),
  );

  return (
    <div className="pb-10">
      <StatusBanner />

      <section className="shell pt-6">
        <div className="grid items-center gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="reveal">
            <p className="text-3xl font-extrabold lowercase leading-tight sm:text-4xl">
              hungry?
            </p>
            <h1 className="text-3xl font-extrabold lowercase leading-tight sm:text-5xl">
              we know what's good.
            </h1>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">
              a few really good picks, delivered straight to your stay.
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-2.5">
              <Link
                to="/menu"
                search={{ q: "", cat: "all" }}
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-bold lowercase text-primary-foreground transition-transform active:scale-[0.98]"
              >
                explore food <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href={`tel:${config.phoneNumber}`}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-3.5 text-sm font-bold lowercase transition-colors hover:bg-secondary"
              >
                <Phone className="h-4 w-4" /> call pickd
              </a>
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-secondary px-3.5 py-1.5 text-xs font-semibold lowercase">
                room delivery • easy ordering • good food
              </span>
              <span className="rounded-full border border-border bg-card px-3.5 py-1.5 text-xs font-semibold lowercase">
                {open ? "🟢 taking orders now" : "⏸ taking a break"}
              </span>
            </div>
          </div>

          <div className="order-first flex justify-center lg:order-none">
            <Mascot className="h-32 w-32 sm:h-40 sm:w-40 lg:h-64 lg:w-64" />
          </div>
        </div>
      </section>

      <BannerRail />

      <Section
        title="most pickd 🔥"
        subtitle="the ones we'd start with."
        items={mostPickd}
        onOpen={setActive}
        seeAll={{ cat: "most-pickd" }}
      />
      <Section
        title="dinner under ₹199"
        subtitle="easy on the wallet, big on taste."
        items={dinnerUnder199}
        onOpen={setActive}
      />
      <Section
        title="biryani & rice"
        subtitle="the classics, done properly."
        items={byCategory("Biryani & Rice")}
        onOpen={setActive}
        seeAll={{ cat: "Biryani & Rice" }}
      />
      <Section
        title="burgers & wraps"
        subtitle="something quick?"
        items={byCategory("Burgers & Wraps")}
        onOpen={setActive}
        seeAll={{ cat: "Burgers & Wraps" }}
      />
      <Section
        title="crispy & grill"
        subtitle="crunch worth the wait."
        items={[...byCategory("Crispy & Grill"), ...byCategory("Shawarma & Grill")]}
        onOpen={setActive}
        seeAll={{ cat: "Crispy & Grill" }}
      />
      <Section
        title="south indian dinner"
        subtitle="comfort, straight off the tawa."
        items={byCategory("South Indian Dinner")}
        onOpen={setActive}
        seeAll={{ cat: "South Indian Dinner" }}
      />
      <Section
        title="veg picks"
        subtitle="green dot approved."
        items={[...byCategory("Veg Picks"), ...menu.filter((p) => p.id === "p29")]}
        onOpen={setActive}
        seeAll={{ cat: "Veg Picks" }}
      />
      <Section
        title="drinks & shakes"
        subtitle="cold things that help."
        items={byCategory("Drinks & Shakes")}
        onOpen={setActive}
        seeAll={{ cat: "Drinks & Shakes" }}
      />
      <Section
        title="sweet cravings"
        subtitle="finish it right."
        items={[...byCategory("Sweet Cravings"), ...menu.filter((p) => p.id === "p33")]}
        onOpen={setActive}
        seeAll={{ cat: "Sweet Cravings" }}
      />

      <ProductSheet product={active} onClose={() => setActive(null)} />
    </div>
  );
}
