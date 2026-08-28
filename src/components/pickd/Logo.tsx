import mascotAsset from "@/assets/pickd-mascot.png.asset.json";
import wordmarkAsset from "@/assets/pickd-wordmark.png.asset.json";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <img
        src={wordmarkAsset.url}
        alt="pickd"
        width={1329}
        height={941}
        className="h-9 w-auto object-contain"
      />
    </span>
  );
}

export function Mascot({ className }: { className?: string }) {
  return (
    <img
      src={mascotAsset.url}
      alt="pickd mascot"
      width={512}
      height={512}
      className={cn("object-contain", className)}
    />
  );
}
