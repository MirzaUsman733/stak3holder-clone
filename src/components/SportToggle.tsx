import type { ReactNode } from "react";
import { useMarket } from "../context/MarketContext";
import type { Sport } from "../types";
import { cn } from "../lib/utils";

function BasketballIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
      <path d="M12 2v20M2 12h20" stroke="currentColor" strokeWidth="1.5" />
      <path d="M5 5c3 3 7 7 14 14M19 5C16 8 12 12 5 19" stroke="currentColor" strokeWidth="1.5" fill="none" />
    </svg>
  );
}

function FootballIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <ellipse cx="12" cy="12" rx="10" ry="6" stroke="currentColor" strokeWidth="2" fill="none" transform="rotate(-45 12 12)" />
      <path d="M8 8l8 8M9 11l2-2M13 15l2-2M11 13l2-2" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export function SportToggle({ className }: { className?: string }) {
  const { sport, setSport } = useMarket();

  return (
    <div className={cn("flex items-center gap-1", className)}>
      <SportPill
        active={sport === "cbb"}
        label="CBB"
        icon={<BasketballIcon className="h-4 w-4" />}
        onClick={() => setSport("cbb")}
      />
      <SportPill
        active={sport === "cfb"}
        label="CFB"
        icon={<FootballIcon className="h-4 w-4" />}
        onClick={() => setSport("cfb")}
      />
    </div>
  );
}

function SportPill({
  active,
  label,
  icon,
  onClick,
}: {
  active: boolean;
  label: string;
  icon: ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium transition-colors",
        active
          ? "bg-primary/10 text-primary"
          : "text-muted-foreground hover:bg-muted hover:text-foreground",
      )}
    >
      {icon}
      {label}
    </button>
  );
}

export function getSportShortLabel(sport: Sport) {
  return sport === "cbb" ? "CBB" : "CFB";
}
