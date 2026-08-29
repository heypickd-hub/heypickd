import { Check, ShoppingBag } from "lucide-react";
import { useMemo, useRef, useState } from "react";
import comboImg from "@/assets/snack-combo.jpg";
import { config } from "@/config";
import { getSnack, snacksByKind, type SnackItem } from "@/data/snacks";
import { track } from "@/lib/analytics";
import { useCart } from "@/lib/cart";
import { cn } from "@/lib/utils";

function Option({
  item,
  selected,
  onClick,
}: {
  item: SnackItem;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={cn(
        "flex w-[104px] shrink-0 flex-col overflow-hidden rounded-2xl border bg-card text-left transition-all duration-200 active:scale-[0.98]",
        selected
          ? "-translate-y-0.5 border-butter shadow-[var(--shadow-lift)] ring-1 ring-butter"
          : "border-border/70 hover:-translate-y-0.5",
      )}
    >
      <div className="relative aspect-square overflow-hidden bg-muted">
        <img
          src={item.image}
          alt={item.name}
          loading="lazy"
          width={200}
          height={200}
          className="h-full w-full object-cover"
        />
        {selected && (
          <span className="absolute right-1.5 top-1.5 rounded-full bg-butter p-1 text-accent-foreground">
            <Check className="h-3 w-3" />
          </span>
        )}
      </div>
      <div className="p-2">
        <p className="truncate text-xs font-bold">{item.name}</p>
        <p className="text-[11px] font-semibold text-muted-foreground">₹{item.price}</p>
      </div>
    </button>
  );
}

function Step({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <div className="mt-5">
      <p className="text-sm font-bold lowercase">
        <span className="mr-1.5 text-butter">{n}.</span>
        {title}
      </p>
      <div className="no-scrollbar mt-2.5 flex gap-2.5 overflow-x-auto pb-1">{children}</div>
    </div>
  );
}

export function ComboBuilder() {
  const { addCustom } = useCart();
  const started = useRef(false);
  const [crunch, setCrunch] = useState<string | null>(null);
  const [sweet, setSweet] = useState<string | null>(null);
  const [drink, setDrink] = useState<string | null>(null);
  const [extras, setExtras] = useState<string[]>([]);
  const [added, setAdded] = useState(false);

  const begin = () => {
    if (!started.current) {
      started.current = true;
      track("combo_started");
    }
  };

  const chosen = useMemo(() => {
    const ids = [crunch, sweet, drink, ...extras].filter(Boolean) as string[];
    return ids.map((id) => getSnack(id)).filter((s): s is SnackItem => Boolean(s));
  }, [crunch, sweet, drink, extras]);

  const itemsTotal = chosen.reduce((n, s) => n + s.price, 0);
  const fee = chosen.length > 0 ? config.comboServiceFee : 0;
  const total = itemsTotal + fee;
  const ready = Boolean(crunch || sweet || drink);

  const toggleExtra = (id: string) => {
    begin();
    setExtras((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const pick = (setter: (v: string | null) => void, current: string | null, id: string) => {
    begin();
    setter(current === id ? null : id);
  };

  const handleAdd = () => {
    if (!ready) return;
    const parts = chosen.map((s) => s.name);
    addCustom({
      name: "custom snack combo",
      price: total,
      description: parts.join(", "),
      image: comboImg,
      parts,
    });
    track("combo_completed", { items: parts.length, value: total });
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
    setCrunch(null);
    setSweet(null);
    setDrink(null);
    setExtras([]);
    started.current = false;
  };

  return (
    <div className="rounded-3xl border border-border/70 bg-card p-4 sm:p-6">
      <Step n={1} title="pick a crunch">
        {snacksByKind("crunch").map((s) => (
          <Option
            key={s.id}
            item={s}
            selected={crunch === s.id}
            onClick={() => pick(setCrunch, crunch, s.id)}
          />
        ))}
      </Step>

      <Step n={2} title="pick something sweet">
        {snacksByKind("sweet").map((s) => (
          <Option
            key={s.id}
            item={s}
            selected={sweet === s.id}
            onClick={() => pick(setSweet, sweet, s.id)}
          />
        ))}
      </Step>

      <Step n={3} title="pick a drink">
        {snacksByKind("drink").map((s) => (
          <Option
            key={s.id}
            item={s}
            selected={drink === s.id}
            onClick={() => pick(setDrink, drink, s.id)}
          />
        ))}
      </Step>

      <Step n={4} title="extras">
        {snacksByKind("extra").map((s) => (
          <Option
            key={s.id}
            item={s}
            selected={extras.includes(s.id)}
            onClick={() => toggleExtra(s.id)}
          />
        ))}
      </Step>

      <div className="mt-6 rounded-2xl border border-border bg-secondary/50 p-4">
        <p className="text-sm font-extrabold lowercase">your combo</p>
        <p className="mt-1 text-sm lowercase text-muted-foreground">
          {chosen.length > 0 ? chosen.map((s) => s.name).join(" · ") : "nothing pickd yet."}
        </p>

        {chosen.length > 0 && (
          <div className="mt-3 space-y-1 text-xs lowercase text-muted-foreground">
            <div className="flex justify-between">
              <span>items</span>
              <span>₹{itemsTotal}</span>
            </div>
            <div className="flex justify-between">
              <span>pickd handling</span>
              <span>₹{fee}</span>
            </div>
          </div>
        )}

        <div className="mt-3 flex items-center justify-between gap-3">
          <span className="text-xl font-extrabold">₹{total}</span>
          <button
            type="button"
            onClick={handleAdd}
            disabled={!ready}
            className={cn(
              "inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-bold lowercase transition-transform active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50",
              added ? "bg-veg text-primary-foreground" : "bg-primary text-primary-foreground",
            )}
          >
            {added ? <Check className="h-4 w-4" /> : <ShoppingBag className="h-4 w-4" />}
            {added ? "added to pickd" : "add combo to pickd"}
          </button>
        </div>
        <p className="mt-2 text-[11px] lowercase text-muted-foreground">
          made your way. pickd your way.
        </p>
      </div>
    </div>
  );
}
