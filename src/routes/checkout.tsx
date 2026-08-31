import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { MessageCircle, Phone, MapPin, Building2 } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { config, isOpenNow } from "@/config";
import { PROPERTIES, findProperty, type Property } from "@/data/properties";
import { useCart } from "@/lib/cart";
import { buildOrderMessage, whatsappUrl } from "@/lib/whatsapp";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "checkout — pickd" },
      {
        name: "description",
        content: "Enter your name, room, and hotel branch to send your order over WhatsApp.",
      },
      { property: "og:title", content: "checkout — pickd" },
      {
        property: "og:description",
        content: "Name, room number, hotel stay. No accounts, no payment forms.",
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
  const [selectedPropertyId, setSelectedPropertyId] = useState<string>(() => {
    const resolved = findProperty(branch);
    return resolved ? resolved.id : PROPERTIES[0]!.id;
  });
  const [notes, setNotes] = useState("");
  const [touched, setTouched] = useState(false);

  const nameRef = useRef<HTMLInputElement>(null);
  const roomRef = useRef<HTMLInputElement>(null);
  const hotelRef = useRef<HTMLSelectElement>(null);

  // Update property if branch changes in context
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

  const open = isOpenNow();
  const belowMinimum = subtotal < config.minimumOrder;

  const isNameValid = name.trim().length > 0;
  const isRoomValid = room.trim().length > 0;
  const isHotelValid = Boolean(currentProperty);
  const valid = isNameValid && isRoomValid && isHotelValid;

  const canOrder = valid && open && !belowMinimum && items.length > 0;

  const handleOrder = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setTouched(true);

    if (!isNameValid) {
      nameRef.current?.focus();
      return;
    }
    if (!isRoomValid) {
      roomRef.current?.focus();
      return;
    }
    if (!isHotelValid) {
      hotelRef.current?.focus();
      return;
    }
    if (!canOrder) return;

    const message = buildOrderMessage(items, {
      guestName: name.trim(),
      roomNumber: room.trim(),
      propertyName: currentProperty.name,
      propertyLocation: currentProperty.location,
      notes: notes.trim() || undefined,
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
        delivering to <span className="font-bold text-foreground">{currentProperty.name}</span>
      </p>

      <form onSubmit={handleOrder} className="mt-6 space-y-4">
        {/* Guest Name */}
        <Field label="your name" required error={touched && !isNameValid ? "please enter your name." : undefined}>
          <input
            ref={nameRef}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Arun"
            autoComplete="name"
            className="w-full rounded-xl border border-input bg-card px-4 py-3 text-sm outline-none focus:border-butter"
          />
        </Field>

        {/* Room Number */}
        <Field label="room number" required error={touched && !isRoomValid ? "please enter your room number." : undefined}>
          <input
            ref={roomRef}
            value={room}
            onChange={(e) => setRoom(e.target.value)}
            placeholder="e.g. 204 or 204A"
            autoComplete="off"
            className="w-full rounded-xl border border-input bg-card px-4 py-3 text-sm outline-none focus:border-butter"
          />
        </Field>

        {/* Hotel / Property Selection */}
        <Field label="hotel" required error={touched && !isHotelValid ? "please select your hotel branch." : undefined}>
          <div className="relative">
            <select
              ref={hotelRef}
              value={selectedPropertyId}
              onChange={(e) => setSelectedPropertyId(e.target.value)}
              className="w-full appearance-none rounded-xl border border-input bg-card px-4 py-3 text-sm outline-none focus:border-butter pr-10 cursor-pointer"
            >
              {PROPERTIES.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} — {p.location}
                </option>
              ))}
            </select>
            <Building2 className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
          </div>
        </Field>

        {/* Registered Location (Auto-filled) */}
        <Field label="location">
          <div className="flex items-center gap-2 rounded-xl border border-border/80 bg-secondary/50 px-4 py-3 text-sm text-foreground">
            <MapPin className="h-4 w-4 text-butter shrink-0" />
            <span className="font-semibold">{currentProperty.location}</span>
          </div>
        </Field>

        {/* Optional Notes */}
        <Field label="anything we should know?">
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
            placeholder="e.g. less spicy please"
            className="w-full resize-none rounded-xl border border-input bg-card px-4 py-3 text-sm outline-none focus:border-butter"
          />
        </Field>

        <button type="submit" className="hidden" aria-hidden="true" />
      </form>

      {/* Order Summary Box */}
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
        onClick={() => handleOrder()}
        disabled={!open || belowMinimum}
        className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-4 text-base font-bold lowercase text-primary-foreground transition-transform active:scale-[0.99] disabled:opacity-50 cursor-pointer shadow-md hover:shadow-lg"
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

function Field({
  label,
  required,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string | null;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold lowercase text-muted-foreground">
          {label} {required && <span className="text-destructive">*</span>}
        </span>
        {error && <span className="text-[11px] text-destructive lowercase font-semibold">{error}</span>}
      </div>
      <div className="mt-1.5">{children}</div>
    </label>
  );
}
