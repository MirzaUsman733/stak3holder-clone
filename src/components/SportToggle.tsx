import type { ReactNode } from "react";
import { useMarket } from "../context/MarketContext";
import { SPORTS } from "../types";
import { SportIcon } from "./SportIcon";
import { cn } from "../lib/utils";

export function SportToggle({ className }: { className?: string }) {
  const { sport, setSport } = useMarket();

  return (
    <div
      className={cn(
        "flex w-full touch-pan-y items-center justify-between overflow-hidden",
        "lg:w-auto lg:touch-auto lg:justify-start lg:gap-0.5",
        "lg:rounded-full lg:border lg:border-border/70 lg:px-1.5 lg:py-1",
        className,
      )}
    >
      {SPORTS.map((option) => (
        <SportPill
          key={option.id}
          active={sport === option.id}
          label={option.shortLabel}
          icon={<SportIcon sport={option.id} className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" />}
          onClick={() => setSport(option.id)}
        />
      ))}
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
      aria-pressed={active}
      className={cn(
        "flex min-w-0 flex-1 items-center justify-center gap-1 whitespace-nowrap rounded-md px-1 py-1.5 text-[10px] font-semibold transition-colors sm:gap-1.5 sm:px-2.5 sm:py-2 sm:text-xs lg:flex-none lg:shrink-0 lg:px-3 lg:text-sm",
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
