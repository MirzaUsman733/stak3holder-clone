import { Activity } from "lucide-react";
import type { Sport, TrendingItem } from "../types";
import { getTrendingChangeKey } from "../types";
import { ChangeBadge, TeamAvatar } from "./ui/primitives";

interface TrendingSidebarProps {
  items: TrendingItem[];
  sport: Sport;
  isLoading?: boolean;
}

function getTrendingChange(item: TrendingItem, sport: Sport) {
  return item[getTrendingChangeKey(sport)];
}

export function TrendingSidebar({
  items,
  sport,
  isLoading,
}: TrendingSidebarProps) {
  return (
    <div className="hidden lg:col-span-1 lg:block">
      <div className="h-full rounded-2xl border border-border bg-card p-5">
        <h3 className="mb-4 flex items-center gap-2 font-bold">
          <Activity className="h-5 w-5" />
          Trending
        </h3>
        <div className="flex flex-col gap-1">
          {isLoading
            ? Array.from({ length: 9 }).map((_, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 rounded-xl p-3"
                >
                  <div className="h-10 w-10 animate-pulse rounded-full bg-muted" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 w-24 animate-pulse rounded bg-muted" />
                    <div className="h-3 w-16 animate-pulse rounded bg-muted" />
                  </div>
                </div>
              ))
            : items.slice(0, 9).map((item) => {
                const change = getTrendingChange(item, sport);

                return (
                  <button
                    key={item.id}
                    type="button"
                    className="flex w-full items-center gap-3 rounded-xl p-3 text-left transition-colors hover:bg-muted/50"
                  >
                    <TeamAvatar
                      src={item.logoUrl}
                      alt={item.name}
                      bgColor={item.primaryColor}
                    />
                    <div className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-semibold">
                        {item.name}
                      </span>
                      <span className="block truncate text-xs text-muted-foreground">
                        {item.conference}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="block text-sm font-bold tabular-nums">
                        ${item.price.toFixed(2)}
                      </span>
                      {change != null && (
                        <ChangeBadge
                          value={change}
                          size="xs"
                          variant="sidebar"
                        />
                      )}
                    </div>
                  </button>
                );
              })}
        </div>
      </div>
    </div>
  );
}
