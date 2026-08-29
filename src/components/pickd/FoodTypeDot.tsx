import type { FoodType } from "@/data/menu";
import { cn } from "@/lib/utils";

export function FoodTypeDot({ type, className }: { type: FoodType; className?: string }) {
  const veg = type === "veg";
  return (
    <span
      aria-label={veg ? "veg" : "non-veg"}
      title={veg ? "veg" : "non-veg"}
      className={cn(
        "inline-flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-[3px] border",
        veg ? "border-veg" : "border-nonveg",
        className,
      )}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full", veg ? "bg-veg" : "bg-nonveg")} />
    </span>
  );
}
