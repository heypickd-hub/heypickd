import { useState, useEffect } from "react";
import { MessageCircle, Building2, MapPin } from "lucide-react";
import { Mascot } from "./Logo";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { PROPERTIES, findProperty, type Property } from "@/data/properties";
import { buildAskMessage, whatsappUrl } from "@/lib/whatsapp";
import { track } from "@/lib/analytics";
import { useCart } from "@/lib/cart";

export function AskPickdSection() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    track("ask_pickd_clicked");
    setOpen(true);
  };

  return (
    <>
      <section id="ask-pickd" className="reveal mt-10">
        <div className="shell">
          <div className="rounded-3xl border border-border/70 bg-card p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 justify-between relative overflow-hidden transition-all duration-300 hover:shadow-[var(--shadow-lift)]">
            <div className="flex flex-col md:flex-row items-center gap-5 text-center md:text-left z-10">
              <div className="flex justify-center shrink-0">
                <Mascot className="h-20 w-20 sm:h-24 sm:w-24 object-contain" />
              </div>
              <div className="space-y-1.5">
                <h2 className="text-xl font-extrabold lowercase sm:text-2xl">
                  need something? ask pickd.
                </h2>
                <p className="max-w-xl text-sm leading-relaxed text-muted-foreground lowercase">
                  tell us what you need. we'll check nearby, confirm the price, and get it for you.
                </p>

                {/* 3-step visual explainer */}
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-1.5 text-[11px] text-muted-foreground uppercase tracking-wider font-bold">
                  <div className="flex items-center gap-1.5">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-butter/10 text-butter text-[10px] font-bold">
                      1
                    </span>
                    tell us
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-butter/10 text-butter text-[10px] font-bold">
                      2
                    </span>
                    we check & quote
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-butter/10 text-butter text-[10px] font-bold">
                      3
                    </span>
                    you confirm
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={handleOpen}
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-bold lowercase text-primary-foreground transition-transform active:scale-[0.98] z-10 shrink-0 cursor-pointer"
            >
              <MessageCircle className="h-4 w-4 fill-current text-primary-foreground" />
              ask on WhatsApp
            </button>
          </div>
          <div className="mt-2 text-center">
            <span className="text-[11px] lowercase text-muted-foreground">
              price confirmed before purchase.
            </span>
          </div>
        </div>
      </section>

      <AskPickdModal open={open} onOpenChange={setOpen} />
    </>
  );
}

