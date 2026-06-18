import { useEffect, useState } from "react";
import {
  fetchAllLiveGames,
  type LiveGame,
  type LiveGameWithSport,
} from "../lib/liveScores";
import { Skeleton } from "./ui/primitives";
import { cn } from "../lib/utils";

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

  if (hasError) return null;
  if (!isLoading && games.length === 0) return null;

  return (
    <section>
      <div className="flex snap-x snap-mandatory gap-2 overflow-x-auto pb-1 no-scrollbar">
        {isLoading
          ? Array.from({ length: 4 }).map((_, index) => (
              <Skeleton
                key={index}
                className="h-[96px] w-[160px] shrink-0 snap-start rounded-2xl"
              />
            ))
          : games.map((game) => (
              <GameCard
                key={`${game.sport}-${game.id}`}
                game={game}
                showSport
              />
            ))}
      </div>
    </section>
  );
}
