import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Minus, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { FoodTypeDot } from "@/components/pickd/FoodTypeDot";
import { ProductCard } from "@/components/pickd/ProductCard";
import { ProductSheet } from "@/components/pickd/ProductSheet";
import { config, isOpenNow } from "@/config";
import { upsellsFor, type Product } from "@/data/menu";
import { useCart } from "@/lib/cart";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "your pickd — pickd" },
      {
        name: "description",
        content: "Review everything you've pickd before sending your order on WhatsApp.",
      },
      { property: "og:title", content: "your pickd — pickd" },
      {
        property: "og:description",
        content: "Review your picks and send the order to your room.",
      },
      { property: "og:url", content: "/cart" },
    ],
    links: [{ rel: "canonical", href: "/cart" }],
  }),
  component: CartPage,
});

function CartPage() {
  const { items, subtotal, setQty, remove, setNote } = useCart();
  const [active, setActive] = useState<Product | null>(null);
  const open = isOpenNow();
  const remaining = Math.max(0, config.minimumOrder - subtotal);
  const upsells = upsellsFor(items.map((l) => l.product));

  if (items.length === 0) {
    return (
      <div className="shell flex min-h-[60vh] flex-col items-center justify-center text-center">
        <p className="text-xl font-extrabold lowercase">nothing pickd yet.</p>
        <Link
          to="/menu"
          search={{ q: "", cat: "all" }}
          className="mt-3 text-sm font-bold lowercase text-butter"
        >
          find something good ↓
        </Link>
      </div>
    );
  }

  return (
    <div className="pb-32 pt-6">
      <div className="shell">
        <h1 className="text-2xl font-extrabold lowercase">your pickd</h1>

        <div className="mt-4 space-y-3">
          {items.map((line) => (
            <div
              key={line.id}
              className="rounded-2xl border border-border/70 bg-card p-3.5"
            >
              <div className="flex gap-3">
                <img
                  src={line.product.image}
                  alt={line.product.name}
                  loading="lazy"
                  width={160}
                  height={160}
                  className="h-16 w-16 rounded-xl object-cover"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-start gap-2">
                    <FoodTypeDot type={line.product.foodType} className="mt-1" />
                    <h2 className="text-sm font-bold leading-snug">{line.product.name}</h2>
                  </div>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    ₹{line.product.price} each
                  </p>

                  <div className="mt-2 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-1 rounded-full border border-border p-0.5">
                      <button
                        type="button"
                        aria-label="decrease quantity"
                        onClick={() => setQty(line.id, line.qty - 1)}
                        className="rounded-full p-1.5 active:scale-90"
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span className="w-5 text-center text-sm font-bold">{line.qty}</span>
                      <button
                        type="button"
                        aria-label="increase quantity"
                        onClick={() => setQty(line.id, line.qty + 1)}
                        className="rounded-full p-1.5 active:scale-90"
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-extrabold">₹{line.lineTotal}</span>
                      <button
                        type="button"
                        aria-label={`remove ${line.product.name}`}
                        onClick={() => remove(line.id)}
                        className="rounded-full p-1.5 text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <input
                value={line.note ?? ""}
                onChange={(e) => setNote(line.id, e.target.value)}
                placeholder="anything we should know?"
                className="mt-3 w-full rounded-xl border border-input bg-background px-3 py-2 text-xs outline-none placeholder:text-muted-foreground/70 focus:border-butter"
              />
            </div>
          ))}
        </div>

        {remaining > 0 && (
          <div className="mt-5 rounded-2xl border border-border bg-secondary/50 p-4">
            <p className="text-sm font-bold lowercase">₹{remaining} away from your pickd</p>
            <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-background">
              <div
                className="h-full rounded-full bg-butter transition-all duration-500"
                style={{ width: `${Math.min(100, (subtotal / config.minimumOrder) * 100)}%` }}
              />
            </div>
            <p className="mt-2 text-xs lowercase text-muted-foreground">
              minimum order is ₹{config.minimumOrder} — fries, drinks and desserts get you
              there quickly.
            </p>
          </div>
        )}

        {upsells.length > 0 && (
          <div className="mt-8">
            <h2 className="text-lg font-extrabold lowercase">goes well with 👀</h2>
            <div className="mt-3 grid grid-cols-2 gap-3.5 md:grid-cols-4">
              {upsells.map((p) => (
                <ProductCard key={p.id} product={p} onOpen={setActive} />
              ))}
            </div>
          </div>
        )}

        <div className="mt-8 flex items-center justify-between border-t border-border pt-4">
          <span className="text-sm font-semibold lowercase text-muted-foreground">
            subtotal
          </span>
          <span className="text-xl font-extrabold">₹{subtotal}</span>
        </div>

        {!open && (
          <p className="mt-3 text-sm lowercase text-muted-foreground">
            we're taking a break — ordering opens again soon.
          </p>
        )}
      </div>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border/60 bg-background/95 py-3 backdrop-blur-md">
        <div className="shell sm:mx-auto sm:max-w-md">
          {remaining > 0 || !open ? (
            <button
              type="button"
              disabled
              className="w-full cursor-not-allowed rounded-full bg-muted px-5 py-3.5 text-sm font-bold lowercase text-muted-foreground"
            >
              {!open ? "ordering opens again soon" : `add ₹${remaining} more to continue`}
            </button>
          ) : (
            <Link
              to="/checkout"
              className="flex items-center justify-between rounded-full bg-primary px-5 py-3.5 text-primary-foreground transition-transform active:scale-[0.99]"
            >
              <span className="text-sm font-semibold lowercase">total ₹{subtotal}</span>
              <span className="flex items-center gap-1.5 text-sm font-bold lowercase">
                checkout <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          )}
        </div>
      </div>

      <ProductSheet product={active} onClose={() => setActive(null)} />
    </div>
  );
}
