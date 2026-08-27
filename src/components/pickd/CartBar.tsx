import { Link, useRouterState } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { useCart } from "@/lib/cart";

export function CartBar() {
  const { count, subtotal } = useCart();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  if (count === 0 || pathname === "/cart" || pathname === "/checkout") return null;

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40 pb-4">
      <div className="shell pointer-events-auto">
        <Link
          to="/cart"
          className="slide-up flex items-center justify-between rounded-full bg-primary px-5 py-3.5 text-primary-foreground shadow-[var(--shadow-lift)] transition-transform active:scale-[0.99] sm:mx-auto sm:max-w-md"
        >
          <span className="text-sm font-semibold lowercase">
            {count} {count === 1 ? "item" : "items"} • ₹{subtotal}
          </span>
          <span className="flex items-center gap-1.5 text-sm font-bold lowercase">
            view pickd <ArrowRight className="h-4 w-4" />
          </span>
        </Link>
      </div>
    </div>
  );
}
