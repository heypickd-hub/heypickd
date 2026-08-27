import { Minus, Plus, X } from "lucide-react";
import { useEffect, useState } from "react";
import type { Product } from "@/data/menu";
import { useCart } from "@/lib/cart";
import { FoodTypeDot } from "./FoodTypeDot";

interface Props {
  product: Product | null;
  onClose: () => void;
}

export function ProductSheet({ product, onClose }: Props) {
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const [note, setNote] = useState("");

  useEffect(() => {
    setQty(1);
    setNote("");
  }, [product?.id]);

  useEffect(() => {
    if (!product) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [product, onClose]);

  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
      <div
        className="absolute inset-0 bg-foreground/40 backdrop-blur-[2px]"
        onClick={onClose}
        aria-hidden
      />
      <div
        role="dialog"
        aria-label={product.name}
        className="slide-up relative z-10 max-h-[92vh] w-full overflow-y-auto rounded-t-3xl bg-card p-5 sm:max-w-md sm:rounded-3xl"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="close"
          className="absolute right-4 top-4 rounded-full bg-background/90 p-2 text-foreground transition-transform active:scale-90"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="overflow-hidden rounded-2xl bg-muted">
          <img
            src={product.image}
            alt={product.name}
            width={800}
            height={600}
            className="aspect-[4/3] w-full object-cover"
          />
        </div>

        <div className="mt-4 flex items-start gap-2">
          <FoodTypeDot type={product.foodType} className="mt-1.5" />
          <h2 className="text-lg font-extrabold leading-snug">{product.name}</h2>
        </div>
        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
          {product.description}
        </p>
        <p className="mt-2 text-lg font-extrabold">₹{product.price}</p>

        <div className="mt-4">
          <label
            htmlFor="pickd-note"
            className="text-xs font-semibold lowercase text-muted-foreground"
          >
            anything we should know?
          </label>
          <input
            id="pickd-note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="less spicy · no onion · extra sauce"
            className="mt-1.5 w-full rounded-xl border border-input bg-background px-3.5 py-2.5 text-sm outline-none placeholder:text-muted-foreground/70 focus:border-butter"
          />
        </div>

        <div className="mt-5 flex items-center gap-3">
          <div className="flex items-center gap-1 rounded-full border border-border bg-background p-1">
            <button
              type="button"
              aria-label="decrease"
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              className="rounded-full p-2 transition-transform active:scale-90"
            >
              <Minus className="h-3.5 w-3.5" />
            </button>
            <span className="w-6 text-center text-sm font-bold">{qty}</span>
            <button
              type="button"
              aria-label="increase"
              onClick={() => setQty((q) => q + 1)}
              className="rounded-full p-2 transition-transform active:scale-90"
            >
              <Plus className="h-3.5 w-3.5" />
            </button>
          </div>

          <button
            type="button"
            disabled={!product.available}
            onClick={() => {
              add(product.id, qty, note.trim() || undefined);
              onClose();
            }}
            className="flex-1 rounded-full bg-primary px-5 py-3 text-sm font-bold lowercase text-primary-foreground transition-transform active:scale-[0.98] disabled:opacity-50"
          >
            {product.available
              ? `add to pickd · ₹${product.price * qty}`
              : "sold out for now"}
          </button>
        </div>
      </div>
    </div>
  );
}
