export const config = {
  brand: {
    name: "pickd",
    tagline: "good food, pickd for you.",
  },
  /** WhatsApp number in international format, digits only. */
  whatsappNumber: "918939650130",
  /** Phone number for the tel: link. */
  phoneNumber: "+918939650130",
  instagramUrl: "https://instagram.com/pickd",
  /** Minimum food order value in rupees. */
  minimumOrder: 199,
  /** Fallback hotel/branch when the URL has no /h/<branch> segment. */
  defaultBranch: "Branch 1",
  /** 24h format, local time. */
  openingTime: "11:00",
  closingTime: "23:30",
  /** Master switch — set true to stop taking orders. */
  ordersPaused: false,
} as const;

function toMinutes(value: string) {
  const parts = value.split(":").map(Number);
  return (parts[0] ?? 0) * 60 + (parts[1] ?? 0);
}

export function isOpenNow(now = new Date()): boolean {
  if (config.ordersPaused) return false;
  const current = now.getHours() * 60 + now.getMinutes();
  const open = toMinutes(config.openingTime);
  const close = toMinutes(config.closingTime);
  return close > open
    ? current >= open && current < close
    : current >= open || current < close;
}

export function formatPrice(value: number) {
  return `₹${value}`;
}
