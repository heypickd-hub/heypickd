import logoAsset from "@/assets/pickd-logo.png.asset.json";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <img
        src={logoAsset.url}
        alt="pickd"
        width={96}
        height={96}
        className="h-9 w-9 object-cover object-top"
      />
      <span className="text-xl font-extrabold lowercase tracking-tight">
        pick<span className="text-spark">d</span>
      </span>
    </span>
  );
}

export function Mascot({ className }: { className?: string }) {
  return (
    <img
      src={logoAsset.url}
      alt="pickd mascot"
      width={512}
      height={512}
      className={cn("object-contain", className)}
    />
  );
}
