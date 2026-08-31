import { Link } from "@tanstack/react-router";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import type { Product } from "@/data/menu";
import { ProductCard } from "./ProductCard";

interface Props {
  id?: string | undefined;
  title: string;
  subtitle?: string | undefined;
  items: Product[];
  onOpen: (p: Product) => void;
  seeAll?: { q?: string; cat?: string } | undefined;
  layout?: "carousel" | "grid" | undefined;
}

export function Section({
  id,
  title,
  subtitle,
  items,
  onOpen,
  seeAll,
  layout = "carousel",
}: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 5);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 5);
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, [items]);

  const handleScroll = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    // Scroll by container width + gap so scrolling advances by 1 exact page of complete cards
    const scrollAmount = el.clientWidth + 16;
    const amount = direction === "left" ? -scrollAmount : scrollAmount;
    el.scrollBy({ left: amount, behavior: "smooth" });
  };

  if (items.length === 0) return null;

  return (
    <section id={id} className="reveal mt-8 sm:mt-10 scroll-mt-20">
      <div className="shell flex items-end justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold lowercase sm:text-2xl">{title}</h2>
          {subtitle && <p className="mt-0.5 text-sm lowercase text-muted-foreground">{subtitle}</p>}
        </div>

        <div className="flex items-center gap-3">
          {/* Desktop Navigation Arrows for Carousel */}
          {layout === "carousel" && items.length > 1 && (
            <div className="hidden md:flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => handleScroll("left")}
                disabled={!canScrollLeft}
                aria-label={`scroll ${title} left`}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-border/80 bg-card text-foreground transition-all hover:bg-secondary disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer shadow-xs"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => handleScroll("right")}
                disabled={!canScrollRight}
                aria-label={`scroll ${title} right`}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-border/80 bg-card text-foreground transition-all hover:bg-secondary disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer shadow-xs"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}

          {seeAll && (
            <Link
              to="/menu"
              search={{ q: seeAll.q ?? "", cat: seeAll.cat ?? "all" }}
              className="flex shrink-0 items-center gap-1 text-sm font-bold lowercase text-butter hover:text-butter/85 transition-colors"
            >
              see all <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          )}
        </div>
      </div>

      {layout === "carousel" ? (
        <div className="shell mt-4 overflow-hidden">
          <div
            ref={scrollRef}
            onScroll={checkScroll}
            className="product-row no-scrollbar pb-2 scroll-smooth"
          >
            {items.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                onOpen={onOpen}
                className="product-row-item shrink-0"
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="shell mt-5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-4 lg:gap-5">
          {items.map((p) => (
            <ProductCard key={p.id} product={p} onOpen={onOpen} />
          ))}
        </div>
      )}
    </section>
  );
}
