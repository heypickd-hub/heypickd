import { useState } from "react";
import { MessageCircle } from "lucide-react";
import { Mascot } from "./Logo";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { config } from "@/config";
import { buildAskMessage, whatsappUrl } from "@/lib/whatsapp";
import { track } from "@/lib/analytics";
import { useCart } from "@/lib/cart";
import { cn } from "@/lib/utils";

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
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-bold lowercase text-primary-foreground transition-transform active:scale-[0.98] z-10 shrink-0"
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
  const [link, setLink] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!item.trim() || !room.trim()) return;

    const message = buildAskMessage({
      item,
      quantity: quantity || undefined,
      brand: brand || undefined,
      room,
      hotel: branch || config.hotelBranch,
      link: link || undefined,
    });

    track("ask_pickd_sent", { item, room });

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
      <DialogContent className="max-w-md rounded-3xl p-6 border-border/70 bg-card">
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
                placeholder="e.g. 302"
                className="w-full rounded-xl border border-input bg-background px-3.5 py-2.5 text-sm outline-none focus:border-butter"
              />
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
              className="w-full rounded-full bg-primary py-3.5 text-sm font-bold lowercase text-primary-foreground transition-transform active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
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
