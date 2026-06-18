import { cn } from "../../lib/utils";

export function Skeleton({
  className,
}: {
  className?: string;
}) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-muted",
        className,
      )}
    />
  );
}

export function ApRankBadge({
  rank,
  size = "xs",
}: {
  rank: number;
  size?: "xs" | "sm" | "md";
}) {
  const sizeClass =
    size === "md"
      ? "h-[18px] px-1.5 text-[9.5px]"
      : size === "sm"
        ? "h-4 px-1 text-[9px]"
        : "h-4 px-1 text-[9px]";

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full bg-primary/15 font-bold text-primary",
        sizeClass,
      )}
    >
      #{rank}
    </span>
  );
}

export function TeamAvatar({
  src,
  alt,
  bgColor,
  size = "md",
}: {
  src: string;
  alt: string;
  bgColor: string;
  size?: "sm" | "md";
}) {
  const dimension = size === "sm" ? "h-8 w-8" : "h-10 w-10";

  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center overflow-hidden rounded-full p-1",
        dimension,
      )}
      style={{ backgroundColor: bgColor }}
    >
      <img src={src} alt={alt} className="h-full w-full object-contain" loading="lazy" />
    </div>
  );
}

export function PriceDisplay({
  price,
  className,
}: {
  price: number;
  className?: string;
}) {
  return (
    <span className={cn("font-mono font-bold tabular-nums", className)}>
      ${price.toFixed(2)}
    </span>
  );
}

export function ChangeBadge({
  value,
  size = "sm",
  variant = "default",
  className,
}: {
  value: number | null | undefined;
  size?: "xs" | "sm";
  variant?: "default" | "sidebar";
  className?: string;
}) {
  if (value == null || Number.isNaN(value)) {
    return (
      <span className="text-xs text-muted-foreground">
        {variant === "sidebar" ? "" : "-"}
      </span>
    );
  }

  const precision = size === "xs" ? 1 : 2;
  const magnitude = Number(Math.abs(value).toFixed(precision));
  const isFlat = magnitude === 0;
  const isUp = value > 0;
  const textSize = size === "xs" ? "text-xs" : "text-sm";

  const colorClass =
    variant === "sidebar"
      ? isFlat
        ? "text-muted-foreground"
        : isUp
          ? "text-emerald-400"
          : "text-red-400"
      : isFlat
        ? "text-muted-foreground"
        : isUp
          ? "text-success"
          : "text-red-600 dark:text-red-400";

  if (isFlat) {
    return (
      <span
        className={cn(
          "font-semibold tabular-nums",
          textSize,
          colorClass,
          className,
        )}
      >
        0.0%
      </span>
    );
  }

  return (
    <span
      className={cn(
        "font-semibold tabular-nums",
        textSize,
        colorClass,
        variant === "sidebar" && "block",
        className,
      )}
    >
      {isUp ? "▲ " : "▼ "}
      {magnitude.toFixed(precision)}%
    </span>
  );
}
