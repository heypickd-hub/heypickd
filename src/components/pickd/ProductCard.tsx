import { Plus, Check } from "lucide-react";
import { useState } from "react";
import type { Product } from "@/data/menu";
import { useCart } from "@/lib/cart";
import { cn } from "@/lib/utils";
import { FoodTypeDot } from "./FoodTypeDot";

interface Props {
  product: Product;
  onOpen: (product: Product) => void;
  className?: string | undefined;
}

interface CardStyles {
  cardBg: string;
  borderColor: string;
  imgBg: string;
  badgeBg: string;
  badgeText: string;
}

export function getCardStyles(product: Product): CardStyles {
  const category = product.category;
  const name = product.name.toLowerCase();
  const keywords = product.keywords || [];

  // 1. Veg Picks / Veg Favourites (subtle sage tint)
  if (category === "Veg Picks") {
    return {
      cardBg: "bg-card",
      borderColor: "border-border/70 hover:border-[#C0DCC0]",
      imgBg: "bg-[#F0F6F0]",
      badgeBg: "bg-[#E2EFE2]",
      badgeText: "text-[#285028]",
    };
  }

  // 2. Biryani & Rice (warm saffron/cream tint)
  if (category === "Biryani & Rice" || name.includes("biryani") || name.includes("rice")) {
    return {
      cardBg: "bg-card",
      borderColor: "border-border/70 hover:border-[#FCDCC5]",
      imgBg: "bg-[#FFF4ED]",
      badgeBg: "bg-[#FFE8D6]",
      badgeText: "text-[#854010]",
    };
  }

  // 3. Burgers & Wraps (muted orange/peach tint)
  if (
    category === "Burgers & Wraps" ||
    name.includes("burger") ||
    name.includes("wrap") ||
    name.includes("pizza") ||
    keywords.includes("pizza")
  ) {
    return {
      cardBg: "bg-card",
      borderColor: "border-border/70 hover:border-[#FCDCD0]",
      imgBg: "bg-[#FFF4F0]",
      badgeBg: "bg-[#FFE8DE]",
      badgeText: "text-[#923C15]",
    };
  }

  // 4. Crispy & Grill / Shawarma & Grill (warm amber tint)
  if (
    category === "Crispy & Grill" ||
    category === "Shawarma & Grill" ||
    name.includes("grill") ||
    name.includes("shawarma")
  ) {
    return {
      cardBg: "bg-card",
      borderColor: "border-border/70 hover:border-[#FCF1D0]",
      imgBg: "bg-[#FFF9EA]",
      badgeBg: "bg-[#FFEFC8]",
      badgeText: "text-[#7B6005]",
    };
  }

  // 5. South Indian Dinner (soft yellow/cream tint)
  if (
    category === "South Indian Dinner" ||
    name.includes("dosa") ||
    name.includes("idli") ||
    name.includes("uthappam")
  ) {
    return {
      cardBg: "bg-card",
      borderColor: "border-border/70 hover:border-[#F5F5D0]",
      imgBg: "bg-[#FCFCF0]",
      badgeBg: "bg-[#F5F5CE]",
      badgeText: "text-[#62620A]",
    };
  }

  // 6. Drinks & Shakes
  if (category === "Drinks & Shakes") {
    if (
      name.includes("shake") ||
      name.includes("mojito") ||
      name.includes("falooda") ||
      name.includes("cooler") ||
      name.includes("smoothie")
    ) {
      return {
        cardBg: "bg-card",
        borderColor: "border-border/70 hover:border-[#FAD6F0]",
        imgBg: "bg-[#FAF2FA]",
        badgeBg: "bg-[#FAD6F0]",
        badgeText: "text-[#702058]",
      };
    }
    return {
      cardBg: "bg-card",
      borderColor: "border-border/70 hover:border-[#D6E6FA]",
      imgBg: "bg-[#F2F7FA]",
      badgeBg: "bg-[#D6E6FA]",
      badgeText: "text-[#184878]",
    };
  }

  // 7. Sweet Cravings (soft cocoa/blush tint)
  if (category === "Sweet Cravings") {
    return {
      cardBg: "bg-card",
      borderColor: "border-border/70 hover:border-[#ECDFD7]",
      imgBg: "bg-[#FAF5F2]",
      badgeBg: "bg-[#ECDFD7]",
      badgeText: "text-[#5C3E30]",
    };
  }

  // 8. Snacks & Chocolates
  if (category === "Snacks & Chocolates") {
    if (
      keywords.includes("chips") ||
      keywords.includes("crisp") ||
      name.includes("chips") ||
      name.includes("lays") ||
      name.includes("bingo")
    ) {
      return {
        cardBg: "bg-card",
        borderColor: "border-border/70 hover:border-[#F5EFCD]",
        imgBg: "bg-[#FCFBF2]",
        badgeBg: "bg-[#F5EFCD]",
        badgeText: "text-[#73630A]",
      };
    }
    return {
      cardBg: "bg-card",
      borderColor: "border-border/70 hover:border-[#ECDFD7]",
      imgBg: "bg-[#FAF5F2]",
      badgeBg: "bg-[#ECDFD7]",
      badgeText: "text-[#5C3E30]",
    };
  }

  // Default fallback (minimal cream/butter card styles matching Pickd)
  return {
    cardBg: "bg-card",
    borderColor: "border-border/70",
    imgBg: "bg-muted/50",
    badgeBg: "bg-muted",
    badgeText: "text-muted-foreground",
  };
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

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onOpen(product);
    }
  };

  const styles = getCardStyles(product);

  return (
    <article
      onClick={() => onOpen(product)}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={`${product.name}, ${product.foodType}, price: ₹${product.price}`}
      className={cn(
        "group flex cursor-pointer flex-col overflow-hidden rounded-2xl border transition-all duration-300 shadow-[var(--shadow-soft)] hover:-translate-y-0.5 hover:shadow-[var(--shadow-lift)] focus-visible:ring-2 focus-visible:ring-butter focus-visible:ring-offset-2 outline-none h-full",
        styles.cardBg,
        styles.borderColor,
        !product.available && "opacity-75",
        className,
      )}
    >
      {/* Top Part: Image Area (4:3 aspect ratio) */}
      <div className={cn("relative aspect-[4/3] w-full overflow-hidden bg-muted", styles.imgBg)}>
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {product.badge && product.available && (
          <span className="absolute left-2 top-2 sm:left-2.5 sm:top-2.5 rounded-full bg-card/95 px-1.5 py-0.5 sm:px-2 text-[9px] sm:text-[10px] font-bold uppercase text-foreground shadow-[var(--shadow-soft)]">
            {product.badge === "most pickd" ? "🔥 most pickd" : product.badge}
          </span>
        )}
        {!product.available && (
          <span className="absolute inset-0 flex items-center justify-center bg-black/60 text-center text-xs font-extrabold uppercase text-white tracking-wider backdrop-blur-[1px]">
            sold out for now
          </span>
        )}
      </div>

      {/* Bottom Part: Content Area */}
      <div className="flex flex-1 flex-col p-2.5 sm:p-3 justify-between gap-1.5 sm:gap-2">
        <div className="flex flex-col gap-1 sm:gap-1.5">
          {/* Title Row with Veg/Non-Veg Dot (Fixed 2-line reserved height) */}
          <div className="flex items-start gap-1 sm:gap-1.5 min-h-[2.2rem] sm:min-h-[2.5rem] max-h-[2.2rem] sm:max-h-[2.5rem]">
            <FoodTypeDot type={product.foodType} className="mt-0.5 sm:mt-1 shrink-0" />
            <h3 className="line-clamp-2 text-[11px] min-[360px]:text-xs sm:text-sm font-extrabold leading-tight text-foreground lowercase">
              {product.name}
            </h3>
          </div>

          {/* Description (Fixed 2-line reserved height) */}
          <div className="min-h-[1.75rem] sm:min-h-[2rem] max-h-[1.75rem] sm:max-h-[2rem] flex items-start">
            <p className="line-clamp-2 text-[10px] sm:text-xs leading-tight text-muted-foreground lowercase">
              {product.description || ""}
            </p>
          </div>

          {/* Category Badge */}
          <div>
            <span
              className={cn(
                "inline-flex rounded-full px-1.5 py-0.5 sm:px-2 text-[8px] sm:text-[10px] font-bold tracking-wider uppercase",
                styles.badgeBg,
                styles.badgeText,
              )}
            >
              {product.category}
            </span>
          </div>
        </div>

        {/* Footer: Price & Add Button */}
        <div className="flex items-center justify-between border-t border-border/10 pt-1.5 sm:pt-2 mt-auto">
          <span className="text-xs min-[360px]:text-sm sm:text-base font-extrabold text-foreground">
            ₹{product.price}
          </span>
          <button
            type="button"
            onClick={handleAdd}
            disabled={!product.available}
            aria-label={`add ${product.name} to cart`}
            className={cn(
              "inline-flex items-center gap-0.5 sm:gap-1 rounded-full border px-1.5 min-[360px]:px-2.5 py-0.5 sm:py-1 text-[10px] sm:text-xs font-bold lowercase transition-all active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer shadow-[var(--shadow-soft)] focus-visible:ring-2 focus-visible:ring-butter focus-visible:outline-none min-h-[28px] sm:min-h-[34px] justify-center shrink-0",
              added
                ? "border-veg bg-veg text-primary-foreground"
                : "border-foreground/15 bg-secondary text-foreground hover:bg-butter hover:text-accent-foreground",
            )}
          >
            {added ? <Check className="h-3 w-3" /> : <Plus className="h-3 w-3" />}
            <span className="hidden min-[340px]:inline">{added ? "added" : "add"}</span>
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
      <div className="space-y-2 p-3">
        <div className="h-3.5 w-3/4 rounded-full shimmer" />
        <div className="h-3 w-full rounded-full shimmer" />
        <div className="h-3 w-1/2 rounded-full shimmer" />
      </div>
    </div>
  );
}
