import type { Sport } from "../types";
import type { Headline } from "../types/headlines";
import mlbDodgersHero from "../assets/news/mlb-dodgers-real.jpg";

const FEATURED_BY_SPORT: Partial<Record<Sport, Headline>> = {
  mlb: {
    id: "featured-mlb-hero",
    title: "Baseball Is Back. Trade the Upcoming Games on StreakX.",
    source: "",
    publishedAgo: "",
    imageUrl: mlbDodgersHero,
    hideMeta: true,
    featured: true,
    teamTags: [
      {
        abbreviation: "LAD",
        primaryColor: "#005A9C",
        logoUrl: "https://a.espncdn.com/i/teamlogos/mlb/500/lad.png",
        change: 26.9,
      },
    ],
  },
};

export function getSportFeaturedStory(sport: Sport): Headline | null {
  return FEATURED_BY_SPORT[sport] ?? null;
}
