import type { NavSport } from "../types";

interface SportIconProps {
  sport: NavSport;
  className?: string;
}

const LEAGUE_LOGOS: Record<NavSport, string> = {
  MLB: "https://a.espncdn.com/i/teamlogos/leagues/500-dark/mlb.png",
  NBA: "https://a.espncdn.com/i/teamlogos/leagues/500-dark/nba.png",
  WNBA: "https://a.espncdn.com/i/teamlogos/leagues/500-dark/wnba.png",
  NFL: "https://a.espncdn.com/i/teamlogos/leagues/500-dark/nfl.png",
  NHL: "https://a.espncdn.com/i/teamlogos/leagues/500-dark/nhl.png",
  CBB: "https://a.espncdn.com/i/teamlogos/leagues/500-dark/nba.png",
  CFB: "https://a.espncdn.com/i/teamlogos/leagues/500-dark/nfl.png",
};

export function SportIcon({ sport, className = "h-4 w-4" }: SportIconProps) {
  const src = LEAGUE_LOGOS[sport];

  if (sport === "CBB") {
    return (
      <svg
        viewBox="0 0 24 24"
        className={className}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20M12 2v20" />
        <path d="M5 5c4 4 10 10 14 14M19 5c-4 4-10 10-14 14" />
      </svg>
    );
  }

  if (sport === "CFB") {
    return (
      <svg
        viewBox="0 0 24 24"
        className={className}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <ellipse cx="12" cy="12" rx="10" ry="6" transform="rotate(-20 12 12)" />
        <path d="M9 12h6M11 10v4M13 10v4" />
      </svg>
    );
  }

  return (
    <img
      src={src}
      alt={`${sport} logo`}
      className={`${className} object-contain`}
      loading="lazy"
    />
  );
}

/** Replit mobile navbar logo */
export const NAVBAR_LOGO = "/assets/streakx-logo.png";
