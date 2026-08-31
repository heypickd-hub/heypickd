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
      className={`mt-6 sm:mt-10 border-t border-border/60 pt-4 sm:pt-8 ${
        hasCartBar ? "pb-20 sm:pb-24" : "pb-4 sm:pb-8"
      }`}
    >
      <div className="shell flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-6">
        {/* Brand Column */}
        <div className="space-y-0.5">
          <Logo />
          <p className="text-[11px] sm:text-sm lowercase text-muted-foreground">
            {config.brand.tagline}
          </p>
        </div>

        {/* Links & Action Icons Column */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-4">
          <Link
            to="/menu"
            search={{ q: "", cat: "all" }}
            className="inline-flex items-center text-xs sm:text-sm font-semibold lowercase text-muted-foreground hover:text-foreground transition-colors px-1 py-1"
          >
            menu
          </Link>
          <Link
            to="/combo-builder"
            className="inline-flex items-center text-xs sm:text-sm font-semibold lowercase text-muted-foreground hover:text-foreground transition-colors px-1 py-1"
          >
            combo builder
          </Link>

          <div className="flex items-center gap-1.5 pl-1">
            <a
              href={`https://wa.me/${config.whatsappNumber}`}
              target="_blank"
              rel="noreferrer"
              aria-label="whatsapp"
              className="inline-flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full border border-border/80 bg-card p-1.5 transition-colors hover:bg-secondary active:scale-95"
            >
              <MessageCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-whatsapp" />
            </a>
            <a
              href={`tel:${config.phoneNumber}`}
              aria-label="call pickd"
              className="inline-flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full border border-border/80 bg-card p-1.5 transition-colors hover:bg-secondary active:scale-95"
            >
              <Phone className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright & Disclaimer Row */}
      <div className="shell mt-3 sm:mt-6 border-t border-border/40 pt-2.5 sm:pt-4 flex flex-row items-center justify-between gap-2 text-[10px] sm:text-xs lowercase text-muted-foreground/80">
        <p>© {new Date().getFullYear()} pickd. all rights reserved.</p>
        <p>menu availability may vary.</p>
      </div>
    </footer>
  );
}
