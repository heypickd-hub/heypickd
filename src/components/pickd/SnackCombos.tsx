import { Check, Plus } from "lucide-react";
import { useState } from "react";
import { comboPresets, type ComboPreset } from "@/data/snacks";
import { useCart } from "@/lib/cart";
import { cn } from "@/lib/utils";

function PresetCard({ combo }: { combo: ComboPreset }) {
  const { addCustom } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addCustom({
      name: combo.name,
      price: combo.price,
      description: combo.parts.join(", "),
      image: combo.image,
      parts: combo.parts,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 900);
  };

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-border/70 bg-card transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[var(--shadow-lift)]">
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <img
          src={combo.image}
          alt={combo.name}
          loading="lazy"
          width={800}
          height={600}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {combo.badge && (
          <span className="absolute left-2.5 top-2.5 rounded-full bg-card/95 px-2.5 py-1 text-[11px] font-semibold lowercase shadow-[var(--shadow-soft)]">
            {combo.badge === "most pickd" ? "🔥 most pickd" : combo.badge}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-1.5 p-3.5">
        <h3 className="text-sm font-bold lowercase leading-snug">{combo.name}</h3>
        <p className="line-clamp-2 text-xs leading-relaxed text-muted-foreground">
          {combo.parts.join(" + ")}
        </p>
        <div className="mt-auto flex items-center justify-between pt-2.5">
          <span className="text-base font-extrabold">₹{combo.price}</span>
          <button
            type="button"
            onClick={handleAdd}
            aria-label={`add ${combo.name}`}
            className={cn(
              "inline-flex items-center gap-1 rounded-full border px-3 py-1.5 text-xs font-bold lowercase transition-all active:scale-95",
              added
                ? "border-veg bg-veg text-primary-foreground"
                : "border-foreground/15 bg-secondary text-foreground hover:bg-butter hover:text-accent-foreground",
            )}
          >
            {added ? <Check className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
            {added ? "added" : "add"}
          </button>
        </div>
      </div>
    </article>
  );
}

export function SnackCombos() {
  return (
    <section id="snacks" className="reveal mt-10">
      <div className="shell">
        <h2 className="text-xl font-extrabold lowercase sm:text-2xl">snacks & chill</h2>
        <p className="mt-0.5 text-sm lowercase text-muted-foreground">
          quick bites for the room.
        </p>
        <div className="mt-4 grid grid-cols-2 gap-3.5 md:grid-cols-3 lg:grid-cols-4">
          {comboPresets.map((c) => (
            <PresetCard key={c.id} combo={c} />
          ))}
        </div>
      </div>
    </section>
  );
}
