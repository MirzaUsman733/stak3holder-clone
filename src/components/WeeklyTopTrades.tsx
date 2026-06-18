import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Calendar, ChevronRight } from "lucide-react";
import type { TopTrade } from "../types/headlines";
import type { Sport, Team } from "../types";
import { useTopTrades } from "../hooks/useTopTrades";
import { Skeleton } from "./ui/primitives";
import { cn } from "../lib/utils";

function TradeCard({ trade }: { trade: TopTrade }) {
  return (
    <article className="w-[230px] shrink-0 snap-start overflow-hidden rounded-2xl border border-foreground/70 bg-surface-1 transition-colors hover:border-foreground">
      <div className="flex items-center gap-2.5 px-3 pb-2.5 pt-3">
        <div className="h-9 w-9 shrink-0 overflow-hidden rounded-full bg-surface-2 ring-1 ring-border/40">
          {trade.avatarUrl ? (
            <img
              src={trade.avatarUrl}
              alt={trade.username}
              className="h-full w-full object-cover"
            />
          ) : (
            <div
              className="flex h-full w-full items-center justify-center text-xs font-bold text-white"
              style={{ backgroundColor: trade.avatarColor }}
            >
              {trade.username.slice(0, 1).toUpperCase()}
            </div>
          )}
        </div>
        <div className="min-w-0">
          <p className="truncate text-[14px] font-extrabold leading-tight text-foreground">
            {trade.username}
          </p>
          <p className="mt-0.5 truncate text-[10px] font-semibold uppercase leading-tight tracking-wide text-muted-foreground">
            {trade.teamName}
          </p>
        </div>
      </div>

      <div className="h-px bg-border/30" />

      <div className="flex items-center gap-2.5 bg-surface-2/40 px-3 py-2.5">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-background p-1 ring-1 ring-border/40">
          {trade.teamLogoUrl ? (
            <img
              src={trade.teamLogoUrl}
              alt={trade.teamName}
              className="h-full w-full object-contain"
            />
          ) : (
            <div className="h-full w-full rounded-full bg-muted" />
          )}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[15px] font-extrabold leading-tight text-success">
            +${trade.pnl.toFixed(2)}
          </p>
          <p className="mt-0.5 truncate text-[10px] font-semibold leading-none text-muted-foreground">
            Weekly profit
          </p>
        </div>
      </div>
    </article>
  );
}

interface WeeklyTopTradesProps {
  sport: Sport;
  teamByToken: Map<string, Team>;
}

export function WeeklyTopTrades({ sport, teamByToken }: WeeklyTopTradesProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { weeklyTrades, isLoading } = useTopTrades(sport, teamByToken);
  const trades = weeklyTrades.slice(0, 10);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el || trades.length === 0) return;

    const cardWidth = 240;
    const halfWidth = trades.length * cardWidth;
    const timer = setInterval(() => {
      el.scrollBy({ left: cardWidth * 2, behavior: "smooth" });
      setTimeout(() => {
        if (el.scrollLeft >= halfWidth) {
          el.scrollLeft -= halfWidth;
        }
      }, 600);
    }, 7000);

    return () => clearInterval(timer);
  }, [trades]);

  if (!isLoading && trades.length === 0) {
    return null;
  }

  return (
    <section className="mt-2">
      <div className="mb-3 flex items-center justify-between px-0.5">
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-foreground" strokeWidth={2.5} />
          <h2 className="text-base font-extrabold tracking-tight text-foreground sm:text-lg">
            Weekly Top Streaks
          </h2>
        </div>
        <Link
          to="/leaderboard"
          className="flex items-center gap-0.5 text-[13px] font-semibold text-muted-foreground transition-colors hover:text-foreground"
        >
          Leaderboard
          <ChevronRight className="h-4 w-4" />
        </Link>
      </div>

      {isLoading ? (
        <div className="flex gap-2.5 overflow-x-auto px-3 pb-1 no-scrollbar">
          {Array.from({ length: 5 }).map((_, index) => (
            <Skeleton key={index} className="h-[120px] w-[230px] shrink-0 rounded-2xl" />
          ))}
        </div>
      ) : (
        <div
          ref={scrollRef}
          className={cn(
            "flex gap-2.5 overflow-x-auto px-3 pb-1 no-scrollbar",
            "-mx-3 sm:mx-0 sm:px-0",
          )}
        >
          {[...trades, ...trades].map((trade, index) => (
            <TradeCard key={`${trade.id}-${index}`} trade={trade} />
          ))}
        </div>
      )}
    </section>
  );
}
