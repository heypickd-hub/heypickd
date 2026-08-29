type PickdEvent = "combo_started" | "combo_completed" | "ask_pickd_clicked" | "ask_pickd_sent";

/** Fire-and-forget analytics. No personal data is ever sent. */
export function track(event: PickdEvent, props: Record<string, string | number> = {}) {
  if (typeof window === "undefined") return;
  const w = window as unknown as {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    plausible?: (...args: unknown[]) => void;
  };
  try {
    w.gtag?.("event", event, props);
    w.plausible?.(event, { props });
    w.dataLayer?.push({ event, ...props });
  } catch {
    /* ignore */
  }
}
