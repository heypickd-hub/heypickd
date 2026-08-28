import { MessageCircle, Phone } from "lucide-react";
import { config } from "@/config";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-border/60 pb-28 pt-10 sm:pb-10">
      <div className="shell flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Logo />
          <p className="mt-1.5 text-sm lowercase text-muted-foreground">
            {config.brand.tagline}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <a
            href={`https://wa.me/${config.whatsappNumber}`}
            target="_blank"
            rel="noreferrer"
            aria-label="whatsapp"
            className="rounded-full border border-border p-2.5 transition-colors hover:bg-secondary"
          >
            <MessageCircle className="h-4 w-4 text-whatsapp" />
          </a>
          <a
            href={`tel:${config.phoneNumber}`}
            aria-label="call pickd"
            className="rounded-full border border-border p-2.5 transition-colors hover:bg-secondary"
          >
            <Phone className="h-4 w-4" />
          </a>
        </div>
      </div>
      <p className="shell mt-6 text-xs lowercase text-muted-foreground/80">
        menu availability may vary.
      </p>
    </footer>
  );
}
