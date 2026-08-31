import { config } from "@/config";
import type { ResolvedLine } from "@/lib/cart";

export interface OrderDetails {
  guestName: string;
  roomNumber: string;
  propertyName: string;
  propertyLocation: string;
  notes?: string | undefined;
}

export function buildOrderMessage(items: ResolvedLine[], details: OrderDetails) {
  const lines = items.flatMap((l) => {
    const head = `• ${l.qty} × ${l.product.name} — ₹${l.lineTotal}${l.note ? ` (${l.note})` : ""}`;
    return l.custom ? [head, `   ↳ ${l.custom.parts.join(", ")}`] : [head];
  });
  const total = items.reduce((n, l) => n + l.lineTotal, 0);
  const cleanNotes = details.notes?.trim();

  return [
    "hey pickd 👋 i'm hungry!",
    "",
    "here's my order 🍽️",
    ...lines,
    "",
    `total: ₹${total} 💸`,
    "",
    `name: ${details.guestName}`,
    `room: ${details.roomNumber} 🛎️`,
    `hotel: ${details.propertyName} 🏨`,
    `location: ${details.propertyLocation} 📍`,
    ...(cleanNotes ? [`notes: ${cleanNotes}`] : []),
    "",
    "pickd for me, please 🧡",
  ].join("\n");
}

export interface AskRequest {
  item: string;
  quantity?: string | undefined;
  brand?: string | undefined;
  room: string;
  hotel: string;
  link?: string | undefined;
}

export function buildAskMessage(req: AskRequest) {
  return [
    "hey pickd 👋",
    "",
    "i need:",
    `item: ${req.item}`,
    ...(req.quantity ? [`quantity: ${req.quantity}`] : []),
    ...(req.brand ? [`preferred brand/shop: ${req.brand}`] : []),
    `hotel/branch: ${req.hotel}`,
    `room: ${req.room}`,
    ...(req.link ? [`reference: ${req.link}`] : []),
    "",
    "please check and send me the final price.",
  ].join("\n");
}

export function whatsappUrl(message: string) {
  return `https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
