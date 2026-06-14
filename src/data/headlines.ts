import type { Headline } from "../types/headlines";
import type { Sport } from "../types";

const CBB_HEADLINES: Headline[] = [
  {
    id: "h1",
    title:
      "Duke's offseason work just earned a massive vote of confidence in preseason bracketology",
    source: "Ball Durham",
    publishedAgo: "2h ago",
    featured: true,
    teamTags: [
      {
        abbreviation: "DUKE",
        primaryColor: "#003087",
        logoUrl: "https://a.espncdn.com/i/teamlogos/ncaa/500/150.png",
        change: -0.6,
        rank: 2,
      },
    ],
  },
  {
    id: "h2",
    title:
      "New Commitment Gives Iowa State Basketball a Boost in Latest Bracketology",
    source: "Sports Illustrated",
    publishedAgo: "2h ago",
    teamTags: [
      {
        abbreviation: "ISU",
        primaryColor: "#C8102E",
        logoUrl: "https://a.espncdn.com/i/teamlogos/ncaa/500/66.png",
        change: -9.5,
      },
    ],
  },
  {
    id: "h3",
    title: "How Bruins Fans Feeling About UCLA Basketball's Latest Bracketology",
    source: "Sleepers Media",
    publishedAgo: "19h ago",
    teamTags: [
      {
        abbreviation: "UCLA",
        primaryColor: "#2774AE",
        logoUrl: "https://a.espncdn.com/i/teamlogos/ncaa/500/26.png",
        change: -5.0,
      },
    ],
  },
  {
    id: "h4",
    title:
      "Michigan Basketball Projected to Land No. 1 Seed in Latest Bracketology",
    source: "SB Nation",
    publishedAgo: "4h ago",
    teamTags: [
      {
        abbreviation: "MICH",
        primaryColor: "#00274C",
        logoUrl: "https://a.espncdn.com/i/teamlogos/ncaa/500/130.png",
        change: -0.8,
        rank: 6,
      },
    ],
  },
  {
    id: "h5",
    title:
      "ESPN analyst has interesting take on Duke basketball's latest bracketology",
    source: "On3",
    publishedAgo: "4h ago",
    teamTags: [
      {
        abbreviation: "DUKE",
        primaryColor: "#003087",
        logoUrl: "https://a.espncdn.com/i/teamlogos/ncaa/500/150.png",
        change: -0.6,
        rank: 2,
      },
    ],
  },
  {
    id: "h6",
    title:
      "Illinois Basketball Ranked as No. 1 Seed in Latest Bracketology",
    source: "Sports Illustrated",
    publishedAgo: "19h ago",
    teamTags: [
      {
        abbreviation: "ILL",
        primaryColor: "#E84A27",
        logoUrl: "https://a.espncdn.com/i/teamlogos/ncaa/500/356.png",
        change: -3.0,
        rank: 10,
      },
    ],
  },
  {
    id: "h7",
    title:
      "Best of March: Cincinnati Basketball's Latest Bracketology Update",
    source: "Sports Illustrated",
    publishedAgo: "19h ago",
    teamTags: [
      {
        abbreviation: "ILL",
        primaryColor: "#E84A27",
        logoUrl: "https://a.espncdn.com/i/teamlogos/ncaa/500/356.png",
        change: -3.0,
      },
    ],
  },
];

export function getHeadlines(_sport: Sport): Headline[] {
  return CBB_HEADLINES;
}

export function getFeaturedHeadline(headlines: Headline[]) {
  return headlines.find((item) => item.featured) ?? headlines[0];
}

export function getHeadlineGrid(headlines: Headline[]) {
  const featured = getFeaturedHeadline(headlines);
  return headlines.filter((item) => item.id !== featured?.id).slice(0, 6);
}
