import { useEffect, useMemo, useRef, useState } from "react";
import type { Sport, Team } from "../types";
import { cn } from "../lib/utils";

interface TickerItem {
  id: string;
  label: string;
  rank: number | null;
  price: string;
  change?: number;
  logoUrl: string;
}

function formatTickerChange(value: number | undefined) {
  if (value == null || Number.isNaN(value)) return undefined;
  const magnitude =
    Math.abs(value) >= 1000
      ? Math.abs(value)
      : Number(Math.abs(value).toFixed(2));
  const sign = value > 0 ? "+" : "";
  return `${sign}${magnitude}%`;
}

function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setPrefersReducedMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return prefersReducedMotion;
}

interface PriceTickerProps {
  teams: Team[];
  sport: Sport;
  isLoading?: boolean;
}

export function PriceTicker({ teams, sport, isLoading }: PriceTickerProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const [trackWidth, setTrackWidth] = useState(0);

  const items = useMemo<TickerItem[]>(() => {
    return teams
      .filter((team) => Number.isFinite(team.price))
      .sort((a, b) => b.price - a.price)
      .slice(0, 12)
      .map((team) => {
        const rawChange = sport === "cbb" ? team.change7d : team.change3m;
        const change =
          rawChange != null && Math.abs(rawChange) > 0.5 ? rawChange : undefined;

        return {
          id: team.id,
          label: team.abbreviation,
          rank: team.apRank,
          price: `$${team.price.toFixed(2)}`,
          change,
          logoUrl: team.logoUrl,
        };
      });
  }, [teams, sport]);

  useEffect(() => {
    const node = trackRef.current;
    if (!node) return;

    const measure = () => setTrackWidth(node.scrollWidth / 2);
    measure();

    if (typeof ResizeObserver !== "undefined") {
      const observer = new ResizeObserver(measure);
      observer.observe(node);
      window.addEventListener("resize", measure);
      return () => {
        observer.disconnect();
        window.removeEventListener("resize", measure);
      };
    }

    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [items]);

  const duration = useMemo(() => {
    if (prefersReducedMotion || trackWidth <= 0) return 0;
    return trackWidth / 40;
  }, [prefersReducedMotion, trackWidth]);

  const loopItems = useMemo(
    () => (items.length ? [...items, ...items] : []),
    [items],
  );

  if (isLoading) {
    return (
      <div className="hidden overflow-hidden border-b border-border/30 bg-surface-1 sm:block">
        <div className="flex gap-4 px-5 py-2.5">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="h-4 w-24 shrink-0 animate-pulse rounded bg-muted"
            />
          ))}
        </div>
      </div>
    );
  }

  if (!items.length) return null;

  return (
    <div className="hidden overflow-hidden border-b border-border/30 bg-surface-1 sm:block">
      <div
        ref={trackRef}
        className="flex whitespace-nowrap"
        style={
          duration > 0
            ? {
                animation: `ticker-left ${duration}s linear infinite`,
              }
            : undefined
        }
        onMouseEnter={(event) => {
          if (duration > 0) event.currentTarget.style.animationPlayState = "paused";
        }}
        onMouseLeave={(event) => {
          if (duration > 0) event.currentTarget.style.animationPlayState = "running";
        }}
      >
        {loopItems.map((item, index) => {
          const isProfit = (item.change ?? 0) > 0;
          const isLoss = (item.change ?? 0) < 0;

          return (
            <div
              key={`${item.id}-${index}`}
              className="flex shrink-0 items-center gap-2.5 px-4 py-2 sm:px-5 sm:py-2.5"
            >
              <img
                src={item.logoUrl}
                alt={item.label}
                className="h-4 w-4 rounded-full sm:h-5 sm:w-5"
              />
              <span className="text-[10px] font-bold text-foreground sm:text-xs">
                {item.label}
              </span>
              <span className="text-[10px] font-medium text-muted-foreground sm:text-xs">
                {item.price}
              </span>
              {item.change != null && (
                <span
                  className={cn(
                    "flex items-center gap-0.5 font-mono text-[10px] font-bold sm:text-xs",
                    isProfit && "text-success",
                    isLoss && "text-destructive",
                    !isProfit && !isLoss && "text-muted-foreground",
                  )}
                >
                  {formatTickerChange(item.change)}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
