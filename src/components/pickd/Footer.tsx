import { Link } from "@tanstack/react-router";
import { MessageCircle, Phone } from "lucide-react";
import { config } from "@/config";
import { useCart } from "@/lib/cart";
import { Logo } from "./Logo";

export function Footer() {
  const { count } = useCart();
  const hasCartBar = count > 0;

  return (
    <footer
      className={`mt-12 border-t border-border/60 pt-8 sm:pt-10 ${
        hasCartBar ? "pb-28 sm:pb-24" : "pb-8 sm:pb-10"
      }`}
    >
      <div className="shell flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        {/* Brand Column */}
        <div className="space-y-1">
          <Logo />
          <p className="text-xs sm:text-sm lowercase text-muted-foreground">
            {config.brand.tagline}
          </p>
        </div>

        {/* Links & Action Icons Column */}
        <div className="flex flex-wrap items-center gap-3 sm:gap-4">
          <Link
            to="/menu"
            search={{ q: "", cat: "all" }}
            className="inline-flex min-h-[44px] items-center text-xs sm:text-sm font-semibold lowercase text-muted-foreground hover:text-foreground transition-colors px-2 py-1"
          >
            menu
          </Link>
          <Link
            to="/combo-builder"
            className="inline-flex min-h-[44px] items-center text-xs sm:text-sm font-semibold lowercase text-muted-foreground hover:text-foreground transition-colors px-2 py-1"
          >
            combo builder
          </Link>

          <div className="flex items-center gap-2 pl-1">
            <a
              href={`https://wa.me/${config.whatsappNumber}`}
              target="_blank"
              rel="noreferrer"
              aria-label="whatsapp"
              className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-border/80 bg-card p-2.5 transition-colors hover:bg-secondary active:scale-95"
            >
              <MessageCircle className="h-4 w-4 text-whatsapp" />
            </a>
            <a
              href={`tel:${config.phoneNumber}`}
              aria-label="call pickd"
              className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-border/80 bg-card p-2.5 transition-colors hover:bg-secondary active:scale-95"
            >
              <Phone className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright & Disclaimer Row */}
      <div className="shell mt-6 border-t border-border/40 pt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1 text-[11px] sm:text-xs lowercase text-muted-foreground/80">
        <p>© {new Date().getFullYear()} pickd. all rights reserved.</p>
        <p>menu availability may vary.</p>
      </div>
    </footer>
  );
}
