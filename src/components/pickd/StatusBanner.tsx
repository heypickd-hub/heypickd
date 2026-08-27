import { isOpenNow, config } from "@/config";

export function StatusBanner() {
  if (isOpenNow()) return null;
  return (
    <div className="shell pt-4">
      <div className="rounded-2xl border border-border bg-secondary/60 px-4 py-3">
        <p className="text-sm font-bold lowercase">we're taking a break.</p>
        <p className="text-xs lowercase text-muted-foreground">
          ordering opens again soon — {config.openingTime} to {config.closingTime}.
        </p>
      </div>
    </div>
  );
}
