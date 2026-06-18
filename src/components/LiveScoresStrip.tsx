import { useEffect, useMemo, useState } from "react";
import { ChevronRight } from "lucide-react";
import {
  fetchAllLiveGames,
  LIVE_LEAGUES,
  type LiveGame,
  type LiveLeague,
} from "../lib/liveScores";
import { SportIcon } from "./SportIcon";
import { Skeleton } from "./ui/primitives";
import { cn } from "../lib/utils";
import type { NavSport } from "../types";

type LeagueFilter = "ALL" | LiveLeague;

interface GameWithSport extends LiveGame {
  sport: LiveLeague;
}

function GameCard({
  game,
  showSport,
  onClick,
}: {
  game: GameWithSport;
  showSport: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="relative w-[160px] shrink-0 snap-start overflow-hidden rounded-2xl border border-border/40 bg-surface-1 p-2.5 text-left transition-colors hover:border-foreground/30"
    >
      <div className="mb-1.5 flex h-4 items-center justify-between gap-2">
        {showSport ? (
          <span className="inline-flex items-center rounded-md bg-surface-2 px-1.5 py-0.5 text-[9px] font-extrabold uppercase tracking-wider text-muted-foreground/80">
            {game.sport}
          </span>
        ) : (
          <span />
        )}
        <span
          className={cn(
            "flex items-center gap-1 truncate text-[10px] font-extrabold uppercase tracking-wide",
            game.status === "live" && "text-destructive",
            game.status === "final" && "text-muted-foreground",
            game.status === "pre" && "text-foreground/70",
          )}
        >
          {game.status === "live" && (
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-destructive" />
          )}
          {game.detail}
        </span>
      </div>

      <div className="flex items-center justify-between gap-2">
        <div className="flex min-w-0 items-center gap-1.5">
          {game.awayLogo && (
            <img
              src={game.awayLogo}
              alt={game.awayTicker}
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
            game.status === "pre" && "text-muted-foreground/40",
            game.status === "final" &&
              game.homeWinning &&
              "text-muted-foreground",
            !(game.status === "pre") &&
              !(game.status === "final" && game.homeWinning) &&
              "text-foreground",
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
              alt={game.homeTicker}
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
            game.status === "pre" && "text-muted-foreground/40",
            game.status === "final" &&
              !game.homeWinning &&
              "text-muted-foreground",
            !(game.status === "pre") &&
              !(game.status === "final" && !game.homeWinning) &&
              "text-foreground",
          )}
        >
          {game.status === "pre" ? "—" : game.homeScore}
        </span>
      </div>
    </button>
  );
}

export function LiveScoresStrip() {
  const [filter, setFilter] = useState<LeagueFilter>("ALL");
  const [allGames, setAllGames] = useState<GameWithSport[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let timer: ReturnType<typeof setInterval> | undefined;

    async function load() {
      try {
        const games = await fetchAllLiveGames();
        if (!cancelled) {
          setAllGames(games);
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
    timer = setInterval(load, 60_000);

    return () => {
      cancelled = true;
      if (timer) clearInterval(timer);
    };
  }, []);

  const visibleGames = useMemo(
    () =>
      filter === "ALL"
        ? allGames
        : allGames.filter((game) => game.sport === filter),
    [allGames, filter],
  );

  const availableLeagues = LIVE_LEAGUES.filter((league) =>
    allGames.some((game) => game.sport === league),
  );

  const chips: { key: LeagueFilter; label: string }[] = [
    { key: "ALL", label: "All" },
    ...availableLeagues.map((league) => ({ key: league, label: league })),
  ];

  const liveByLeague = useMemo(() => {
    const map: Record<string, number> = { ALL: 0 };
    allGames.forEach((game) => {
      if (game.status === "live") {
        map.ALL = (map.ALL || 0) + 1;
        map[game.sport] = (map[game.sport] || 0) + 1;
      }
    });
    return map;
  }, [allGames]);

  if (hasError) return null;
  if (!isLoading && allGames.length === 0) return null;

  return (
    <section className="mt-2">
      <div className="-mx-3 mb-2 flex items-center gap-1.5 overflow-x-auto px-3 no-scrollbar">
        {chips.map((chip) => {
          const active = filter === chip.key;
          const count =
            chip.key === "ALL"
              ? allGames.length
              : allGames.filter((game) => game.sport === chip.key).length;
          const live = liveByLeague[chip.key] || 0;

          return (
            <button
              key={chip.key}
              type="button"
              onClick={() => setFilter(chip.key)}
              className={cn(
                "flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-extrabold uppercase tracking-wide transition-all",
                active
                  ? "bg-foreground text-background"
                  : "bg-surface-2 text-muted-foreground ring-1 ring-border/40 hover:text-foreground",
              )}
            >
              {live > 0 && (
                <span className="relative flex items-center justify-center">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-destructive" />
                  <span className="absolute h-1.5 w-1.5 animate-ping rounded-full bg-destructive/60" />
                </span>
              )}
              {chip.key !== "ALL" && (
                <SportIcon
                  sport={chip.key as NavSport}
                  className="h-3.5 w-3.5"
                />
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

      <div className="-mx-3 flex snap-x snap-mandatory gap-2 overflow-x-auto px-3 pb-1 no-scrollbar">
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
                No {filter} games today.
              </div>
            )
            : visibleGames.map((game) => (
                <GameCard
                  key={`${game.sport}-${game.id}`}
                  game={game}
                  showSport={filter === "ALL"}
                  onClick={() => {}}
                />
              ))}
      </div>
    </section>
  );
}
