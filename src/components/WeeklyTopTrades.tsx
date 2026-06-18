import { useEffect, useMemo, useRef } from "react";
import { Calendar, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import type { Sport } from "../types";
import { useMarket } from "../context/MarketContext";
import { useCoinsMode } from "../context/CoinsModeContext";
import { getWeeklyTopStreaks, type StreakTrade } from "../data/weeklyTopStreaks";
import { cn } from "../lib/utils";

const CARD_WIDTH = 240;

function formatBetType(betType: string) {
  if (betType === "ML") return "Moneyline";
  return betType;
}

interface WeeklyTopTradesProps {
  sport?: Sport;
}

function StreakCard({ trade }: { trade: StreakTrade & { profit: number } }) {
  return (
    <article
      className={cn(
        "w-[230px] shrink-0 snap-start cursor-pointer overflow-hidden rounded-2xl border border-primary/50 bg-card shadow-glow-primary transition-all hover:border-primary hover:shadow-glow-primary-hover",
      )}
    >
      <div className="flex items-center gap-2.5 px-3 pb-2.5 pt-3">
        <div className="h-9 w-9 shrink-0 overflow-hidden rounded-full bg-secondary ring-1 ring-border/40">
          <img
            src={trade.avatar}
            alt={trade.username}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </div>
        <div className="min-w-0">
          <p className="truncate text-[14px] font-extrabold leading-tight text-foreground">
            {trade.username}
          </p>
          <p className="mt-0.5 text-[10px] font-semibold leading-tight tracking-wide text-muted-foreground">
            {formatBetType(trade.betType)} {trade.record}
          </p>
        </div>
      </div>

      <div className="h-px bg-border/30" />

      <div className="flex items-center gap-2.5 bg-muted/30 px-3 py-2.5">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-background p-1 ring-1 ring-border/40">
          <img
            src={trade.teamLogo}
            alt={trade.team}
            className="h-full w-full object-contain"
            loading="lazy"
          />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[15px] font-extrabold leading-tight text-success">
            +${trade.profit.toFixed(2)}
          </p>
          <div className="mt-0.5 flex items-center gap-1">
            <span
              className={cn(
                "shrink-0 whitespace-nowrap rounded-md px-1.5 py-0.5 text-[8.5px] font-extrabold leading-none",
                trade.side === "long"
                  ? "bg-success/15 text-success"
                  : "bg-destructive/15 text-destructive",
              )}
            >
              {trade.side === "long" ? "Buy/Back" : "Sell/Fade"}
            </span>
            <span className="truncate text-[10px] font-semibold leading-none text-muted-foreground">
              · Avg Odds {trade.odds}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}

export function WeeklyTopTrades({ sport: sportProp }: WeeklyTopTradesProps) {
  const { sport: marketSport } = useMarket();
  const sport = sportProp ?? marketSport;
  const { coinsMode } = useCoinsMode();
  const scrollRef = useRef<HTMLDivElement>(null);

  const trades = useMemo(
    () => getWeeklyTopStreaks(sport, coinsMode),
    [sport, coinsMode],
  );

  const carouselKey =
    coinsMode && sport === "mlb" ? "coins" : `cash-${sport}`;

  useEffect(() => {
    const el = scrollRef.current;
    if (!el || trades.length === 0) return;

    const halfWidth = trades.length * CARD_WIDTH;

    const timer = window.setInterval(() => {
      el.scrollBy({ left: CARD_WIDTH * 2, behavior: "smooth" });
      window.setTimeout(() => {
        if (el.scrollLeft >= halfWidth) {
          el.scrollLeft -= halfWidth;
        }
      }, 600);
    }, 7000);

    return () => window.clearInterval(timer);
  }, [trades, carouselKey]);

  if (trades.length === 0) return null;

  return (
    <section className="mt-2 mb-4 rounded-xl border border-primary/20 bg-gradient-to-br from-primary/5 to-background p-3 sm:p-4">
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

      <div
        ref={scrollRef}
        key={carouselKey}
        className="flex gap-2.5 overflow-x-auto pb-1 no-scrollbar"
      >
        {[...trades, ...trades].map((trade, index) => (
          <StreakCard
            key={`${trade.username}-${index}`}
            trade={trade}
          />
        ))}
      </div>
    </section>
  );
}
