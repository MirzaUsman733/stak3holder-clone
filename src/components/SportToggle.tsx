import { useEffect, useState } from "react";
import { useMarket } from "../context/MarketContext";
import {
  NAV_SPORTS,
  marketSportToNavSport,
  navSportToMarketSport,
  type NavSport,
} from "../types";
import { SportIcon } from "./SportIcon";
import { cn } from "../lib/utils";

interface SportToggleProps {
  className?: string;
  variant?: "default" | "pill-bar";
}

export function SportToggle({ className, variant = "default" }: SportToggleProps) {
  const { sport, setSport } = useMarket();
  const [navSport, setNavSport] = useState<NavSport>(() =>
    marketSportToNavSport(sport),
  );

  useEffect(() => {
    setNavSport(marketSportToNavSport(sport));
  }, [sport]);

  function handleSelect(next: NavSport) {
    setNavSport(next);
    const marketSport = navSportToMarketSport(next);
    if (marketSport) {
      setSport(marketSport);
    }
  }

  const pills = NAV_SPORTS.map((id) => ({ id, label: id }));

  if (variant === "pill-bar") {
    return (
      <div
        className={cn(
          "flex items-center gap-1 overflow-x-auto rounded-full border border-foreground/70 px-1.5 py-1 no-scrollbar",
          className,
        )}
      >
        {pills.map(({ id, label }) => {
          const active = navSport === id;
          return (
            <button
              key={id}
              type="button"
              onClick={() => handleSelect(id)}
              className={cn(
                "flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1.5 text-[11px] font-bold transition-all sm:text-sm",
                active
                  ? "bg-surface-2 text-foreground"
                  : "text-muted-foreground hover:bg-surface-hover hover:text-foreground",
              )}
            >
              <SportIcon sport={id} className="h-4 w-4 sm:h-[18px] sm:w-[18px]" />
              {label}
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div className={cn("flex items-center gap-1", className)}>
      {pills.map(({ id, label }) => (
        <SportPill
          key={id}
          active={navSport === id}
          label={label}
          sport={id}
          onClick={() => handleSelect(id)}
        />
      ))}
    </div>
  );
}

function SportPill({
  active,
  label,
  sport,
  onClick,
}: {
  active: boolean;
  label: string;
  sport: NavSport;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-sm font-bold transition-all",
        active
          ? "bg-surface-2 text-foreground"
          : "text-muted-foreground hover:bg-surface-hover hover:text-foreground",
      )}
    >
      <SportIcon sport={sport} className="h-4 w-4" />
      {label}
    </button>
  );
}

export function getSportShortLabel(sport: NavSport) {
  return sport;
}
