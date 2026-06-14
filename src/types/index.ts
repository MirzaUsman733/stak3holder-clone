export type Sport = "cbb" | "cfb";

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
