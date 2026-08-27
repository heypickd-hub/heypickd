import { config } from "@/config";
import type { ResolvedLine } from "@/lib/cart";

export interface OrderDetails {
  name: string;
  room: string;
  notes?: string | undefined;
  hotel: string;
}

export function buildOrderMessage(items: ResolvedLine[], details: OrderDetails) {
  const lines = items.map(
    (l) => `${l.qty} × ${l.product.name} — ₹${l.lineTotal}${l.note ? ` (${l.note})` : ""}`,
  );
  const total = items.reduce((n, l) => n + l.lineTotal, 0);

  return [
    "hey Pickd 👋",
    "",
    "I'd like to order:",
    ...lines,
    "",
    `total: ₹${total}`,
    `name: ${details.name}`,
    `room: ${details.room}`,
    `hotel: ${details.hotel}`,
    ...(details.notes ? [`notes: ${details.notes}`] : []),
  ].join("\n");
}

export function whatsappUrl(message: string) {
  return `https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
