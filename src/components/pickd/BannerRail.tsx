import { useEffect, useState, useCallback, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import banner1 from "@/assets/banner-1.png";
import banner2 from "@/assets/banner-2.png";
import banner3 from "@/assets/banner-3.png";

const banners = [
  { src: banner1, alt: "good food, pickd for you — food, snacks & drinks delivered to your stay" },
  { src: banner2, alt: "order from nearby favorites — fresh meals, snacks and drinks" },
  { src: banner3, alt: "scan. browse. order. — simple ordering for hotel guests" },
];

const AUTO_DELAY_MS = 4500;

export function BannerRail() {
  const [active, setActive] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el || el.clientWidth === 0) return;
    const index = Math.round(el.scrollLeft / el.clientWidth);
    if (index !== active && index >= 0 && index < banners.length) {
      setActive(index);
    }
  };

  const scrollToSlide = useCallback((index: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const targetIndex = Math.max(0, Math.min(index, banners.length - 1));
    el.scrollTo({
      left: targetIndex * el.clientWidth,
      behavior: "smooth",
    });
  }, []);

  const next = useCallback(() => {
    const nextIdx = (active + 1) % banners.length;
    scrollToSlide(nextIdx);
  }, [active, scrollToSlide]);

  const prev = useCallback(() => {
    const prevIdx = (active - 1 + banners.length) % banners.length;
    scrollToSlide(prevIdx);
  }, [active, scrollToSlide]);

  useEffect(() => {
    if (isPaused) return;
    // Check prefers-reduced-motion
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }
    const id = setInterval(next, AUTO_DELAY_MS);
    return () => clearInterval(id);
  }, [isPaused, next]);

  return (
    <section className="reveal mt-8" aria-label="pickd highlights">
      <div className="shell">
        <div
          className="relative w-full overflow-hidden rounded-2xl border border-border/60 bg-background shadow-[var(--shadow-lift)] group"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocus={() => setIsPaused(true)}
          onBlur={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
        >
          {/* Scrollable Track */}
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="no-scrollbar flex overflow-x-auto snap-x snap-mandatory scroll-smooth touch-pan-y"
          >
            {banners.map((b) => (
              <div key={b.src} className="w-full shrink-0 snap-start snap-always">
                <img
                  src={b.src}
                  alt={b.alt}
                  loading="lazy"
                  className="w-full h-auto object-cover select-none"
                />
              </div>
            ))}
          </div>

          {/* Desktop Navigation Arrows */}
          <button
            type="button"
            onClick={prev}
            disabled={active === 0}
            aria-label="Previous promotion"
            className="hidden md:flex absolute left-3 top-1/2 -translate-y-1/2 h-9 w-9 items-center justify-center rounded-full bg-card/90 border border-border/80 text-foreground shadow-md transition-all hover:bg-card hover:scale-105 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100 z-10 cursor-pointer"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <button
            type="button"
            onClick={next}
            disabled={active === banners.length - 1}
            aria-label="Next promotion"
            className="hidden md:flex absolute right-3 top-1/2 -translate-y-1/2 h-9 w-9 items-center justify-center rounded-full bg-card/90 border border-border/80 text-foreground shadow-md transition-all hover:bg-card hover:scale-105 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100 z-10 cursor-pointer"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          {/* Dot Indicators */}
          <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2 z-10">
            {banners.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Go to promotion slide ${i + 1}`}
                onClick={() => scrollToSlide(i)}
                className={cn(
                  "h-2 rounded-full transition-all duration-300 cursor-pointer",
                  i === active ? "w-6 bg-primary" : "w-2 bg-primary/40 hover:bg-primary/70",
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
