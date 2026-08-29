import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Phone, Utensils, Sparkles, MessageSquare } from "lucide-react";
import { useState } from "react";
import { BannerRail } from "@/components/pickd/BannerRail";
import { Mascot } from "@/components/pickd/Logo";
import { ProductSheet } from "@/components/pickd/ProductSheet";
import { Section } from "@/components/pickd/Section";
import { StatusBanner } from "@/components/pickd/StatusBanner";
import { config, isOpenNow } from "@/config";
import { byCategory, menu, mostPickd, type Product } from "@/data/menu";
import { useFoodFilter } from "@/lib/veg-filter";
import { ComboBuilder } from "@/components/pickd/ComboBuilder";
import { SnackCombos } from "@/components/pickd/SnackCombos";
import { AskPickdSection, AskPickdModal } from "@/components/pickd/AskPickd";
import { track } from "@/lib/analytics";

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
  const [askOpen, setAskOpen] = useState(false);
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

      {/* 3 Primary Action Cards */}
      <section className="shell mt-6 reveal">
        <div className="grid gap-3.5 sm:grid-cols-3">
          {/* Card 1: Order Food */}
          <Link
            to="/menu"
            search={{ q: "", cat: "all" }}
            className="flex items-center justify-between gap-4 rounded-2xl border border-border/70 bg-card p-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[var(--shadow-lift)]"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-butter/10 text-butter shrink-0">
                <Utensils className="h-5 w-5" />
              </span>
              <div className="space-y-0.5">
                <h3 className="text-sm font-extrabold lowercase text-foreground leading-snug">order food</h3>
                <p className="text-xs text-muted-foreground lowercase">curated nearby favourites</p>
              </div>
            </div>
            <ArrowRight className="h-4 w-4 text-muted-foreground/75 shrink-0" />
          </Link>

          {/* Card 2: Build a Combo */}
          <a
            href="#build-combo"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("build-combo")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="flex items-center justify-between gap-4 rounded-2xl border border-border/70 bg-card p-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[var(--shadow-lift)]"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-butter/10 text-butter shrink-0">
                <Sparkles className="h-5 w-5" />
              </span>
              <div className="space-y-0.5">
                <h3 className="text-sm font-extrabold lowercase text-foreground leading-snug">build a combo</h3>
                <p className="text-xs text-muted-foreground lowercase">snacks, sweets & drinks</p>
              </div>
            </div>
            <ArrowRight className="h-4 w-4 text-muted-foreground/75 shrink-0" />
          </a>

          {/* Card 3: Ask Pickd */}
          <button
            onClick={() => {
              track("ask_pickd_clicked");
              setAskOpen(true);
            }}
            className="text-left flex items-center justify-between gap-4 rounded-2xl border border-border/70 bg-card p-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[var(--shadow-lift)] w-full"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-butter/10 text-butter shrink-0">
                <MessageSquare className="h-5 w-5" />
              </span>
              <div className="space-y-0.5">
                <h3 className="text-sm font-extrabold lowercase text-foreground leading-snug">ask pickd</h3>
                <p className="text-xs text-muted-foreground lowercase">tell us what you need</p>
              </div>
            </div>
            <ArrowRight className="h-4 w-4 text-muted-foreground/75 shrink-0" />
          </button>
        </div>
      </section>

      <BannerRail />

      <Section
        title="most pickd 🔥"
        subtitle="the ones we'd start with."
        items={filtered(mostPickd)}
        onOpen={setActive}
        seeAll={{ cat: "most-pickd" }}
      />

      {/* Build Your Combo Section */}
      {config.comboEnabled && (
        <section id="build-combo" className="reveal mt-10">
          <div className="shell">
            <h2 className="text-xl font-extrabold lowercase sm:text-2xl">build your combo</h2>
            <p className="mt-0.5 text-sm lowercase text-muted-foreground">
              pick your snacks. make it yours.
            </p>
            <div className="mt-4">
              <ComboBuilder />
            </div>
          </div>
        </section>
      )}

      {/* Snacks & Chill Section */}
      <SnackCombos />

      <Section
        title="dinner under ₹199"
        subtitle="easy on the wallet, big on taste."
        items={dinnerUnder199}
        onOpen={setActive}
      />
      <Section
        title="biryani & rice"
        subtitle="the classics, done properly."
        items={filtered(byCategory("Biryani & Rice"))}
        onOpen={setActive}
        seeAll={{ cat: "Biryani & Rice" }}
      />
      <Section
        title="burgers & wraps"
        subtitle="something quick?"
        items={filtered(byCategory("Burgers & Wraps"))}
        onOpen={setActive}
        seeAll={{ cat: "Burgers & Wraps" }}
      />
      <Section
        title="crispy & grill"
        subtitle="crunch worth the wait."
        items={filtered([...byCategory("Crispy & Grill"), ...byCategory("Shawarma & Grill")])}
        onOpen={setActive}
        seeAll={{ cat: "Crispy & Grill" }}
      />
      <Section
        title="south indian dinner"
        subtitle="comfort, straight off the tawa."
        items={filtered(byCategory("South Indian Dinner"))}
        onOpen={setActive}
        seeAll={{ cat: "South Indian Dinner" }}
      />
      <Section
        title="veg picks"
        subtitle="green dot approved."
        items={filtered([...byCategory("Veg Picks"), ...menu.filter((p) => p.id === "p29")])}
        onOpen={setActive}
        seeAll={{ cat: "Veg Picks" }}
      />
      <Section
        title="drinks & shakes"
        subtitle="cold things that help."
        items={filtered(byCategory("Drinks & Shakes"))}
        onOpen={setActive}
        seeAll={{ cat: "Drinks & Shakes" }}
      />
      <Section
        title="sweet cravings"
        subtitle="finish it right."
        items={filtered([...byCategory("Sweet Cravings"), ...menu.filter((p) => p.id === "p33")])}
        onOpen={setActive}
        seeAll={{ cat: "Sweet Cravings" }}
      />

      {/* Ask Pickd Section */}
      {config.askPickdEnabled && <AskPickdSection />}

      <ProductSheet product={active} onClose={() => setActive(null)} />
      <AskPickdModal open={askOpen} onOpenChange={setAskOpen} />
    </div>
  );
}
