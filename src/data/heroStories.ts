/** Static featured hero — same as Replit MLB banner. Never rotates. */
export interface HeroStory {
  tag: string;
  source: string;
  timeAgo: string;
  title: string;
  tickers: string[];
  accent: "gain" | "loss" | "neutral";
  image?: string;
  teamChip?: {
    ticker: string;
    logoUrl: string;
    profitPct: number;
  };
}

export const STATIC_FEATURED_HERO: HeroStory = {
  tag: "HOT STREAK",
  source: "ESPN",
  timeAgo: "10d ago",
  title: "Baseball Is Back. Trade the Upcoming Games on StreakX.",
  tickers: ["LAD"],
  accent: "gain",
  image: "/assets/news/mlb-dodgers-real.jpg",
  teamChip: {
    ticker: "LAD",
    logoUrl: "https://a.espncdn.com/i/teamlogos/mlb/500/lad.png",
    profitPct: 26.9,
  },
};

export function getFeaturedHeroStory(): HeroStory {
  return STATIC_FEATURED_HERO;
}
