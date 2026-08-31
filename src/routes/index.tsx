import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Phone, Utensils, Sparkles, MessageSquare } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { BannerRail } from "@/components/pickd/BannerRail";
import { Mascot } from "@/components/pickd/Logo";
import { ProductSheet } from "@/components/pickd/ProductSheet";
import { Section } from "@/components/pickd/Section";
import { StatusBanner } from "@/components/pickd/StatusBanner";
import { config, isOpenNow } from "@/config";
import { byCategory, menu, mostPickd, underBudget, type Product } from "@/data/menu";
import { useFoodFilter } from "@/lib/veg-filter";
import { SnackCombos } from "@/components/pickd/SnackCombos";
import { AskPickdSection, AskPickdModal } from "@/components/pickd/AskPickd";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";

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
  { id: "popular", label: "popular", emoji: "🔥" },
  { id: "build-combo", label: "combo builder", emoji: "✨" },
  { id: "snacks-and-chill", label: "snacks & chill", emoji: "🍿" },
  { id: "under-199", label: "under ₹199", emoji: "💸" },
  { id: "biryani", label: "biryani", emoji: "🍚" },
  { id: "burgers", label: "burgers", emoji: "🍔" },
  { id: "crispy-and-grill", label: "crispy & grill", emoji: "🍗" },
  { id: "south-indian", label: "south indian", emoji: "🥞" },
  { id: "veg-picks", label: "veg picks", emoji: "🌱" },
  { id: "drinks", label: "drinks", emoji: "🥤" },
  { id: "desserts", label: "desserts", emoji: "🍰" },
];

