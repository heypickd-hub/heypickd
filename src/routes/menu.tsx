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
    if (cat === "most-pickd") items = items.filter((p) => p.featured);
    else if (cat !== "all") items = items.filter((p) => p.category === cat);
    if (filter === "veg") items = items.filter((p) => p.foodType === "veg");
    if (filter === "nonveg") items = items.filter((p) => p.foodType === "nonveg");
    if (underBudget) items = items.filter((p) => p.price <= 199);
    return searchMenu(q, items);
  }, [q, cat, filter, underBudget]);

  const setSearch = (next: Partial<MenuSearch>) =>
    navigate({ search: (prev) => ({ ...prev, ...next }) });

  return (
    <div className="pb-24 pt-6">
      <div className="shell">
        <h1 className="text-2xl font-extrabold lowercase">what are you craving?</h1>

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
        <Pill active={cat === "all"} onClick={() => setSearch({ cat: "all" })}>
          all
        </Pill>
        {categories.map((c) => (
          <Pill key={c.id} active={cat === c.id} onClick={() => setSearch({ cat: c.id })}>
            {c.emoji} {c.label}
          </Pill>
        ))}
      </div>

      <div className="shell mt-3 flex gap-2">
        <Pill
          active={filter === "veg"}
          onClick={() => setFilter(filter === "veg" ? "all" : "veg")}
        >
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
          <p className="mt-1 text-sm lowercase text-muted-foreground">
            try another craving.
          </p>
        </div>
      ) : (
        <div className="shell mt-5 grid grid-cols-2 gap-3.5 md:grid-cols-3 lg:grid-cols-4">
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
