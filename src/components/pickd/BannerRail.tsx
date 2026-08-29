import { useEffect, useState, useCallback } from "react";
import { cn } from "@/lib/utils";
import banner1 from "@/assets/banner-1.png";
import banner2 from "@/assets/banner-2.png";
import banner3 from "@/assets/banner-3.png";

const banners = [
  { src: banner1, alt: "good food, pickd for you — food, snacks & drinks delivered to your stay" },
  { src: banner2, alt: "order from nearby favorites — fresh meals, snacks and drinks" },
  { src: banner3, alt: "scan. browse. order. — simple ordering for hotel guests" },
];

const AUTO_DELAY_MS = 4000;

export function BannerRail() {
  const [active, setActive] = useState(0);

  const next = useCallback(() => {
    setActive((prev) => (prev + 1) % banners.length);
  }, []);

  useEffect(() => {
    const id = setInterval(next, AUTO_DELAY_MS);
    return () => clearInterval(id);
  }, [next]);

  return (
    <section className="reveal mt-8" aria-label="pickd highlights">
      <div className="shell">
        <div className="relative w-full overflow-hidden rounded-2xl border border-border/60 bg-background shadow-[var(--shadow-lift)]">
          <div
            className="flex transition-transform duration-700 ease-out will-change-transform"
            style={{ transform: `translateX(-${active * 100}%)` }}
          >
            {banners.map((b) => (
              <img
                key={b.src}
                src={b.src}
                alt={b.alt}
                loading="lazy"
                className="w-full shrink-0 object-cover"
              />
            ))}
          </div>

          <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2">
            {banners.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Show banner ${i + 1}`}
                onClick={() => setActive(i)}
                className={cn(
                  "h-2 rounded-full transition-all duration-300",
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
