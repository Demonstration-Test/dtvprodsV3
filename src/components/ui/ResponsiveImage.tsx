import { assetUrl } from "../../lib/assets";

type ResponsiveImageProps = {
  basePath: string;
  widths: number[];
  alt: string;
  className?: string;
  sizes?: string;
  loading?: "eager" | "lazy";
  fetchPriority?: "high" | "low" | "auto";
};

function sourceSet(
  basePath: string,
  widths: number[],
  extension: "avif" | "webp",
) {
  return widths
    .map(
      (width) =>
        `${assetUrl(`${basePath}-${width}.${extension}`)} ${width}w`,
    )
    .join(", ");
}

export function ResponsiveImage({
  basePath,
  widths,
  alt,
  className,
  sizes = "100vw",
  loading = "lazy",
  fetchPriority = "auto",
}: ResponsiveImageProps) {
  const fallbackWidth = widths.at(-1) ?? widths[0];
  return (
    <picture>
      <source
        type="image/avif"
        srcSet={sourceSet(basePath, widths, "avif")}
        sizes={sizes}
      />
      <source
        type="image/webp"
        srcSet={sourceSet(basePath, widths, "webp")}
        sizes={sizes}
      />
      <img
        alt={alt}
        className={className}
        src={assetUrl(`${basePath}-${fallbackWidth}.webp`)}
        loading={loading}
        fetchPriority={fetchPriority}
        decoding="async"
      />
    </picture>
  );
}
