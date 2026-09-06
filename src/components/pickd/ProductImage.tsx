interface ProductImageProps {
  src: string;
  alt: string;
  className?: string;
  loading?: "eager" | "lazy";
}

export function ProductImage({ src, alt, className, loading = "lazy" }: ProductImageProps) {
  return <img src={src} alt={alt} loading={loading} className={className} />;
}
