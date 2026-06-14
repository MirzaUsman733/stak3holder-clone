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

interface TickerTrackProps {
  items: TickerItem[];
  speed?: number;
  className?: string;
}

function formatTickerChange(value: number | undefined) {
  if (value == null || Number.isNaN(value)) return undefined;

  const magnitude =
    Math.abs(value) >= 1000
      ? Math.abs(value)
      : Number(Math.abs(value).toFixed(2));

  const arrow = value > 0 ? "▲" : value < 0 ? "▼" : "";
  return `${arrow} ${magnitude}%`.trim();
}

function TickerTrack({ items, speed = 100, className }: TickerTrackProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const [trackWidth, setTrackWidth] = useState(0);

  useEffect(() => {
    const node = trackRef.current;
    if (!node) return;

    const measure = () => setTrackWidth(node.scrollWidth);
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
    if (prefersReducedMotion || speed <= 0 || trackWidth <= 0) return 0;
    return trackWidth / speed;
  }, [prefersReducedMotion, speed, trackWidth]);

  const loopItems = useMemo(
    () => (items.length ? [...items, ...items] : []),
    [items],
  );

  const animationStyle = useMemo(
    () =>
      prefersReducedMotion || duration <= 0
        ? { animation: "none" }
        : { animation: `ticker-left ${duration}s linear infinite` },
    [duration, prefersReducedMotion],
  );

  if (!items.length) return null;

  return (
    <div
      role="region"
      aria-label="Live ticker"
      className={cn(
        "group relative flex w-full items-center overflow-hidden",
        "before:pointer-events-none before:absolute before:inset-y-0 before:left-0 before:z-10 before:w-16 before:bg-gradient-to-r before:from-background before:via-background/80 before:to-transparent before:content-['']",
        "after:pointer-events-none after:absolute after:inset-y-0 after:right-0 after:z-10 after:w-16 after:bg-gradient-to-l after:from-background after:via-background/80 after:to-transparent after:content-['']",
        className,
      )}
    >
      <div className="flex w-full items-center">
        <div
          ref={trackRef}
          className={cn(
            "ticker-track flex min-w-max items-center gap-7",
            "[animation-play-state:running] group-hover:[animation-play-state:paused] group-focus-within:[animation-play-state:paused]",
          )}
          style={animationStyle}
        >
          {loopItems.map((item, index) => (
            <TickerPill key={`${item.id}-${index}`} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

function TickerPill({ item }: { item: TickerItem }) {
  const changeLabel = formatTickerChange(item.change);
  const changeClass =
    item.change == null || Number.isNaN(item.change)
      ? "text-muted-foreground"
      : item.change > 0
        ? "text-emerald-500"
        : item.change < 0
          ? "text-red-500"
          : "text-muted-foreground";

  return (
    <button
      type="button"
      className="flex min-h-[2.25rem] shrink-0 items-center gap-3 rounded-full bg-card/60 px-3 py-1.5 text-xs shadow-sm ring-1 ring-border transition-colors hover:bg-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
    >
      <img
        src={item.logoUrl}
        alt={item.label}
        className="h-6 w-6 shrink-0 rounded-full object-contain"
        loading="lazy"
      />
      <div className="flex flex-col items-start">
        <span className="text-sm font-medium text-foreground">
          {item.rank != null && item.rank > 0 && (
            <span className="mr-1 text-[0.8em] text-muted-foreground">
              {item.rank}
            </span>
          )}
          {item.label}
        </span>
      </div>
      <div className="ml-auto flex items-center gap-2">
        <span className="font-mono text-sm font-medium tabular-nums text-foreground">
          {item.price}
        </span>
        {changeLabel && (
          <span className={cn("font-mono text-xs tabular-nums", changeClass)}>
            {changeLabel}
          </span>
        )}
      </div>
    </button>
  );
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
  const items = useMemo<TickerItem[]>(() => {
    return teams
      .filter((team) => Number.isFinite(team.price))
      .sort((a, b) => b.price - a.price)
      .slice(0, 20)
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

  if (isLoading) {
    return (
      <div className="hidden border-y border-border/40 bg-background/60 py-2 backdrop-blur md:block">
        <div className="flex gap-3 overflow-hidden px-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="h-9 w-36 shrink-0 animate-pulse rounded-full bg-muted"
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <TickerTrack
      items={items}
      speed={100}
      className="hidden border-y border-border/40 bg-background/60 py-2 backdrop-blur md:block"
    />
  );
}
