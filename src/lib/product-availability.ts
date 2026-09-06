import type { Product } from "../data/menu";

export interface ProductWindow {
  start: number;
  end: number;
  label: string;
}

export interface ProductAvailability {
  isOrderable: boolean;
  message: string;
  windowLabel: string;
}

const WINDOWS = {
  breakfast: { start: 7 * 60, end: 9 * 60, label: "7:00 am–9:00 am" },
  lunchDinner: { start: 12 * 60, end: 22 * 60, label: "12:00 pm–10:00 pm" },
  evening: { start: 18 * 60, end: 22 * 60, label: "6:00 pm–10:00 pm" },
  lateDinner: { start: 19 * 60, end: 22 * 60 + 30, label: "7:00 pm–10:30 pm" },
  general: { start: 7 * 60, end: 22 * 60 + 30, label: "7:00 am–10:30 pm" },
} satisfies Record<string, ProductWindow>;

function indiaMinutes(now: Date): number {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Kolkata",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(now);
  const hour = Number(parts.find((part) => part.type === "hour")?.value ?? 0);
  const minute = Number(parts.find((part) => part.type === "minute")?.value ?? 0);
  return hour * 60 + minute;
}

function formatMinutes(value: number): string {
  const hours24 = Math.floor(value / 60);
  const minutes = value % 60;
  const period = hours24 >= 12 ? "pm" : "am";
  const hours12 = hours24 % 12 || 12;
  return `${hours12}:${minutes.toString().padStart(2, "0")} ${period}`;
}

export function scheduleFor(product: Product): ProductWindow {
  const name = product.name.toLowerCase();
  const category = product.category.toLowerCase();
  const searchable = `${name} ${category}`;

  if (product.source === "vendor-custom") {
    return WINDOWS.evening;
  }
  if (/\b(idli|idly|idiyappam|pongal|poori|poha|kichadi)\b/.test(name)) {
    return WINDOWS.breakfast;
  }
  if (/\b(dosa|uthappam|chapathi|chapati)\b/.test(searchable)) {
    return WINDOWS.evening;
  }
  if (/\b(meals|mini meals|special meals)\b/.test(name)) {
    return WINDOWS.lunchDinner;
  }
  if (/\b(biryani|biriyani)\b/.test(searchable)) {
    return WINDOWS.lunchDinner;
  }
  if (
    category.includes("crispy & grill") ||
    category.includes("shawarma & grill") ||
    /\b(grill|grilled|crispy|broasted|shawarma|tandoor|tandoori|popcorn|lollipop)\b/.test(
      searchable,
    )
  ) {
    return WINDOWS.lateDinner;
  }
  if (/\b(burger|sandwich|pizza|fries)\b/.test(searchable)) {
    return WINDOWS.evening;
  }
  if (product.category === "Drinks & Shakes" || product.category === "Sweet Cravings") {
    return WINDOWS.evening;
  }
  if (product.id === "stay-snack-box") {
    return WINDOWS.evening;
  }
  return WINDOWS.general;
}

export function getProductAvailability(product: Product, now = new Date()): ProductAvailability {
  if (!product.available) {
    return { isOrderable: false, message: "sold out for now", windowLabel: "" };
  }

  const window = scheduleFor(product);
  const current = indiaMinutes(now);
  const isOrderable = current >= window.start && current < window.end;
  const message = isOrderable
    ? `available now · ${window.label}`
    : current < window.start
      ? `available at ${formatMinutes(window.start)}`
      : `available tomorrow at ${formatMinutes(window.start)}`;

  return { isOrderable, message, windowLabel: window.label };
}

export function isProductOrderable(product: Product, now = new Date()): boolean {
  return getProductAvailability(product, now).isOrderable;
}

/** Stable ordering: products guests can order now always come first. */
export function orderAvailableFirst(products: Product[], now = new Date()): Product[] {
  return products
    .map((product, index) => ({ product, index, open: isProductOrderable(product, now) }))
    .sort((a, b) => Number(b.open) - Number(a.open) || a.index - b.index)
    .map(({ product }) => product);
}
