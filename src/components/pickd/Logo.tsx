import mascotImg from "@/assets/pickd-mascot.png";
import wordmarkImg from "@/assets/pickd-wordmark.png";
import { cn } from "@/lib/utils";

export function Logo({ className, imgClassName }: { className?: string; imgClassName?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <img
        src={wordmarkImg}
        alt="pickd"
        width={1329}
        height={941}
        className={cn("h-9 w-auto object-contain", imgClassName)}
      />
    </span>
  );
}

export function Mascot({ className }: { className?: string }) {
  return (
    <img
      src={mascotImg}
      alt="pickd mascot"
      width={512}
      height={512}
      className={cn("object-contain", className)}
    />
  );
}
