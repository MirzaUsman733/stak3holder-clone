import { useState } from "react";
import { BarChart3, Users } from "lucide-react";
import type { Sport, TrendingItem } from "../types";
import { TeamAvatar } from "./ui/primitives";
import { cn } from "../lib/utils";

interface TrendingSidebarProps {
  items: TrendingItem[];
  sport: Sport;
  isLoading?: boolean;
}

function getTrendingChange(item: TrendingItem, sport: Sport) {
  return sport === "cbb" ? item.change7d : item.change3m;
}

export function TrendingSidebar({
  items,
  sport,
  isLoading,
}: TrendingSidebarProps) {
  const [view, setView] = useState<"positions" | "traders">("positions");

  return (
    <div className="hidden w-72 shrink-0 lg:block">
      <div className="rounded-2xl border border-border/40 bg-surface-1 p-4 shadow-card-sm">
        <div className="mb-4 flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setView("positions")}
            className={cn(
              "flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-bold transition-all",
              view === "positions"
                ? "bg-surface-2 text-foreground shadow-card-sm"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            <BarChart3 className="h-3.5 w-3.5" />
            Top Positions
          </button>
          <button
            type="button"
            onClick={() => setView("traders")}
            className={cn(
              "flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-bold transition-all",
              view === "traders"
                ? "bg-surface-2 text-foreground shadow-card-sm"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            <Users className="h-3.5 w-3.5" />
            Top Traders
          </button>
        </div>

        {view === "positions" ? (
          <div className="space-y-0.5">
            {isLoading
              ? Array.from({ length: 8 }).map((_, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 rounded-xl px-3 py-2.5"
                  >
                    <div className="h-8 w-8 animate-pulse rounded-xl bg-muted" />
                    <div className="flex-1 space-y-2">
                      <div className="h-4 w-24 animate-pulse rounded bg-muted" />
                      <div className="h-3 w-16 animate-pulse rounded bg-muted" />
                    </div>
                  </div>
                ))
              : items.slice(0, 8).map((item) => {
                  const change = getTrendingChange(item, sport);
                  const isProfit = (change ?? 0) >= 0;

                  return (
                    <button
                      key={item.id}
                      type="button"
                      className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left transition-colors hover:bg-surface-hover"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={item.logoUrl}
                          alt={item.name}
                          className="h-8 w-8 rounded-xl bg-surface-2 p-0.5"
                        />
                        <div>
                          <p className="text-sm font-bold text-foreground">
                            {item.name}
                          </p>
                          <p className="text-xs font-medium text-muted-foreground">
                            {item.conference}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="block text-sm font-bold tabular-nums">
                          ${item.price.toFixed(2)}
                        </span>
                        {change != null && (
                          <p
                            className={cn(
                              "mt-1 font-mono text-xs font-bold",
                              isProfit ? "text-success" : "text-destructive",
                            )}
                          >
                            {isProfit ? "+" : ""}
                            {change.toFixed(1)}%
                          </p>
                        )}
                      </div>
                    </button>
                  );
                })}
          </div>
        ) : (
          <div className="space-y-0.5">
            {items.slice(0, 8).map((item, index) => (
              <div
                key={item.id}
                className="flex items-center justify-between rounded-xl px-3 py-2.5"
              >
                <div className="flex items-center gap-3">
                  <TeamAvatar
                    src={item.logoUrl}
                    alt={item.name}
                    bgColor={item.primaryColor}
                    size="sm"
                  />
                  <div>
                    <p className="text-sm font-bold text-foreground">
                      Trader #{index + 1}
                    </p>
                    <p className="text-xs font-medium text-muted-foreground">
                      {item.name}
                    </p>
                  </div>
                </div>
                <span className="rounded-lg bg-success/10 px-2 py-0.5 text-xs font-bold text-success">
                  OK
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
