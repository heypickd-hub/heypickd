import { Link, useNavigate } from "@tanstack/react-router";
import { Search, ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";
import { useCart } from "@/lib/cart";
import { cn } from "@/lib/utils";
import { FoodTypeSwitch } from "./FoodTypeSwitch";
import { Logo } from "./Logo";

export function Header() {
  const { count } = useCart();
  const navigate = useNavigate();
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur-md transition-all duration-300",
        compact ? "py-2" : "py-3.5",
      )}
    >
      <div className="shell flex items-center justify-between gap-4">
        <Link to="/" className="flex flex-col gap-0.5">
          <Logo />
          <span
            className={cn(
              "text-[11px] lowercase text-muted-foreground transition-all",
              compact && "h-0 overflow-hidden opacity-0",
            )}
          >
            delivering to your stay
          </span>
        </Link>

        <div className="flex items-center gap-1.5">
          <FoodTypeSwitch />
          <button
            type="button"
            aria-label="search food"
            onClick={() => navigate({ to: "/menu", search: { q: "", cat: "all" } })}
            className="rounded-full p-2.5 transition-colors hover:bg-secondary"
          >
            <Search className="h-5 w-5" />
          </button>
          <Link
            to="/cart"
            aria-label="view cart"
            className="relative rounded-full p-2.5 transition-colors hover:bg-secondary"
          >
            <ShoppingBag className="h-5 w-5" />
            {count > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-spark px-1 text-[10px] font-bold text-primary-foreground">
                {count}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
