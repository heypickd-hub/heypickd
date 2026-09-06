import type { CSSProperties } from "react";
import {
  PRODUCT_IMAGE_COLUMNS,
  PRODUCT_IMAGE_INDEX,
  PRODUCT_IMAGE_ROWS,
} from "@/data/product-image-atlas";
import { cn } from "@/lib/utils";

interface ProductImageProps {
  src: string;
  alt: string;
  className?: string;
  loading?: "eager" | "lazy";
}

const PRODUCT_PATH = /^\/products\/(\d+)\.webp$/;

export function ProductImage({ src, alt, className, loading = "lazy" }: ProductImageProps) {
  const productId = PRODUCT_PATH.exec(src)?.[1];
  const index = productId ? PRODUCT_IMAGE_INDEX[productId] : undefined;

  if (index === undefined) {
    return <img src={src} alt={alt} loading={loading} className={className} />;
  }

  const column = index % PRODUCT_IMAGE_COLUMNS;
  const row = Math.floor(index / PRODUCT_IMAGE_COLUMNS);
  const style: CSSProperties = {
    backgroundImage: "url('/products-atlas.webp')",
    backgroundPosition: `${(column / (PRODUCT_IMAGE_COLUMNS - 1)) * 100}% ${(row / (PRODUCT_IMAGE_ROWS - 1)) * 100}%`,
    backgroundSize: `${PRODUCT_IMAGE_COLUMNS * 100}% ${PRODUCT_IMAGE_ROWS * 100}%`,
  };

  return (
    <span
      role={alt ? "img" : undefined}
      aria-label={alt || undefined}
      aria-hidden={alt ? undefined : true}
      className={cn("block bg-no-repeat", className)}
      style={style}
    />
  );
}
