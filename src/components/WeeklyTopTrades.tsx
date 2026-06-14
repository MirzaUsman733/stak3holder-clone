import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import type { TopTrade } from "../types/headlines";
import type { Sport, Team } from "../types";
import { useTopTrades } from "../hooks/useTopTrades";
import { Skeleton } from "./ui/primitives";

function TradeCard({ trade }: { trade: TopTrade }) {
  return (
    <button
      type="button"
      className="flex h-full w-full min-w-[180px] flex-col overflow-hidden rounded-2xl border border-border bg-card text-left shadow-md transition-transform hover:-translate-y-0.5"
    >
      <div className="flex items-center gap-2 bg-muted/50 px-3 py-2">
        {trade.avatarUrl ? (
          <img
            src={trade.avatarUrl}
            alt=""
            className="h-8 w-8 shrink-0 rounded-full object-cover"
          />
        ) : (
          <div
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
            style={{ backgroundColor: trade.avatarColor }}
          >
            {trade.username.slice(0, 1).toUpperCase()}
          </div>
        )}
        <span className="truncate text-sm font-bold">{trade.username}</span>
      </div>
      <div className="flex items-center gap-2 px-3 py-2">
        {trade.teamLogoUrl ? (
          <img
            src={trade.teamLogoUrl}
            alt=""
            className="h-8 w-8 rounded-full bg-muted object-contain p-0.5"
          />
        ) : (
          <div className="h-8 w-8 rounded-full bg-muted" />
        )}
        <span className="text-sm font-semibold text-emerald-500">
          +${trade.pnl.toFixed(2)}
        </span>
      </div>
    </button>
  );
}

function AllTimeDivider() {
  return (
    <div className="flex w-[60px] shrink-0 flex-col items-center justify-center self-stretch py-1">
      <div className="w-px flex-1 bg-border" />
      <span className="py-2 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground [writing-mode:vertical-lr] rotate-180">
        All Time
      </span>
      <div className="w-px flex-1 bg-border" />
    </div>
  );
}

interface WeeklyTopTradesProps {
  sport: Sport;
  teamByToken: Map<string, Team>;
}

export function WeeklyTopTrades({ sport, teamByToken }: WeeklyTopTradesProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const { weeklyTrades, allTimeTrades, isLoading } = useTopTrades(
    sport,
    teamByToken,
  );

  const weekly = weeklyTrades.slice(0, 5);
  const allTime = allTimeTrades.slice(0, 5);

  const updateScrollState = useCallback(() => {
    const node = scrollRef.current;
    if (!node) return;

    setCanScrollPrev(node.scrollLeft > 4);
    setCanScrollNext(
      node.scrollLeft + node.clientWidth < node.scrollWidth - 4,
    );
  }, []);

  useEffect(() => {
    updateScrollState();
    const node = scrollRef.current;
    if (!node) return;

    node.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);

    const observer =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(updateScrollState)
        : null;
    observer?.observe(node);

    return () => {
      node.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
      observer?.disconnect();
    };
  }, [weekly, allTime, isLoading, updateScrollState]);

  function scrollByDirection(direction: "prev" | "next") {
    const node = scrollRef.current;
    if (!node) return;

    const amount = Math.max(node.clientWidth * 0.75, 240);
    node.scrollBy({
      left: direction === "next" ? amount : -amount,
      behavior: "smooth",
    });
  }

  if (!isLoading && weekly.length === 0 && allTime.length === 0) {
    return null;
  }

  return (
    <section className="mb-4">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-lg font-bold">
          <CalendarDays className="h-5 w-5" />
          Weekly Top Trades
        </h2>
        <Link
          to="/leaderboard?tab=weekly"
          className="flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <span className="hidden md:inline">View Full Leaderboard</span>
          <span className="md:hidden">Leaderboard</span>
          <ChevronRight className="h-4 w-4" />
        </Link>
      </div>

      {isLoading ? (
        <div className="flex gap-3 overflow-x-auto pb-2">
          {Array.from({ length: 5 }).map((_, index) => (
            <Skeleton
              key={index}
              className="h-[88px] min-w-[180px] shrink-0 rounded-2xl"
            />
          ))}
        </div>
      ) : (
        <div className="group relative">
          <div
            ref={scrollRef}
            className="flex items-stretch gap-3 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {weekly.map((trade) => (
              <div
                key={trade.id}
                className="shrink-0 basis-[40%] md:basis-[20%] lg:basis-[15%]"
              >
                <TradeCard trade={trade} />
              </div>
            ))}

            {allTime.length > 0 && <AllTimeDivider />}

            {allTime.map((trade) => (
              <div
                key={trade.id}
                className="shrink-0 basis-[40%] md:basis-[20%] lg:basis-[15%]"
              >
                <TradeCard trade={trade} />
              </div>
            ))}
          </div>

          {canScrollPrev && (
            <button
              type="button"
              aria-label="Scroll previous trades"
              onClick={() => scrollByDirection("prev")}
              className="absolute bottom-0 left-0 top-0 z-10 hidden w-10 cursor-pointer items-center justify-center bg-black/60 opacity-0 transition-opacity group-hover:opacity-100 md:flex"
            >
              <ChevronLeft className="h-6 w-6 text-white" />
            </button>
          )}

          {canScrollNext && (
            <button
              type="button"
              aria-label="Scroll next trades"
              onClick={() => scrollByDirection("next")}
              className="absolute bottom-0 right-0 top-0 z-10 hidden w-10 cursor-pointer items-center justify-center bg-black/60 opacity-0 transition-opacity group-hover:opacity-100 md:flex"
            >
              <ChevronRight className="h-6 w-6 text-white" />
            </button>
          )}
        </div>
      )}
    </section>
  );
}
