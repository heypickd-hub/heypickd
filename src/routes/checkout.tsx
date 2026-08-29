import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { MessageCircle, Phone } from "lucide-react";
import { useState } from "react";
import { config, isOpenNow } from "@/config";
import { useCart } from "@/lib/cart";
import { buildOrderMessage, whatsappUrl } from "@/lib/whatsapp";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "checkout — pickd" },
      {
        name: "description",
        content: "Just your name and room number — pickd sends the order over WhatsApp.",
      },
      { property: "og:title", content: "checkout — pickd" },
      {
        property: "og:description",
        content: "Name, room number, done. No accounts, no payment forms.",
      },
      { property: "og:url", content: "/checkout" },
    ],
    links: [{ rel: "canonical", href: "/checkout" }],
  }),
  component: CheckoutPage,
});

function CheckoutPage() {
  const { items, subtotal, branch } = useCart();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [notes, setNotes] = useState("");
  const [touched, setTouched] = useState(false);

  const open = isOpenNow();
  const hotel = branch ?? config.defaultBranch;
  const belowMinimum = subtotal < config.minimumOrder;
  const valid = name.trim().length > 0 && room.trim().length > 0;
  const canOrder = valid && open && !belowMinimum && items.length > 0;

  const handleOrder = () => {
    setTouched(true);
    if (!canOrder) return;
    const message = buildOrderMessage(items, {
      name: name.trim(),
      room: room.trim(),
      notes: notes.trim() || undefined,
      hotel,
    });
    window.open(whatsappUrl(message), "_blank", "noopener");
    navigate({ to: "/sent" });
  };

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
    <div className="shell max-w-lg pb-16 pt-6">
      <h1 className="text-2xl font-extrabold lowercase">almost done</h1>
      <p className="mt-1 text-sm lowercase text-muted-foreground">
        delivering to {hotel.toLowerCase()}
      </p>

      <div className="mt-6 space-y-4">
        <Field label="your name">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="chris"
            autoComplete="name"
            className="w-full rounded-xl border border-input bg-card px-4 py-3 text-sm outline-none focus:border-butter"
          />
        </Field>
        <Field label="room number">
          <input
            value={room}
            onChange={(e) => setRoom(e.target.value)}
            placeholder="204"
            inputMode="numeric"
            className="w-full rounded-xl border border-input bg-card px-4 py-3 text-sm outline-none focus:border-butter"
          />
        </Field>
        <Field label="anything we should know?">
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
            placeholder="less spicy please"
            className="w-full resize-none rounded-xl border border-input bg-card px-4 py-3 text-sm outline-none focus:border-butter"
          />
        </Field>
      </div>

      {touched && !valid && (
        <p className="mt-3 text-xs lowercase text-destructive">
          we just need your name and room number.
        </p>
      )}

      <div className="mt-6 rounded-2xl border border-border bg-card p-4">
        {items.map((line) => (
          <div key={line.id} className="py-1">
            <div className="flex justify-between text-sm">
              <span className="lowercase">
                {line.qty} × {line.product.name}
              </span>
              <span className="font-semibold">₹{line.lineTotal}</span>
            </div>
            {line.custom && (
              <p className="text-[11px] text-muted-foreground italic lowercase pl-3">
                ↳ {line.custom.parts.join(" + ")}
              </p>
            )}
          </div>
        ))}
        <div className="mt-2 flex justify-between border-t border-border pt-3 text-base font-extrabold">
          <span className="lowercase">total</span>
          <span>₹{subtotal}</span>
        </div>
      </div>

      {!open && (
        <p className="mt-4 text-sm lowercase text-muted-foreground">
          we're taking a break. ordering opens again soon.
        </p>
      )}

      <button
        type="button"
        onClick={handleOrder}
        disabled={!open || belowMinimum}
        className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-4 text-base font-bold lowercase text-primary-foreground transition-transform active:scale-[0.99] disabled:opacity-50"
      >
        <MessageCircle className="h-5 w-5 text-whatsapp" />
        order on WhatsApp
      </button>

      <p className="mt-4 text-center text-xs lowercase text-muted-foreground">
        prefer calling?{" "}
        <a href={`tel:${config.phoneNumber}`} className="font-bold text-foreground">
          <Phone className="mr-1 inline h-3 w-3" />
          call pickd
        </a>
      </p>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-xs font-semibold lowercase text-muted-foreground">{label}</span>
      <div className="mt-1.5">{children}</div>
    </label>
  );
}
