import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import type { Product } from "@/data/menu";
import { ProductCard } from "./ProductCard";

interface Props {
  id?: string;
  title: string;
  subtitle?: string;
  items: Product[];
  onOpen: (p: Product) => void;
  seeAll?: { q?: string; cat?: string };
  layout?: "carousel" | "grid";
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
  if (items.length === 0) return null;

  return (
    <section id={id} className="reveal mt-10 scroll-mt-20">
      <div className="shell flex items-end justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold lowercase sm:text-2xl">{title}</h2>
          {subtitle && <p className="mt-0.5 text-sm lowercase text-muted-foreground">{subtitle}</p>}
        </div>
        {seeAll && (
          <Link
            to="/menu"
            search={{ q: seeAll.q ?? "", cat: seeAll.cat ?? "all" }}
            className="flex shrink-0 items-center gap-1 text-sm font-bold lowercase text-butter"
          >
            see all <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        )}
      </div>

      {layout === "carousel" ? (
        <div className="no-scrollbar mt-4 flex snap-x snap-mandatory gap-3.5 overflow-x-auto px-5 pb-2 lg:mx-auto lg:max-w-[1240px]">
          {items.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              onOpen={onOpen}
              className="w-[calc(72vw)] max-w-[260px] shrink-0 snap-start sm:w-[240px]"
            />
          ))}
        </div>
      ) : (
        <div className="shell mt-4 grid grid-cols-2 gap-3.5 md:grid-cols-3 lg:grid-cols-4">
          {items.map((p) => (
            <ProductCard key={p.id} product={p} onOpen={onOpen} />
          ))}
        </div>
      )}
    </section>
  );
}
