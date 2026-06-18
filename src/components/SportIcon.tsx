import type { Sport } from "../types";
import { cn } from "../lib/utils";

const LEAGUE_LOGOS: Partial<Record<Sport, string>> = {
  mlb: "https://a.espncdn.com/i/teamlogos/leagues/500-dark/mlb.png",
  nba: "https://a.espncdn.com/i/teamlogos/leagues/500-dark/nba.png",
  wnba: "https://a.espncdn.com/i/teamlogos/leagues/500-dark/wnba.png",
  nfl: "https://a.espncdn.com/i/teamlogos/leagues/500-dark/nfl.png",
  nhl: "https://a.espncdn.com/i/teamlogos/leagues/500-dark/nhl.png",
};

function BasketballIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.8" />
      <path d="M2 12h20M12 2v20" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M5 5c4 4 10 10 14 14M19 5c-4 4-10 10-14 14"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function FootballIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <ellipse
        cx="12"
        cy="12"
        rx="10"
        ry="6"
        stroke="currentColor"
        strokeWidth="1.8"
        transform="rotate(-20 12 12)"
      />
      <path
        d="M9 12h6M11 10v4M13 10v4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function SportIcon({
  sport,
  className,
}: {
  sport: Sport;
  className?: string;
}) {
  const logo = LEAGUE_LOGOS[sport];

  if (logo) {
    return (
      <img
        src={logo}
        alt=""
        className={cn("object-contain", className)}
        loading="lazy"
      />
    );
  }

  if (sport === "cbb") {
    return <BasketballIcon className={className} />;
  }

  return <FootballIcon className={className} />;
}
