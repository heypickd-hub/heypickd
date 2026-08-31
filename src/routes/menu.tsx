import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Search, X } from "lucide-react";
import { useMemo, useState } from "react";
import { ProductCard } from "@/components/pickd/ProductCard";
import { ProductSheet } from "@/components/pickd/ProductSheet";
import { categories, menu, searchMenu, type Product } from "@/data/menu";
import { useFoodFilter } from "@/lib/veg-filter";
import { cn } from "@/lib/utils";

interface MenuSearch {
  q: string;
  cat: string;
}

export const Route = createFileRoute("/menu")({
  validateSearch: (search: Record<string, unknown>): MenuSearch => ({
    q: typeof search["q"] === "string" ? search["q"] : "",
    cat: typeof search["cat"] === "string" ? search["cat"] : "all",
  }),
  head: () => ({
    meta: [
      { title: "the menu — pickd" },
      {
        name: "description",
        content:
          "Browse pickd's curated menu of biryani, burgers, grills, dosas, drinks and desserts, delivered to your hotel room.",
      },
      { property: "og:title", content: "the menu — pickd" },
      {
        property: "og:description",
        content: "A small, curated menu of really good food, delivered to your stay.",
      },
      { property: "og:url", content: "/menu" },
    ],
    links: [{ rel: "canonical", href: "/menu" }],
  }),
  component: MenuPage,
});

