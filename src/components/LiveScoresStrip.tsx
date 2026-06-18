import { useEffect, useMemo, useState } from "react";
import { ChevronRight } from "lucide-react";
import {
  fetchAllLiveGames,
  LIVE_SCORE_LEAGUES,
  type LiveGame,
  type LiveGameWithSport,
  type LiveScoreSport,
} from "../lib/liveScores";
import { SportIcon } from "./SportIcon";
import { Skeleton } from "./ui/primitives";
import { cn } from "../lib/utils";
import type { Sport } from "../types";

type LeagueFilter = "ALL" | LiveScoreSport;

function GameCard({
  game,
  showSport,
}: {
  game: LiveGameWithSport | LiveGame;
  showSport: boolean;
}) {
  const sport = (game as LiveGameWithSport).sport;

  return (
    <div className="relative w-[160px] shrink-0 snap-start overflow-hidden rounded-2xl border border-border/40 bg-card p-2.5">
      <div className="mb-1.5 flex h-4 items-center justify-between gap-2">
        {showSport && sport ? (
          <span className="inline-flex items-center rounded-md bg-secondary px-1.5 py-0.5 text-[9px] font-extrabold uppercase tracking-wider text-muted-foreground">
            {sport.toUpperCase()}
          </span>
        ) : (
          <span />
        )}
        <span
          className={cn(
            "flex items-center gap-1 truncate text-[10px] font-extrabold uppercase tracking-wide",
            game.status === "live"
              ? "text-red-400"
              : game.status === "final"
                ? "text-muted-foreground"
                : "text-foreground/70",
          )}
        >
          {game.status === "live" && (
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-400" />
          )}
          {game.detail}
        </span>
      </div>

      <div className="flex items-center justify-between gap-2">
        <div className="flex min-w-0 items-center gap-1.5">
          {game.awayLogo && (
            <img
              src={game.awayLogo}
              alt=""
              className="h-5 w-5 shrink-0 object-contain"
            />
          )}
          <span
            className={cn(
              "truncate text-[12px] font-extrabold",
              game.status === "final" && game.homeWinning
                ? "text-muted-foreground"
                : "text-foreground",
            )}
          >
            {game.awayTicker || "—"}
          </span>
        </div>
        <span
          className={cn(
            "text-[15px] font-extrabold tabular-nums",
            game.status === "pre"
              ? "text-muted-foreground/40"
              : game.status === "final" && game.homeWinning
                ? "text-muted-foreground"
                : "text-foreground",
          )}
        >
          {game.status === "pre" ? "—" : game.awayScore}
        </span>
      </div>

      <div className="my-1.5 h-px bg-border/30" />

      <div className="flex items-center justify-between gap-2">
        <div className="flex min-w-0 items-center gap-1.5">
          {game.homeLogo && (
            <img
              src={game.homeLogo}
              alt=""
              className="h-5 w-5 shrink-0 object-contain"
            />
          )}
          <span
            className={cn(
              "truncate text-[12px] font-extrabold",
              game.status === "final" && !game.homeWinning
                ? "text-muted-foreground"
                : "text-foreground",
            )}
          >
            {game.homeTicker || "—"}
          </span>
        </div>
        <span
          className={cn(
            "text-[15px] font-extrabold tabular-nums",
            game.status === "pre"
              ? "text-muted-foreground/40"
              : game.status === "final" && !game.homeWinning
                ? "text-muted-foreground"
                : "text-foreground",
          )}
        >
          {game.status === "pre" ? "—" : game.homeScore}
        </span>
      </div>
    </div>
  );
}

export function LiveScoresStrip() {
  const [filter, setFilter] = useState<LeagueFilter>("ALL");
  const [games, setGames] = useState<LiveGameWithSport[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const data = await fetchAllLiveGames();
        if (!cancelled) {
          setGames(data);
          setHasError(false);
          setIsLoading(false);
        }
      } catch {
        if (!cancelled) {
          setHasError(true);
          setIsLoading(false);
        }
      }
    }

    load();
    const interval = window.setInterval(load, 300_000);
    return () => {
      cancelled = true;
      window.clearInterval(interval);
    };
  }, []);

  const availableLeagues = LIVE_SCORE_LEAGUES.filter((sport) =>
    games.some((game) => game.sport === sport),
  );

  const visibleGames = useMemo(
    () =>
      filter === "ALL" ? games : games.filter((game) => game.sport === filter),
    [filter, games],
  );

  const liveByLeague = useMemo(() => {
    const map: Record<string, number> = { ALL: 0 };
    for (const game of games) {
      if (game.status === "live") {
        map.ALL = (map.ALL ?? 0) + 1;
        map[game.sport] = (map[game.sport] ?? 0) + 1;
      }
    }
    return map;
  }, [games]);

  if (hasError) return null;
  if (!isLoading && games.length === 0) return null;

  const chips: { key: LeagueFilter; label: string }[] = [
    { key: "ALL", label: "All" },
    ...availableLeagues.map((sport) => ({
      key: sport as LeagueFilter,
      label: sport.toUpperCase(),
    })),
  ];

  return (
    <section>
      <div className="mb-2 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
        {chips.map((chip) => {
          const active = filter === chip.key;
          const count =
            chip.key === "ALL"
              ? games.length
              : games.filter((game) => game.sport === chip.key).length;
          const live = liveByLeague[chip.key] ?? 0;

          return (
            <button
              key={chip.key}
              type="button"
              onClick={() => setFilter(chip.key)}
              className={cn(
                "flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-extrabold uppercase tracking-wide transition-all",
                active
                  ? "bg-foreground text-background"
                  : "bg-secondary text-muted-foreground ring-1 ring-border/40 hover:text-foreground",
              )}
            >
              {live > 0 && (
                <span className="relative flex items-center justify-center">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-400" />
                  <span className="absolute h-1.5 w-1.5 animate-ping rounded-full bg-red-400/60" />
                </span>
              )}
              {chip.key !== "ALL" && (
                <SportIcon sport={chip.key as Sport} className="h-3.5 w-3.5" />
              )}
              {chip.label}
              <span
                className={cn(
                  "text-[10px] tabular-nums",
                  active ? "text-background/60" : "text-muted-foreground/60",
                )}
              >
                {count}
              </span>
            </button>
          );
        })}
        <button
          type="button"
          aria-label="See all live scores"
          className="-mr-1 ml-auto shrink-0 p-1 text-muted-foreground transition-colors hover:text-foreground"
        >
          <ChevronRight className="h-4 w-4" strokeWidth={2.5} />
        </button>
      </div>

      <div className="flex snap-x snap-mandatory gap-2 overflow-x-auto pb-1 no-scrollbar">
        {isLoading
          ? Array.from({ length: 4 }).map((_, index) => (
              <Skeleton
                key={index}
                className="h-[96px] w-[160px] shrink-0 snap-start rounded-2xl"
              />
            ))
          : visibleGames.length === 0
            ? (
              <div className="px-1 py-6 text-[12px] font-medium text-muted-foreground">
                No {filter === "ALL" ? "" : filter.toUpperCase()} games today.
              </div>
            )
            : visibleGames.map((game) => (
                <GameCard
                  key={`${game.sport}-${game.id}`}
                  game={game}
                  showSport={filter === "ALL"}
                />
              ))}
      </div>
    </section>
  );
}
