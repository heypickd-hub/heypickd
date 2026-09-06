import { Check, ShoppingBag, Sparkles } from "lucide-react";
import { useMemo, useRef, useState } from "react";
import { menu, type Product } from "@/data/menu";
import { track } from "@/lib/analytics";
import { useCart } from "@/lib/cart";
import { cn } from "@/lib/utils";
import { FoodTypeDot } from "./FoodTypeDot";
import { getCardStyles } from "./ProductCard";
import { useAvailabilityNow } from "@/lib/availability-clock";
import { getProductAvailability } from "@/lib/product-availability";
import { ProductImage } from "./ProductImage";

type ComboMode = "meal" | "snack";

function recommendedFirst(items: Product[], limit: number) {
  return [...items]
    .sort((a, b) => {
      const featured = Number(b.featured) - Number(a.featured);
      if (featured) return featured;
      return a.price - b.price;
    })
    .slice(0, limit);
}

function ChoiceCard({
  product,
  selected,
  onClick,
  label,
}: {
  product: Product;
  selected: boolean;
  onClick: () => void;
  label: string;
}) {
  const styles = getCardStyles(product);
  const now = useAvailabilityNow();
  const availability = getProductAvailability(product, now);
  return (
    <button
      type="button"
      onClick={() => availability.isOrderable && onClick()}
      disabled={!availability.isOrderable}
      aria-pressed={selected}
      className={cn(
        "group min-w-0 overflow-hidden rounded-2xl border bg-card text-left shadow-[var(--shadow-soft)] transition-all duration-300 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-80",
        selected
          ? "-translate-y-0.5 border-butter ring-2 ring-butter shadow-[var(--shadow-lift)]"
          : styles.borderColor,
      )}
    >
      <div className={cn("relative aspect-[4/3] overflow-hidden", styles.imgBg)}>
        <ProductImage
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute left-2 top-2 rounded-full bg-card/95 px-2 py-1 text-[9px] font-extrabold uppercase tracking-wide text-foreground shadow-sm">
          {label}
        </span>
        {selected && (
          <span className="absolute right-2 top-2 rounded-full bg-butter p-1.5 text-accent-foreground shadow-md">
            <Check className="h-3.5 w-3.5" />
          </span>
        )}
        {!availability.isOrderable && (
          <span className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 px-2 text-center text-white">
            <span className="text-[11px] font-extrabold lowercase">{availability.message}</span>
            <span className="mt-1 text-[9px] font-semibold lowercase text-white/80">
              {availability.windowLabel}
            </span>
          </span>
        )}
      </div>
      <div className="space-y-2 p-3">
        <div className="flex min-h-10 items-start gap-1.5">
          <FoodTypeDot type={product.foodType} className="mt-0.5 shrink-0" />
          <p className="line-clamp-2 text-xs font-extrabold leading-tight lowercase sm:text-sm">
            {product.name}
          </p>
        </div>
        <div className="flex items-center justify-between gap-2 border-t border-border/40 pt-2">
          <span className="text-sm font-extrabold">₹{product.price}</span>
          <span className="text-[10px] font-bold lowercase text-muted-foreground">
            {selected ? "pickd ✓" : "choose"}
          </span>
        </div>
      </div>
    </button>
  );
}

function Step({
  number,
  title,
  hint,
  items,
  selectedId,
  onPick,
  label,
}: {
  number: number;
  title: string;
  hint: string;
  items: Product[];
  selectedId: string | null;
  onPick: (id: string) => void;
  label: string;
}) {
  return (
    <section className="mt-7">
      <div className="flex items-end justify-between gap-3">
        <div>
          <p className="text-sm font-extrabold lowercase">
            <span className="mr-1.5 text-butter">{number}.</span>
            {title}
          </p>
          <p className="mt-0.5 text-xs lowercase text-muted-foreground">{hint}</p>
        </div>
        {number > 1 && (
          <span className="text-[10px] font-bold lowercase text-muted-foreground">optional</span>
        )}
      </div>
      <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {items.map((product) => (
          <ChoiceCard
            key={product.id}
            product={product}
            selected={selectedId === product.id}
            onClick={() => onPick(product.id)}
            label={label}
          />
        ))}
      </div>
    </section>
  );
}