function Home() {
  const [active, setActive] = useState<Product | null>(null);
  const [askOpen, setAskOpen] = useState(false);
  const open = isOpenNow();
  const { filter } = useFoodFilter();

  const [activeSection, setActiveSection] = useState<string>("popular");
  const isScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const sectionIds = [
      "popular",
      "non-veg-favourites",
      "veg-picks",
      "biryani",
      "burgers",
      "crispy-and-grill",
      "south-indian",
      "snacks-and-chill",
      "under-199",
      "drinks",
      "shakes-coolers",
      "desserts",
    ];

    const observerOptions = {
      root: null,
      rootMargin: "-120px 0px -60% 0px",
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      if (isScrollingRef.current) return;

      const visibleEntry = entries.find((entry) => entry.isIntersecting);
      if (visibleEntry) {
        setActiveSection(visibleEntry.target.id);
      }
    }, observerOptions);

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

  const handleCategoryClick = (id: string) => {
    track("category_shortcut_clicked", { category: id });
    setActiveSection(id);

    isScrollingRef.current = true;
    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);

    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    scrollTimeoutRef.current = setTimeout(() => {
      isScrollingRef.current = false;
    }, 800);
  };

  const filtered = (items: Product[]) =>
    filter === "all"
      ? items
      : items.filter((p) => (filter === "veg" ? p.foodType === "veg" : p.foodType === "non-veg"));

  const LIMIT = 8;

  // 1. Most Pickd 🔥
  const mostPickdList = filtered(mostPickd);

  // 2. Non-Veg Favourites
  const nonVegFavouritesList = filtered(menu.filter((p) => p.foodType === "non-veg"));

  // 3. Veg Favourites
  const vegFavouritesList = filtered(menu.filter((p) => p.foodType === "veg"));

  // 4. Biryani & Rice
  const biryaniList = filtered(byCategory("Biryani & Rice"));

  // 5. Burgers, Wraps & Quick Bites
  const burgersWrapsQuickBitesList = filtered(
    menu.filter(
      (p) =>
        p.category === "Burgers & Wraps" ||
        p.keywords.includes("pizza") ||
        p.name.toLowerCase().includes("pizza"),
    ),
  );

  // 6. Crispy & Grill
  const crispyGrillList = filtered(
    menu.filter((p) => p.category === "Crispy & Grill" || p.category === "Shawarma & Grill"),
  );

  // 7. South Indian Favourites
  const southIndianList = filtered(byCategory("South Indian Dinner"));

  // 8. Snacks & Chocolates
  const snacksChocolatesList = filtered(byCategory("Snacks & Chocolates"));

  // 9. Dinner Under ₹199
  const dinnerUnder199List = filtered(underBudget(199)).filter(
    (p) =>
      p.category !== "Drinks & Shakes" &&
      p.category !== "Sweet Cravings" &&
      p.category !== "Snacks & Chocolates",
  );

  // 10. Drinks & Coffee
  const drinksAndCoffeeList = filtered(
    menu.filter((p) => {
      const name = p.name.toLowerCase();
      const keywords = p.keywords;
      return (
        (p.category === "Drinks & Shakes" &&
          (name.includes("coffee") ||
            name.includes("tea") ||
            name.includes("water") ||
            name.includes("juice") ||
            name.includes("cola") ||
            name.includes("soda") ||
            keywords.includes("coffee") ||
            keywords.includes("water") ||
            keywords.includes("soda"))) ||
        (p.id.startsWith("s-") &&
          ((s) =>
            s.name === "Coca-Cola" ||
            s.name === "Sprite" ||
            s.name === "Fanta" ||
            s.name === "Water")(p)) ||
        (p.id.startsWith("x-") && ((s) => s.name === "water" || s.name === "extra drink")(p))
      );
    }),
  );

  // 11. Shakes & Coolers
  const shakesAndCoolersList = filtered(
    menu.filter((p) => {
      const name = p.name.toLowerCase();
      return (
        p.category === "Drinks & Shakes" &&
        (name.includes("shake") ||
          name.includes("mojito") ||
          name.includes("falooda") ||
          name.includes("cooler") ||
          name.includes("smoothie"))
      );
    }),
  );

  // 12. Sweet Cravings
  const sweetCravingsList = filtered(byCategory("Sweet Cravings"));

  return (
    <div className="pb-10">
      {/* 1. Status Banner */}
      <StatusBanner />

      {/* 2. Hero Section */}
      <section className="shell pt-4 pb-2">
        <div className="relative overflow-hidden rounded-3xl border border-border/50 bg-card/45 p-4 sm:p-6 md:p-8">
          <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-butter/5 blur-3xl" />

          <div className="grid grid-cols-[1.55fr_0.65fr] md:grid-cols-[1.25fr_0.75fr] lg:grid-cols-[1.35fr_0.65fr] items-center gap-3 sm:gap-6">
            <div className="reveal space-y-3 sm:space-y-4 text-left min-w-0">
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                <span className="rounded-full bg-secondary/80 border border-butter-soft/30 px-3 py-1 sm:px-3.5 sm:py-1.5 text-[10px] min-[375px]:text-xs font-bold lowercase text-foreground">
                  ⚡ room delivery
                </span>
                <span className="rounded-full border border-border bg-card px-3 py-1 sm:px-3.5 sm:py-1.5 text-[10px] min-[375px]:text-xs font-bold lowercase">
                  {open ? "🟢 taking orders now" : "⏸ taking a break"}
                </span>
              </div>

              <div className="space-y-1 sm:space-y-2">
                <p className="text-xl min-[375px]:text-2xl sm:text-3xl font-black lowercase leading-none text-butter">
                  hungry?
                </p>
                <h1 className="text-2xl min-[375px]:text-3xl sm:text-4xl lg:text-5xl font-extrabold lowercase leading-tight tracking-tight text-foreground">
                  we know what's good.
                </h1>
                <p className="max-w-md text-xs sm:text-sm leading-relaxed text-muted-foreground lowercase">
                  a few really good picks, delivered straight to your stay.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2.5 pt-1">
                <Link
                  to="/menu"
                  search={{ q: "", cat: "all" }}
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2.5 sm:px-6 sm:py-3.5 text-xs sm:text-sm font-bold lowercase text-primary-foreground transition-all hover:bg-primary/90 active:scale-[0.98] shadow-md hover:shadow-lg"
                >
                  explore food <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href={`tel:${config.phoneNumber}`}
                  className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-card px-4 py-2.5 sm:px-5 sm:py-3.5 text-xs sm:text-sm font-bold lowercase transition-all hover:bg-secondary active:scale-[0.98]"
                >
                  <Phone className="h-4 w-4" /> call pickd
                </a>
              </div>
            </div>

            <div className="flex justify-end reveal justify-self-end">
              <div className="relative flex items-center justify-center">
                <Mascot className="w-[clamp(88px,26vw,240px)] h-auto object-contain" />
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

          <Link
            to="/combo-builder"
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
          </Link>

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
      <section className="shell mt-8 reveal scroll-mt-20" aria-label="Browse by category">
        <div className="rounded-2xl border border-border/50 bg-card/45 p-3">
          <h2 className="text-[10px] font-bold lowercase tracking-wider text-muted-foreground/75 px-1 pb-2">
            browse by category
          </h2>
          <div className="no-scrollbar flex gap-2 overflow-x-auto pb-0.5 px-1">
            {categoryShortcuts.map((s) => {
              const isActive = activeSection === s.id;
              if (s.id === "build-combo") {
                return (
                  <Link
                    key={s.id}
                    to="/combo-builder"
                    onClick={() => {
                      track("category_shortcut_clicked", { category: s.id });
                    }}
                    className="flex min-h-[44px] items-center gap-1.5 shrink-0 rounded-full border border-border bg-card px-4 py-2.5 text-xs font-bold lowercase text-foreground transition-all hover:bg-secondary hover:border-butter/40 focus-visible:ring-2 focus-visible:ring-butter focus-visible:outline-none active:scale-95 shadow-[var(--shadow-soft)]"
                  >
                    <span role="img" aria-hidden="true">
                      {s.emoji}
                    </span>
                    <span>{s.label}</span>
                  </Link>
                );
              }
              return (
                <button
                  key={s.id}
                  onClick={() => handleCategoryClick(s.id)}
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                    "flex min-h-[44px] items-center gap-1.5 shrink-0 rounded-full border px-4 py-2.5 text-xs font-bold lowercase transition-all focus-visible:ring-2 focus-visible:ring-butter focus-visible:outline-none active:scale-95 shadow-[var(--shadow-soft)] cursor-pointer",
                    isActive
                      ? "border-transparent bg-primary text-primary-foreground"
                      : "border-border bg-card text-foreground hover:bg-secondary hover:border-butter/40",
                  )}
                >
                  <span role="img" aria-hidden="true">
                    {s.emoji}
                  </span>
                  <span>{s.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. Food Sections */}
      <Section
        id="popular"
        title="most pickd 🔥"
        subtitle="the ones we'd start with."
        items={mostPickdList.slice(0, LIMIT)}
        onOpen={setActive}
        seeAll={mostPickdList.length > LIMIT ? { cat: "most-pickd" } : undefined}
      />

      <Section
        id="non-veg-favourites"
        title="non-veg favourites 🍗"
        subtitle="bold flavours, cooked to perfection."
        items={nonVegFavouritesList.slice(0, LIMIT)}
        onOpen={setActive}
        seeAll={nonVegFavouritesList.length > LIMIT ? { cat: "non-veg-favourites" } : undefined}
      />

      <Section
        id="veg-picks"
        title="veg favourites 🌱"
        subtitle="delicious vegetarian picks."
        items={vegFavouritesList.slice(0, LIMIT)}
        onOpen={setActive}
        seeAll={vegFavouritesList.length > LIMIT ? { cat: "veg-favourites" } : undefined}
      />

      <Section
        id="biryani"
        title="biryani & rice 🍚"
        subtitle="the classics, done properly."
        items={biryaniList.slice(0, LIMIT)}
        onOpen={setActive}
        seeAll={biryaniList.length > LIMIT ? { cat: "biryani-rice" } : undefined}
      />

      <Section
        id="burgers"
        title="burgers, wraps & quick bites 🍔"
        subtitle="something quick and tasty."
        items={burgersWrapsQuickBitesList.slice(0, LIMIT)}
        onOpen={setActive}
        seeAll={
          burgersWrapsQuickBitesList.length > LIMIT
            ? { cat: "burgers-wraps-quick-bites" }
            : undefined
        }
      />

      <Section
        id="crispy-and-grill"
        title="crispy & grill 🍗"
        subtitle="crunch worth the wait."
        items={crispyGrillList.slice(0, LIMIT)}
        onOpen={setActive}
        seeAll={crispyGrillList.length > LIMIT ? { cat: "crispy-grill-custom" } : undefined}
      />

      <Section
        id="south-indian"
        title="south indian favourites 🥞"
        subtitle="comfort, straight off the tawa."
        items={southIndianList.slice(0, LIMIT)}
        onOpen={setActive}
        seeAll={southIndianList.length > LIMIT ? { cat: "south-indian" } : undefined}
      />

      <Section
        id="snacks-and-chill"
        title="snacks & chocolates 🍿"
        subtitle="quick bites and sweet cravings."
        items={snacksChocolatesList.slice(0, LIMIT)}
        onOpen={setActive}
        seeAll={snacksChocolatesList.length > LIMIT ? { cat: "snacks-chocolates" } : undefined}
      />

      <Section
        id="under-199"
        title="dinner under ₹199 💸"
        subtitle="easy on the wallet, big on taste."
        items={dinnerUnder199List.slice(0, LIMIT)}
        onOpen={setActive}
        seeAll={dinnerUnder199List.length > LIMIT ? { cat: "dinner-under-199" } : undefined}
      />

      <Section
        id="drinks"
        title="drinks & coffee 🥤"
        subtitle="refreshing soft drinks and warm coffee."
        items={drinksAndCoffeeList.slice(0, LIMIT)}
        onOpen={setActive}
        seeAll={drinksAndCoffeeList.length > LIMIT ? { cat: "drinks-coffee" } : undefined}
      />

      <Section
        id="shakes-coolers"
        title="shakes & coolers 🥤"
        subtitle="thick shakes, smoothies and coolers."
        items={shakesAndCoolersList.slice(0, LIMIT)}
        onOpen={setActive}
        seeAll={shakesAndCoolersList.length > LIMIT ? { cat: "shakes-coolers" } : undefined}
      />

      <Section
        id="desserts"
        title="sweet cravings 🍰"
        subtitle="finish it right."
        items={sweetCravingsList.slice(0, LIMIT)}
        onOpen={setActive}
        seeAll={sweetCravingsList.length > LIMIT ? { cat: "sweet-cravings" } : undefined}
      />

      {/* 11. Ask Pickd Section */}
      {config.askPickdEnabled && <AskPickdSection />}

      <ProductSheet product={active} onClose={() => setActive(null)} />
      <AskPickdModal open={askOpen} onOpenChange={setAskOpen} />
    </div>
  );
}
