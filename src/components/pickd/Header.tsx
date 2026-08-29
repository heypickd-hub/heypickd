import { Link, useNavigate, useLocation } from "@tanstack/react-router";
import { Search, ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";
import { useCart } from "@/lib/cart";
import { cn } from "@/lib/utils";
import { FoodTypeSwitch } from "./FoodTypeSwitch";
import { Logo } from "./Logo";

export function Header() {
  const { count } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === "/";
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      if (y > 30) {
        setCompact(true);
      } else if (y <= 10) {
        setCompact(false);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur-md transition-all duration-200",
        compact ? "py-2" : "py-2.5",
      )}
    >
      <div className="shell flex items-center justify-between gap-4">
        <Link to="/" replace={isHome} className="flex flex-col gap-0.5 select-none">
          <Logo imgClassName={cn("transition-all duration-200", compact ? "h-11" : "h-14")} />
          <span
            className={cn(
              "text-[11px] lowercase text-muted-foreground transition-all duration-200 leading-none",
              compact ? "hidden" : "block",
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
