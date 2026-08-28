import { useFoodFilter, type FoodFilter } from "@/lib/veg-filter";
import { cn } from "@/lib/utils";

const options: { id: Exclude<FoodFilter, "all">; label: string; dot: string }[] = [
  { id: "veg", label: "veg", dot: "bg-veg" },
  { id: "nonveg", label: "non-veg", dot: "bg-nonveg" },
];

export function FoodTypeSwitch() {
  const { filter, setFilter } = useFoodFilter();

  return (
    <div
      role="group"
      aria-label="food type filter"
      className="flex items-center gap-1 rounded-full border border-border bg-card p-1"
    >
      {options.map((opt) => {
        const active = filter === opt.id;
        return (
          <button
            key={opt.id}
            type="button"
            aria-pressed={active}
            onClick={() => setFilter(active ? "all" : opt.id)}
            className={cn(
              "flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-[11px] font-bold lowercase transition-all active:scale-95",
              active
                ? "bg-secondary text-foreground shadow-[var(--shadow-soft)]"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            <span
              className={cn(
                "flex h-3 w-3 items-center justify-center rounded-[3px] border",
                opt.id === "veg" ? "border-veg" : "border-nonveg",
              )}
            >
              <span className={cn("h-1.5 w-1.5 rounded-full", opt.dot)} />
            </span>
            <span className="hidden sm:inline">{opt.label}</span>
          </button>
        );
      })}
    </div>
  );
}
