import banner1 from "@/assets/banner-1.png.asset.json";
import banner2 from "@/assets/banner-2.png.asset.json";
import banner3 from "@/assets/banner-3.png.asset.json";

const banners = [
  { src: banner1.url, alt: "good food, pickd for you — food, snacks & drinks delivered to your stay" },
  { src: banner2.url, alt: "order from nearby favorites — fresh meals, snacks and drinks" },
  { src: banner3.url, alt: "scan. browse. order. — simple ordering for hotel guests" },
];

export function BannerRail() {
  return (
    <section className="reveal mt-8" aria-label="pickd highlights">
      <div className="no-scrollbar flex snap-x snap-mandatory gap-3.5 overflow-x-auto px-5 pb-2 lg:mx-auto lg:max-w-[1240px]">
        {banners.map((b) => (
          <img
            key={b.src}
            src={b.src}
            alt={b.alt}
            loading="lazy"
            className="w-[86vw] max-w-[720px] shrink-0 snap-start rounded-2xl border border-border/60 object-cover shadow-[var(--shadow-lift)] sm:w-[560px]"
          />
        ))}
      </div>
    </section>
  );
}
