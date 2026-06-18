export type Sport =
  | "mlb"
  | "nba"
  | "wnba"
  | "nfl"
  | "nhl"
  | "cbb"
  | "cfb";

export type SortField =
  | "rank"
  | "name"
  | "apRank"
  | "price"
  | "change24h"
  | "change7d"
  | "change3m"
  | "apy";

export type SortDirection = "asc" | "desc";

export interface Team {
  id: string;
  slug: string;
  rank: number;
  name: string;
  abbreviation: string;
  conference: string;
  apRank: number | null;
  price: number;
  change24h: number | null;
  change7d: number | null;
  change3m: number | null;
  apy: number | null;
  logoUrl: string;
  primaryColor: string;
}

export interface TrendingItem {
  id: string;
  slug: string;
  name: string;
  conference: string;
  apRank: number | null;
  price: number;
  change7d: number | null;
  change3m: number | null;
  logoUrl: string;
  primaryColor: string;
}


export interface SportOption {
  id: Sport;
  label: string;
  shortLabel: string;
}

export const SPORTS: SportOption[] = [
  { id: "mlb", label: "Major League Baseball", shortLabel: "MLB" },
  { id: "nba", label: "National Basketball Association", shortLabel: "NBA" },
  { id: "wnba", label: "Women's National Basketball Association", shortLabel: "WNBA" },
  { id: "nfl", label: "National Football League", shortLabel: "NFL" },
  { id: "nhl", label: "National Hockey League", shortLabel: "NHL" },
  { id: "cbb", label: "College Basketball", shortLabel: "CBB" },
  { id: "cfb", label: "College Football", shortLabel: "CFB" },
];

export function getSportShortLabel(sport: Sport) {
  return SPORTS.find((entry) => entry.id === sport)?.shortLabel ?? sport.toUpperCase();
}

export function getTrendingChangeKey(sport: Sport): "change7d" | "change3m" {
  return sport === "cfb" ? "change3m" : "change7d";
}

export type MobileListTab = "trending" | "gainers";