export function ComboBuilder() {
  const { add } = useCart();
  const started = useRef(false);
  const [mode, setMode] = useState<ComboMode>("meal");
  const [base, setBase] = useState<string | null>(null);
  const [side, setSide] = useState<string | null>(null);
  const [drink, setDrink] = useState<string | null>(null);
  const [dessert, setDessert] = useState<string | null>(null);
  const [added, setAdded] = useState(false);
  const now = useAvailabilityNow();

  const mealBases = useMemo(
    () =>
      recommendedFirst(
        menu.filter((p) => p.available && p.category === "Combos" && p.id !== "stay-snack-box"),
        12,
      ),
    [],
  );
  const snackBases = useMemo(
    () =>
      recommendedFirst(
        menu.filter(
          (p) => p.available && (p.category === "Snacks & Sides" || p.id === "stay-snack-box"),
        ),
        12,
      ),
    [],
  );
  const sides = useMemo(
    () =>
      recommendedFirst(
        menu.filter((p) => p.available && p.category === "Snacks & Sides"),
        8,
      ),
    [],
  );
  const drinks = useMemo(
    () =>
      recommendedFirst(
        menu.filter((p) => p.available && p.category === "Drinks & Shakes"),
        8,
      ),
    [],
  );
  const desserts = useMemo(
    () =>
      recommendedFirst(
        menu.filter((p) => p.available && p.category === "Sweet Cravings"),
        8,
      ),
    [],
  );

  const begin = () => {
    if (!started.current) {
      started.current = true;
      track("combo_started", { mode });
    }
  };
  const pick = (setter: (value: string | null) => void, current: string | null, id: string) => {
    begin();
    setter(current === id ? null : id);
  };
  const switchMode = (next: ComboMode) => {
    setMode(next);
    setBase(null);
    setSide(null);
    setDrink(null);
    setDessert(null);
    started.current = false;
  };

  const chosen = [base, side, drink, dessert]
    .filter((id): id is string => Boolean(id))
    .map((id) => menu.find((product) => product.id === id))
    .filter((product): product is Product => Boolean(product));
  const total = chosen.reduce((sum, product) => sum + product.price, 0);

  const handleAdd = () => {
    if (!base || chosen.some((product) => !getProductAvailability(product, now).isOrderable)) {
      return;
    }
    chosen.forEach((product) => add(product.id));
    track("combo_completed", { mode, items: chosen.length, value: total });
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
    setBase(null);
    setSide(null);
    setDrink(null);
    setDessert(null);
    started.current = false;
  };

  return (
    <div className="overflow-hidden rounded-3xl border border-border/70 bg-card shadow-[var(--shadow-soft)]">
      <div className="border-b border-border/60 bg-gradient-to-br from-butter/15 via-card to-secondary/60 p-4 sm:p-6">
        <div className="flex items-start gap-3">
          <span className="rounded-2xl bg-butter p-2.5 text-accent-foreground shadow-sm">
            <Sparkles className="h-5 w-5" />
          </span>
          <div>
            <h2 className="text-lg font-extrabold lowercase">make it a complete craving</h2>
            <p className="mt-1 text-xs lowercase text-muted-foreground sm:text-sm">
              exact menu prices, no combo-builder fee. every pick keeps its own photo.
            </p>
          </div>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-2 rounded-2xl bg-secondary/70 p-1.5">
          {(
            [
              ["meal", "🍱 meal combo", "start with a full meal"],
              ["snack", "🍿 snack box", "start with a quick bite"],
            ] as const
          ).map(([value, title, subtitle]) => (
            <button
              key={value}
              type="button"
              onClick={() => switchMode(value)}
              className={cn(
                "rounded-xl px-3 py-2.5 text-left transition-all",
                mode === value ? "bg-card shadow-sm ring-1 ring-butter/50" : "hover:bg-card/60",
              )}
            >
              <span className="block text-xs font-extrabold lowercase sm:text-sm">{title}</span>
              <span className="mt-0.5 hidden text-[10px] lowercase text-muted-foreground sm:block">
                {subtitle}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="p-4 sm:p-6">
        <Step
          number={1}
          title={mode === "meal" ? "pick your meal" : "pick your snack box base"}
          hint={
            mode === "meal" ? "proper meal combos come first." : "one strong snack starts the box."
          }
          items={mode === "meal" ? mealBases : snackBases}
          selectedId={base}
          onPick={(id) => pick(setBase, base, id)}
          label={mode === "meal" ? "meal combo" : "snack box"}
        />
        {mode === "meal" && (
          <Step
            number={2}
            title="add a side"
            hint="something crisp or savoury beside it."
            items={sides}
            selectedId={side}
            onPick={(id) => pick(setSide, side, id)}
            label="side"
          />
        )}
        <Step
          number={mode === "meal" ? 3 : 2}
          title="add a drink"
          hint="cool down the spice with a cold sip."
          items={drinks}
          selectedId={drink}
          onPick={(id) => pick(setDrink, drink, id)}
          label="drink"
        />
        <Step
          number={mode === "meal" ? 4 : 3}
          title="finish with dessert"
          hint="a sweet ending if you want one."
          items={desserts}
          selectedId={dessert}
          onPick={(id) => pick(setDessert, dessert, id)}
          label="dessert"
        />

        <div className="sticky bottom-20 z-10 mt-8 rounded-2xl border border-butter/35 bg-card/95 p-4 shadow-[var(--shadow-lift)] backdrop-blur sm:bottom-4">
          <p className="text-xs font-extrabold lowercase text-muted-foreground">your combo</p>
          <p className="mt-1 line-clamp-2 text-sm font-bold lowercase">
            {chosen.length
              ? chosen.map((product) => product.name).join(" · ")
              : "pick a base to begin."}
          </p>
          <div className="mt-3 flex items-center justify-between gap-3">
            <div>
              <span className="text-xl font-extrabold">₹{total}</span>
              <span className="ml-1.5 text-[10px] font-semibold lowercase text-muted-foreground">
                exact item total
              </span>
            </div>
            <button
              type="button"
              onClick={handleAdd}
              disabled={
                !base || chosen.some((product) => !getProductAvailability(product, now).isOrderable)
              }
              className={cn(
                "inline-flex items-center gap-2 rounded-full px-5 py-3 text-xs font-extrabold lowercase transition-transform active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-45 sm:text-sm",
                added ? "bg-veg text-primary-foreground" : "bg-primary text-primary-foreground",
              )}
            >
              {added ? <Check className="h-4 w-4" /> : <ShoppingBag className="h-4 w-4" />}
              {added ? "added to pickd" : "add all to cart"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
