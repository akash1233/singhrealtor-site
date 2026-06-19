interface ListingImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}

/** MLS photos come from varied CDN hosts — use native img for compatibility */
export function ListingImage({
  src,
  alt,
  className,
  priority,
}: ListingImageProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      className={className}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
    />
  );
}
