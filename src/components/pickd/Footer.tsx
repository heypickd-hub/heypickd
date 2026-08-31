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
      className={`mt-4 sm:mt-10 border-t border-border/40 pt-3 sm:pt-8 ${
        hasCartBar ? "pb-20 sm:pb-24" : "pb-3 sm:pb-8"
      }`}
    >
      <div className="shell flex flex-wrap items-center justify-between gap-x-3 gap-y-1.5 text-xs">
        {/* Brand Logo & Copyright */}
        <div className="flex items-center gap-2">
          <Logo />
          <span className="text-[10px] text-muted-foreground/60">•</span>
          <p className="text-[10px] sm:text-xs text-muted-foreground/80 lowercase">
            © {new Date().getFullYear()} pickd
          </p>
        </div>

        {/* Links & Contact Icons */}
        <div className="flex items-center gap-2.5 sm:gap-4">
          <Link
            to="/menu"
            search={{ q: "", cat: "all" }}
            className="text-[11px] sm:text-xs font-semibold lowercase text-muted-foreground hover:text-foreground transition-colors"
          >
            menu
          </Link>
          <Link
            to="/combo-builder"
            className="text-[11px] sm:text-xs font-semibold lowercase text-muted-foreground hover:text-foreground transition-colors"
          >
            combo
          </Link>
          <a
            href={`https://wa.me/${config.whatsappNumber}`}
            target="_blank"
            rel="noreferrer"
            aria-label="whatsapp"
            className="rounded-full border border-border/60 bg-card p-1 text-muted-foreground hover:text-foreground transition-colors"
          >
            <MessageCircle className="h-3 w-3 text-whatsapp" />
          </a>
          <a
            href={`tel:${config.phoneNumber}`}
            aria-label="call pickd"
            className="rounded-full border border-border/60 bg-card p-1 text-muted-foreground hover:text-foreground transition-colors"
          >
            <Phone className="h-3 w-3" />
          </a>
        </div>
      </div>
    </footer>
  );
}