function MenuPage() {
  const { q, cat } = Route.useSearch();
  const navigate = useNavigate({ from: "/menu" });
  const [active, setActive] = useState<Product | null>(null);
  const { filter, setFilter } = useFoodFilter();
  const [underBudget, setUnderBudget] = useState(false);

  const results = useMemo(() => {
    let items = menu;

    // Category mapping
    if (cat === "most-pickd") {
      items = items.filter((p) => p.featured);
    } else if (cat === "non-veg-favourites") {
      items = items.filter((p) => p.foodType === "non-veg");
    } else if (cat === "veg-favourites") {
      items = items.filter((p) => p.foodType === "veg");
    } else if (cat === "burgers-wraps-quick-bites") {
      items = items.filter(
        (p) =>
          p.category === "Burgers & Wraps" ||
          p.keywords.includes("pizza") ||
          p.name.toLowerCase().includes("pizza"),
      );
    } else if (cat === "crispy-grill-custom") {
      items = items.filter(
        (p) => p.category === "Crispy & Grill" || p.category === "Shawarma & Grill",
      );
    } else if (cat === "dinner-under-199") {
      items = items.filter(
        (p) =>
          p.price <= 199 &&
          p.category !== "Drinks & Shakes" &&
          p.category !== "Sweet Cravings" &&
          p.category !== "Snacks & Chocolates",
      );
    } else if (cat === "drinks-coffee") {
      items = items.filter((p) => {
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
      });
    } else if (cat === "shakes-coolers") {
      items = items.filter((p) => {
        const name = p.name.toLowerCase();
        return (
          p.category === "Drinks & Shakes" &&
          (name.includes("shake") ||
            name.includes("mojito") ||
            name.includes("falooda") ||
            name.includes("cooler") ||
            name.includes("smoothie"))
        );
      });
    } else if (cat === "biryani-rice" || cat === "Biryani & Rice") {
      items = items.filter((p) => p.category === "Biryani & Rice");
    } else if (cat === "south-indian" || cat === "South Indian Dinner") {
      items = items.filter((p) => p.category === "South Indian Dinner");
    } else if (cat === "snacks-chocolates" || cat === "Snacks & Chocolates") {
      items = items.filter((p) => p.category === "Snacks & Chocolates");
    } else if (cat === "sweet-cravings" || cat === "Sweet Cravings") {
      items = items.filter((p) => p.category === "Sweet Cravings");
    } else if (cat !== "all") {
      items = items.filter((p) => p.category === cat);
    }

    // Global food type filter (veg / non-veg)
    if (filter === "veg") {
      items = items.filter((p) => p.foodType === "veg");
    } else if (filter === "nonveg") {
      items = items.filter((p) => p.foodType === "non-veg");
    }

    // Local under-budget filter
    if (underBudget) {
      items = items.filter((p) => p.price <= 199);
    }

    return searchMenu(q, items);
  }, [q, cat, filter, underBudget]);

  const pageTitle = useMemo(() => {
    switch (cat) {
      case "most-pickd":
        return "most pickd 🔥";
      case "non-veg-favourites":
        return "non-veg favourites 🍗";
      case "veg-favourites":
        return "veg favourites 🌱";
      case "Biryani & Rice":
      case "biryani-rice":
        return "biryani & rice 🍚";
      case "burgers-wraps-quick-bites":
        return "burgers, wraps & quick bites 🍔";
      case "crispy-grill-custom":
        return "crispy & grill 🍗";
      case "South Indian Dinner":
      case "south-indian":
        return "south indian favourites 🥞";
      case "Snacks & Chocolates":
      case "snacks-chocolates":
        return "snacks & chocolates 🍿";
      case "dinner-under-199":
        return "dinner under ₹199 💸";
      case "drinks-coffee":
        return "drinks & coffee 🥤";
      case "shakes-coolers":
        return "shakes & coolers 🥤";
      case "Sweet Cravings":
      case "sweet-cravings":
        return "sweet cravings 🍰";
      default:
        return "what are you craving?";
    }
  }, [cat]);

  const isPillActive = (pillId: string) => {
    if (cat === pillId) return true;
    if ((cat === "biryani-rice" || cat === "Biryani & Rice") && pillId === "Biryani & Rice")
      return true;
    if (cat === "burgers-wraps-quick-bites" && pillId === "Burgers & Wraps") return true;
    if (
      cat === "crispy-grill-custom" &&
      (pillId === "Crispy & Grill" || pillId === "Shawarma & Grill")
    )
      return true;
    if (
      (cat === "south-indian" || cat === "South Indian Dinner") &&
      pillId === "South Indian Dinner"
    )
      return true;
    if (
      (cat === "snacks-chocolates" || cat === "Snacks & Chocolates") &&
      pillId === "Snacks & Chocolates"
    )
      return true;
    if ((cat === "sweet-cravings" || cat === "Sweet Cravings") && pillId === "Sweet Cravings")
      return true;
    if (cat === "veg-favourites" && pillId === "Veg Picks") return true;
    if ((cat === "drinks-coffee" || cat === "shakes-coolers") && pillId === "Drinks & Shakes")
      return true;
    return false;
  };

  const isAllActive = cat === "all" || cat === "non-veg-favourites" || cat === "dinner-under-199";

  const setSearch = (next: Partial<MenuSearch>) =>
    navigate({ search: (prev) => ({ ...prev, ...next }) });

  return (
    <div className="pb-24 pt-6">
      <div className="shell">
        <h1 className="text-2xl font-extrabold lowercase">{pageTitle}</h1>

        <div className="relative mt-4">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setSearch({ q: e.target.value })}
            placeholder="what are you craving?"
            aria-label="search the menu"
            className="w-full rounded-full border border-input bg-card py-3 pl-11 pr-10 text-sm outline-none placeholder:text-muted-foreground/70 focus:border-butter"
          />
          {q && (
            <button
              type="button"
              aria-label="clear search"
              onClick={() => setSearch({ q: "" })}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1.5 hover:bg-secondary"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      <div className="no-scrollbar mt-4 flex gap-2 overflow-x-auto px-5 lg:mx-auto lg:max-w-[1240px]">
        <Pill active={isAllActive} onClick={() => setSearch({ cat: "all" })}>
          all
        </Pill>
        {categories.map((c) => (
          <Pill key={c.id} active={isPillActive(c.id)} onClick={() => setSearch({ cat: c.id })}>
            {c.emoji} {c.label}
          </Pill>
        ))}
      </div>

      <div className="shell mt-3 flex gap-2">
        <Pill active={filter === "veg"} onClick={() => setFilter(filter === "veg" ? "all" : "veg")}>
          🌱 veg only
        </Pill>
        <Pill
          active={filter === "nonveg"}
          onClick={() => setFilter(filter === "nonveg" ? "all" : "nonveg")}
        >
          🍗 non-veg only
        </Pill>
        <Pill active={underBudget} onClick={() => setUnderBudget((v) => !v)}>
          under ₹199
        </Pill>
      </div>

      {results.length === 0 ? (
        <div className="shell mt-16 text-center">
          <p className="text-lg font-extrabold lowercase">couldn't find that one.</p>
          <p className="mt-1 text-sm lowercase text-muted-foreground">try another craving.</p>
        </div>
      ) : (
        <div className="shell mt-5 grid grid-cols-1 min-[480px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {results.map((p) => (
            <ProductCard key={p.id} product={p} onOpen={setActive} />
          ))}
        </div>
      )}

      <ProductSheet product={active} onClose={() => setActive(null)} />
    </div>
  );
}

function Pill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "shrink-0 whitespace-nowrap rounded-full border px-3.5 py-2 text-xs font-semibold lowercase transition-colors",
        active
          ? "border-transparent bg-primary text-primary-foreground"
          : "border-border bg-card text-foreground hover:bg-secondary",
      )}
    >
      {children}
    </button>
  );
}
