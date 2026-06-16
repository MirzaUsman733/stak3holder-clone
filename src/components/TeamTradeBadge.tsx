import type { HeadlineTeamTag } from "../types/headlines";
import { cn } from "../lib/utils";

interface TeamTradeBadgeProps {
  tag: HeadlineTeamTag;
  featured?: boolean;
  onClick?: () => void;
}

export function TeamTradeBadge({
  tag,
  featured = false,
  onClick,
}: TeamTradeBadgeProps) {
  const hasChange = tag.change != null;
  const isUp = (tag.change ?? 0) > 0;
  const isFlat = tag.change != null && Math.abs(tag.change) < 0.05;

  return (
    <button
      type="button"
      onClick={onClick}
      className="flex shrink-0 items-center transition-all hover:opacity-90 active:scale-[0.98]"
    >
      <div
        className={cn(
          "flex items-center justify-center rounded-l-full",
          featured
            ? "min-w-[100px] gap-1.5 px-2.5 py-2 md:min-w-[120px] md:gap-2 md:px-3.5 md:py-2.5"
            : "min-w-[62px] gap-1 px-2 py-2",
        )}
        style={{ backgroundColor: tag.primaryColor }}
      >
        {tag.rank != null && (
          <span
            className={cn(
              "font-semibold text-white drop-shadow-sm",
              featured ? "text-xs md:text-sm" : "text-xs",
            )}
            style={{ textShadow: "0 1px 2px rgba(0,0,0,0.3)" }}
          >
            {tag.rank}
          </span>
        )}
        <img
          src={tag.logoUrl}
          alt={tag.abbreviation}
          className={cn(
            "object-contain drop-shadow-[0_2px_3px_rgba(0,0,0,0.6)]",
            featured ? "h-4 w-4 md:h-6 md:w-6" : "h-4 w-4",
          )}
        />
        <span
          className={cn(
            "font-semibold text-white drop-shadow-sm",
            featured ? "text-xs md:text-sm" : "text-xs",
          )}
          style={{ textShadow: "0 1px 2px rgba(0,0,0,0.3)" }}
        >
          {tag.abbreviation}
        </span>
      </div>
      <div
        className={cn(
          "flex items-center justify-center rounded-r-full font-semibold",
          featured
            ? "min-w-[75px] bg-black px-3 py-1 md:min-w-[85px] md:px-4 md:py-1.5"
            : "min-w-[50px] bg-zinc-900 px-2 py-1",
        )}
      >
        {hasChange ? (
          <span
            className={cn(
              "text-xs font-semibold",
              isFlat
                ? "text-muted-foreground"
                : isUp
                  ? "text-success"
                  : "text-red-400",
            )}
          >
            {isUp ? "▲" : "▼"} {Math.abs(tag.change!).toFixed(1)}%
          </span>
        ) : (
          <span className="text-xs text-muted-foreground">-</span>
        )}
      </div>
    </button>
  );
}
