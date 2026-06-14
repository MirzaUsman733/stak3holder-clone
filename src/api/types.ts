export interface TokenChange {
  change: string;
  changePercent: string;
}

export interface IndexerToken {
  address: string;
  chainId: number;
  price: string;
  apy: string | null;
  changes: {
    "1h"?: TokenChange;
    "24h"?: TokenChange;
    "7d"?: TokenChange;
    "3m"?: TokenChange;
  };
}

export interface TokensResponse {
  tokens: IndexerToken[];
  pagination?: {
    total: number;
    limit: number;
    offset: number;
  };
}

export interface TrendingToken {
  address: string;
  price: string;
  market: string;
  apy: string | null;
  trendingScore: number;
}

export interface TrendingResponse {
  trending: TrendingToken[];
}

export interface TopTradeResponse {
  trades: Array<{
    walletAddress: string;
    username: string;
    pfpUrl: string;
    tokenAddress: string;
    pnl: number;
    pnlPercent: number;
    status: string;
  }>;
}

export interface ApiHeadlineTeam {
  id: string;
  name: string;
  abbreviation: string;
  logoUrl: string;
}

export interface ApiHeadlineTeamTag {
  id: string;
  teamId: string;
  team: ApiHeadlineTeam;
  sport: string;
  isPrimary: boolean;
}

export interface ApiHeadline {
  id: string;
  title: string;
  description?: string | null;
  imageUrl?: string | null;
  source?: {
    id: string;
    name: string;
    logoUrl?: string | null;
  } | null;
  teamTags: ApiHeadlineTeamTag[];
  publishedAt: string;
  isFeatured: boolean;
}

export interface CbbRanking {
  season: number;
  week: number;
  pollType: string;
  teamId: number;
  team: string;
  conference: string;
  ranking: number;
}

export interface TeamConfigEntry {
  id: string;
  slug: string;
  name: string;
  abbreviation: string;
  conference: string;
  primaryColor: string;
  logoUrl: string;
  externalId: string | null;
  tokenAddress: string | null;
}

export interface TokenTeamEntry {
  id: string;
  slug: string;
  name: string;
  abbreviation: string;
  conference: string;
  primaryColor: string;
  logoUrl: string;
  sport: string;
  tokenAddress: string;
}
