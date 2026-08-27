import { Plus, Check } from "lucide-react";
import { useState } from "react";
import type { Product } from "@/data/menu";
import { useCart } from "@/lib/cart";
import { cn } from "@/lib/utils";
import { FoodTypeDot } from "./FoodTypeDot";

interface Props {
  product: Product;
  onOpen: (product: Product) => void;
  className?: string;
}

export function ProductCard({ product, onOpen, className }: Props) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!product.available) return;
    add(product.id);
    setAdded(true);
    setTimeout(() => setAdded(false), 900);
  };

  return (
    <article
      onClick={() => onOpen(product)}
      className={cn(
        "group flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-border/70 bg-card transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[var(--shadow-lift)]",
        !product.available && "opacity-70",
        className,
      )}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          width={800}
          height={600}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {product.badge && product.available && (
          <span className="absolute left-2.5 top-2.5 rounded-full bg-card/95 px-2.5 py-1 text-[11px] font-semibold lowercase text-foreground shadow-[var(--shadow-soft)]">
            {product.badge === "most pickd" ? "🔥 most pickd" : product.badge}
          </span>
        )}
        {!product.available && (
          <span className="absolute inset-x-0 bottom-0 bg-foreground/85 py-1.5 text-center text-xs font-semibold lowercase text-primary-foreground">
            sold out for now
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-1.5 p-3.5">
        <div className="flex items-start gap-2">
          <FoodTypeDot type={product.foodType} className="mt-1" />
          <h3 className="line-clamp-2 text-sm font-bold leading-snug">{product.name}</h3>
        </div>
        <p className="line-clamp-2 text-xs leading-relaxed text-muted-foreground">
          {product.description}
        </p>
        <p className="text-[11px] font-medium lowercase text-muted-foreground/80">
          {product.category}
        </p>

        <div className="mt-auto flex items-center justify-between pt-2.5">
          <span className="text-base font-extrabold">₹{product.price}</span>
          <button
            type="button"
            onClick={handleAdd}
            disabled={!product.available}
            aria-label={`add ${product.name}`}
            className={cn(
              "inline-flex items-center gap-1 rounded-full border px-3 py-1.5 text-xs font-bold lowercase transition-all active:scale-95 disabled:cursor-not-allowed disabled:opacity-50",
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

export function ProductCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-border/70 bg-card">
      <div className="aspect-[4/3] shimmer" />
      <div className="space-y-2 p-3.5">
        <div className="h-3.5 w-3/4 rounded-full shimmer" />
        <div className="h-3 w-full rounded-full shimmer" />
        <div className="h-3 w-1/2 rounded-full shimmer" />
      </div>
    </div>
  );
}
