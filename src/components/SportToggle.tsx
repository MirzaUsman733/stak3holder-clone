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
        "flex min-w-0 items-center gap-0.5 overflow-x-auto no-scrollbar",
        "lg:rounded-full lg:border lg:border-border/70 lg:px-1.5 lg:py-1",
        className,
      )}
    >
      {SPORTS.map((option) => (
        <SportPill
          key={option.id}
          active={sport === option.id}
          label={option.shortLabel}
          icon={<SportIcon sport={option.id} className="h-4 w-4 shrink-0" />}
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
        "flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-md px-2.5 py-1.5 text-xs font-semibold transition-colors sm:px-3 sm:py-2 sm:text-sm",
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