export function AskPickdModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const { branch } = useCart();
  const [item, setItem] = useState("");
  const [quantity, setQuantity] = useState("");
  const [brand, setBrand] = useState("");
  const [room, setRoom] = useState("");
  const [selectedPropertyId, setSelectedPropertyId] = useState<string>(() => {
    const resolved = findProperty(branch);
    return resolved ? resolved.id : PROPERTIES[0]!.id;
  });
  const [link, setLink] = useState("");

  useEffect(() => {
    if (branch) {
      const resolved = findProperty(branch);
      if (resolved) {
        setSelectedPropertyId(resolved.id);
      }
    }
  }, [branch]);

  const currentProperty: Property =
    PROPERTIES.find((p) => p.id === selectedPropertyId) || PROPERTIES[0]!;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!item.trim() || !room.trim() || !currentProperty) return;

    const message = buildAskMessage({
      item: item.trim(),
      quantity: quantity.trim() || undefined,
      brand: brand.trim() || undefined,
      room: room.trim(),
      propertyName: currentProperty.name,
      propertyLocation: currentProperty.location,
      link: link.trim() || undefined,
    });

    track("ask_pickd_sent", {
      item,
      room,
      hotel: currentProperty.name,
      location: currentProperty.location,
    });

    // Reset state & close
    setItem("");
    setQuantity("");
    setBrand("");
    setRoom("");
    setLink("");
    onOpenChange(false);

    window.open(whatsappUrl(message), "_blank");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md rounded-3xl p-6 border-border/70 bg-card max-h-[90vh] overflow-y-auto">
        <DialogHeader className="text-left space-y-1">
          <DialogTitle className="text-xl font-extrabold lowercase">ask pickd</DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground lowercase">
            tell us what you need. we'll check nearby, confirm the price, and get it for you.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="mt-2 space-y-4">
          <div className="space-y-1">
            <label htmlFor="ask-item" className="text-xs font-bold lowercase text-foreground">
              what do you need? <span className="text-destructive">*</span>
            </label>
            <input
              id="ask-item"
              type="text"
              required
              value={item}
              onChange={(e) => setItem(e.target.value)}
              placeholder="e.g. bread, oil, charger, shampoo..."
              className="w-full rounded-xl border border-input bg-background px-3.5 py-2.5 text-sm outline-none focus:border-butter"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label htmlFor="ask-qty" className="text-xs font-bold lowercase text-foreground">
                quantity
              </label>
              <input
                id="ask-qty"
                type="text"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="e.g. 1 packet, 2 units"
                className="w-full rounded-xl border border-input bg-background px-3.5 py-2.5 text-sm outline-none focus:border-butter"
              />
            </div>
            <div className="space-y-1">
              <label htmlFor="ask-room" className="text-xs font-bold lowercase text-foreground">
                room number <span className="text-destructive">*</span>
              </label>
              <input
                id="ask-room"
                type="text"
                required
                value={room}
                onChange={(e) => setRoom(e.target.value)}
                placeholder="e.g. 302 or 302A"
                className="w-full rounded-xl border border-input bg-background px-3.5 py-2.5 text-sm outline-none focus:border-butter"
              />
            </div>
          </div>

          {/* Hotel Selection */}
          <div className="space-y-1">
            <label htmlFor="ask-hotel" className="text-xs font-bold lowercase text-foreground">
              hotel <span className="text-destructive">*</span>
            </label>
            <div className="relative">
              <select
                id="ask-hotel"
                value={selectedPropertyId}
                onChange={(e) => setSelectedPropertyId(e.target.value)}
                className="w-full appearance-none rounded-xl border border-input bg-background px-3.5 py-2.5 text-sm outline-none focus:border-butter pr-9 cursor-pointer"
              >
                {PROPERTIES.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} — {p.location}
                  </option>
                ))}
              </select>
              <Building2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            </div>
          </div>

          {/* Registered Location Auto-filled */}
          <div className="space-y-1">
            <span className="text-xs font-bold lowercase text-foreground">location</span>
            <div className="flex items-center gap-2 rounded-xl border border-border/80 bg-secondary/50 px-3.5 py-2.5 text-sm text-foreground">
              <MapPin className="h-4 w-4 text-butter shrink-0" />
              <span className="font-semibold">{currentProperty.location}</span>
            </div>
          </div>

          <div className="space-y-1">
            <label htmlFor="ask-brand" className="text-xs font-bold lowercase text-foreground">
              preferred brand or shop
            </label>
            <input
              id="ask-brand"
              type="text"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              placeholder="e.g. amul, local supermarket"
              className="w-full rounded-xl border border-input bg-background px-3.5 py-2.5 text-sm outline-none focus:border-butter"
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="ask-link" className="text-xs font-bold lowercase text-foreground">
              add a photo or link
            </label>
            <input
              id="ask-link"
              type="text"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              placeholder="e.g. link to image/product"
              className="w-full rounded-xl border border-input bg-background px-3.5 py-2.5 text-sm outline-none focus:border-butter"
            />
            <p className="text-[10px] text-muted-foreground lowercase">
              or upload/attach directly on WhatsApp.
            </p>
          </div>

          <div className="flex flex-col gap-2 pt-2">
            <button
              type="submit"
              disabled={!item.trim() || !room.trim()}
              className="w-full rounded-full bg-primary py-3.5 text-sm font-bold lowercase text-primary-foreground transition-transform active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              send request
            </button>
            <p className="text-[11px] text-center lowercase text-muted-foreground">
              price confirmed before purchase.
            </p>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
