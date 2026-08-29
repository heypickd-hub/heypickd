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

const categoryShortcuts = [
  { id: "most-pickd", label: "popular", emoji: "🔥" },
  { id: "build-combo", label: "combo builder", emoji: "✨" },
  { id: "snacks-chill", label: "snacks & chill", emoji: "🍿" },
  { id: "dinner-under-199", label: "under ₹199", emoji: "💸" },
  { id: "biryani-rice", label: "biryani", emoji: "🍚" },
  { id: "burgers-wraps", label: "burgers", emoji: "🍔" },
  { id: "crispy-grill", label: "crispy & grill", emoji: "🍗" },
  { id: "south-indian", label: "south indian", emoji: "🥞" },
  { id: "veg-picks", label: "veg picks", emoji: "🌱" },
  { id: "drinks-shakes", label: "drinks", emoji: "🥤" },
  { id: "sweet-cravings", label: "dessert", emoji: "🍰" },
];

function Home() {
  const [active, setActive] = useState<Product | null>(null);
  const [askOpen, setAskOpen] = useState(false);
  const open = isOpenNow();
  const { filter } = useFoodFilter();

  const filtered = (items: Product[]) =>
    filter === "all"
      ? items
      : items.filter((p) => (filter === "veg" ? p.foodType === "veg" : p.foodType === "non-veg"));

  const dinnerUnder199 = filtered(
    menu.filter((p) => p.price <= 199 && p.category !== "Drinks & Shakes"),
  );

  return (
    <div className="pb-10">
      {/* 1. Status Banner */}
      <StatusBanner />

      {/* 2. Hero Section */}
      <section className="shell pt-4 pb-2">
        <div className="relative overflow-hidden rounded-3xl border border-border/50 bg-card/45 p-5 sm:p-6 md:p-8">
          <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-butter/5 blur-3xl" />

          <div className="grid items-center gap-6 md:grid-cols-[1.25fr_0.75fr] lg:grid-cols-[1.35fr_0.65fr]">
            <div className="reveal space-y-4 text-left">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-secondary/80 border border-butter-soft/30 px-3.5 py-1.5 text-xs font-bold lowercase text-foreground">
                  ⚡ room delivery
                </span>
                <span className="rounded-full border border-border bg-card px-3.5 py-1.5 text-xs font-bold lowercase">
                  {open ? "🟢 taking orders now" : "⏸ taking a break"}
                </span>
              </div>

              <div className="space-y-2">
                <p className="text-2xl font-black lowercase leading-none text-butter sm:text-3xl">
                  hungry?
                </p>
                <h1 className="text-3xl font-extrabold lowercase leading-tight sm:text-4xl lg:text-5xl tracking-tight text-foreground">
                  we know what's good.
                </h1>
                <p className="max-w-md text-sm leading-relaxed text-muted-foreground lowercase">
                  a few really good picks, delivered straight to your stay.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2.5 pt-1">
                <Link
                  to="/menu"
                  search={{ q: "", cat: "all" }}
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-bold lowercase text-primary-foreground transition-all hover:bg-primary/90 active:scale-[0.98] shadow-md hover:shadow-lg"
                >
                  explore food <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href={`tel:${config.phoneNumber}`}
                  className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-card px-5 py-3.5 text-sm font-bold lowercase transition-all hover:bg-secondary active:scale-[0.98]"
                >
                  <Phone className="h-4 w-4" /> call pickd
                </a>
              </div>
            </div>

            <div className="flex justify-center md:justify-end reveal">
              <div className="relative flex h-32 w-32 items-center justify-center rounded-2xl bg-secondary/35 border border-border/40 p-3 sm:h-40 sm:w-40 md:h-52 md:w-52 lg:h-60 lg:w-60">
                <Mascot className="h-full w-full object-contain" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Primary Action Cards */}
      <section className="shell mt-4 reveal">
        <div className="grid gap-3 sm:grid-cols-3">
          <Link
            to="/menu"
            search={{ q: "", cat: "all" }}
            className="flex items-center justify-between gap-3 rounded-2xl border border-border/75 bg-card p-3.5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[var(--shadow-lift)] hover:border-butter/40"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-butter/10 text-butter shrink-0">
                <Utensils className="h-4.5 w-4.5" />
              </span>
              <div className="space-y-0.5">
                <h3 className="text-sm font-extrabold lowercase text-foreground leading-none">
                  order food
                </h3>
                <p className="text-[11px] text-muted-foreground lowercase">
                  curated nearby favourites
                </p>
              </div>
            </div>
            <ArrowRight className="h-3.5 w-3.5 text-muted-foreground/70 shrink-0" />
          </Link>

          <a
            href="#build-combo"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("build-combo")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="flex items-center justify-between gap-3 rounded-2xl border border-border/75 bg-card p-3.5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[var(--shadow-lift)] hover:border-butter/40"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-butter/10 text-butter shrink-0">
                <Sparkles className="h-4.5 w-4.5" />
              </span>
              <div className="space-y-0.5">
                <h3 className="text-sm font-extrabold lowercase text-foreground leading-none">
                  build combo
                </h3>
                <p className="text-[11px] text-muted-foreground lowercase">
                  snacks, sweets & drinks
                </p>
              </div>
            </div>
            <ArrowRight className="h-3.5 w-3.5 text-muted-foreground/70 shrink-0" />
          </a>

          <button
            onClick={() => {
              track("ask_pickd_clicked");
              setAskOpen(true);
            }}
            className="text-left flex items-center justify-between gap-3 rounded-2xl border border-border/75 bg-card p-3.5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[var(--shadow-lift)] hover:border-butter/40 w-full"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-butter/10 text-butter shrink-0">
                <MessageSquare className="h-4.5 w-4.5" />
              </span>
              <div className="space-y-0.5">
                <h3 className="text-sm font-extrabold lowercase text-foreground leading-none">
                  ask pickd
                </h3>
                <p className="text-[11px] text-muted-foreground lowercase">tell us what you need</p>
              </div>
            </div>
            <ArrowRight className="h-3.5 w-3.5 text-muted-foreground/70 shrink-0" />
          </button>
        </div>
      </section>

      {/* 4. Promotional Banner Rail */}
      <BannerRail />

      {/* 5. Food Category Navigation */}
      <section className="shell mt-8 reveal scroll-mt-20">
        <div className="rounded-2xl border border-border/50 bg-card/45 p-3">
          <p className="text-[10px] font-bold lowercase tracking-wider text-muted-foreground/75 px-1 pb-2">
            browse by category
          </p>
          <div className="no-scrollbar flex gap-2 overflow-x-auto pb-1">
            {categoryShortcuts.map((s) => (
              <button
                key={s.id}
                onClick={() => {
                  track("category_shortcut_clicked", { category: s.id });
                  document
                    .getElementById(s.id)
                    ?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                className="flex items-center gap-1.5 shrink-0 rounded-full border border-border bg-card px-3.5 py-1.5 text-xs font-bold lowercase text-foreground transition-all hover:bg-secondary hover:border-butter/40 active:scale-95 shadow-[var(--shadow-soft)]"
              >
                <span>{s.emoji}</span>
                <span>{s.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Most Pickd */}
      <Section
        id="most-pickd"
        title="most pickd 🔥"
        subtitle="the ones we'd start with."
        items={filtered(mostPickd)}
        onOpen={setActive}
        seeAll={{ cat: "most-pickd" }}
      />

      {/* 7. Build Your Combo */}
      {config.comboEnabled && (
        <section id="build-combo" className="reveal mt-10 scroll-mt-20">
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

      {/* 8. Snacks & Chill */}
      <SnackCombos />

      {/* 9. Dinner Under ₹199 */}
      <Section
        id="dinner-under-199"
        title="dinner under ₹199"
        subtitle="easy on the wallet, big on taste."
        items={dinnerUnder199}
        onOpen={setActive}
      />

      {/* 10. Remaining Food Category Rows */}
      <Section
        id="biryani-rice"
        title="biryani & rice"
        subtitle="the classics, done properly."
        items={filtered(byCategory("Biryani & Rice"))}
        onOpen={setActive}
        seeAll={{ cat: "Biryani & Rice" }}
      />
      <Section
        id="burgers-wraps"
        title="burgers & wraps"
        subtitle="something quick?"
        items={filtered(byCategory("Burgers & Wraps"))}
        onOpen={setActive}
        seeAll={{ cat: "Burgers & Wraps" }}
      />
      <Section
        id="crispy-grill"
        title="crispy & grill"
        subtitle="crunch worth the wait."
        items={filtered([...byCategory("Crispy & Grill"), ...byCategory("Shawarma & Grill")])}
        onOpen={setActive}
        seeAll={{ cat: "Crispy & Grill" }}
      />
      <Section
        id="south-indian"
        title="south indian dinner"
        subtitle="comfort, straight off the tawa."
        items={filtered(byCategory("South Indian Dinner"))}
        onOpen={setActive}
        seeAll={{ cat: "South Indian Dinner" }}
      />
      <Section
        id="veg-picks"
        title="veg picks"
        subtitle="green dot approved."
        items={filtered([...byCategory("Veg Picks"), ...menu.filter((p) => p.id === "p29")])}
        onOpen={setActive}
        seeAll={{ cat: "Veg Picks" }}
      />
      <Section
        id="drinks-shakes"
        title="drinks & shakes"
        subtitle="cold things that help."
        items={filtered(byCategory("Drinks & Shakes"))}
        onOpen={setActive}
        seeAll={{ cat: "Drinks & Shakes" }}
      />
      <Section
        id="sweet-cravings"
        title="sweet cravings"
        subtitle="finish it right."
        items={filtered([...byCategory("Sweet Cravings"), ...menu.filter((p) => p.id === "p33")])}
        onOpen={setActive}
        seeAll={{ cat: "Sweet Cravings" }}
      />

      {/* 11. Ask Pickd Section */}
      {config.askPickdEnabled && <AskPickdSection />}

      <ProductSheet product={active} onClose={() => setActive(null)} />
      <AskPickdModal open={askOpen} onOpenChange={setAskOpen} />
    </div>
  );
}
