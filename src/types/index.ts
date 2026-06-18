export type Sport = "cbb" | "cfb";

/** All leagues shown in the navbar (Replit design). Only CBB/CFB load market data. */
export type NavSport = "MLB" | "NBA" | "WNBA" | "NFL" | "NHL" | "CBB" | "CFB";

export const NAV_SPORTS: NavSport[] = [
  "MLB",
  "NBA",
  "WNBA",
  "NFL",
  "NHL",
  "CBB",
  "CFB",
];

export function navSportToMarketSport(nav: NavSport): Sport | null {
  if (nav === "CBB") return "cbb";
  if (nav === "CFB") return "cfb";
  return null;
}

export function marketSportToNavSport(sport: Sport): NavSport {
  return sport === "cbb" ? "CBB" : "CFB";
}

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
}

export const SPORTS: SportOption[] = [
  { id: "cbb", label: "College Basketball" },
  { id: "cfb", label: "College Football" },
];

export type MobileListTab = "trending" | "gainers";
