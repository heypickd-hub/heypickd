export const config = {
  brand: {
    name: "pickd",
    tagline: "good food, pickd for you.",
  },
  /** WhatsApp number in international format, digits only. */
  whatsappNumber: import.meta.env.VITE_PICKD_WHATSAPP_NUMBER || "918939650130",
  /** Phone number for the tel: link. */
  phoneNumber: import.meta.env.VITE_PICKD_PHONE_NUMBER || "+916385349075",
  instagramUrl: "https://instagram.com/pickd",
  /** Minimum food order value in rupees. 0 = no minimum. */
  minimumOrder: 149,
  /** Fallback hotel/branch when the URL has no /h/<branch> segment. */
  defaultBranch: import.meta.env.VITE_PICKD_DEFAULT_BRANCH || "RedStone Hotel",
  /** Alias — the hotel/branch used across features. */
  hotelBranch: import.meta.env.VITE_PICKD_DEFAULT_BRANCH || "RedStone Hotel",
  /** Pickd handling fee added on top of a custom snack combo, in rupees. */
  comboServiceFee: 15,
  /** Feature switches. */
  comboEnabled: true,
  askPickdEnabled: true,
  /** Overall service hours in India time. Individual dishes have narrower windows. */
  openingTime: "07:00",
  closingTime: "22:30",
  /** Master switch — set true to stop taking orders. */
  ordersPaused: false,
} as const;

function toMinutes(value: string) {
  const parts = value.split(":").map(Number);
  return (parts[0] ?? 0) * 60 + (parts[1] ?? 0);
}

export function formatTime12Hour(value: string) {
  const parts = value.split(":").map(Number);
  let hours = parts[0] ?? 0;
  const minutes = parts[1] ?? 0;
  const period = hours >= 12 ? "pm" : "am";
  hours = hours % 12 || 12;
  const mins = minutes.toString().padStart(2, "0");
  return `${hours}:${mins} ${period}`;
}

export function isOpenNow(now = new Date()): boolean {
  if (config.ordersPaused) return false;
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Kolkata",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(now);
  const current =
    Number(parts.find((part) => part.type === "hour")?.value ?? 0) * 60 +
    Number(parts.find((part) => part.type === "minute")?.value ?? 0);
  const open = toMinutes(config.openingTime);
  const close = toMinutes(config.closingTime);
  return close > open ? current >= open && current < close : current >= open || current < close;
}

export function formatPrice(value: number) {
  return `₹${value}`;
}
