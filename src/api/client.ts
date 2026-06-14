import { CHAIN_ID, INDEXER_API, STAK3HOLDER_API } from "./config";
import type {
  ApiHeadline,
  CbbRanking,
  TeamConfigEntry,
  TokenTeamEntry,
  TokensResponse,
  TopTradeResponse,
  TrendingResponse,
} from "./types";
import type { Sport } from "../types";
import { getApPollWeek, getSeasonYear } from "../lib/season";
import tokenTeamMap from "../data/tokenTeamMap.json";
import cbbTeamConfig from "../data/cbbTeamConfig.json";
import cfbTeamConfig from "../data/cfbTeamConfig.json";

async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Request failed (${response.status}): ${url}`);
  }
  return response.json() as Promise<T>;
}

export async function fetchTokens(
  market: Sport,
  limit = 200,
  offset = 0,
): Promise<TokensResponse> {
  const params = new URLSearchParams({
    chainId: String(CHAIN_ID),
    limit: String(limit),
    offset: String(offset),
    market,
  });
  return fetchJson(`${INDEXER_API}/tokens?${params}`);
}

export async function fetchTrendingTokens(
  market: Sport,
  limit = 200,
): Promise<TrendingResponse> {
  const params = new URLSearchParams({
    limit: String(limit),
    market,
  });
  return fetchJson(`${INDEXER_API}/tokens/trending?${params}`);
}

export async function fetchTopTrades(
  period: "7d" | "all-time",
  market: Sport,
): Promise<TopTradeResponse> {
  const params = new URLSearchParams({ period, market });
  return fetchJson(`${INDEXER_API}/top-trades?${params}`);
}

export async function fetchHeadlines(
  sport: Sport,
  limit = 10,
): Promise<ApiHeadline[]> {
  const params = new URLSearchParams({
    sport,
    limit: String(limit),
  });
  return fetchJson(`${INDEXER_API}/headlines/?${params}`);
}

export async function fetchCbbRankings(
  season = getSeasonYear("cbb"),
  week = getApPollWeek(),
): Promise<CbbRanking[]> {
  const params = new URLSearchParams({
    season: String(season),
    pollType: "ap",
    week: String(week),
  });

  const rankings = await fetchJson<CbbRanking[]>(
    `${STAK3HOLDER_API}/cbb/rankings?${params}`,
  );

  if (rankings.length > 0) {
    return rankings;
  }

  for (let fallbackWeek = week - 1; fallbackWeek >= 1; fallbackWeek -= 1) {
    params.set("week", String(fallbackWeek));
    const fallback = await fetchJson<CbbRanking[]>(
      `${STAK3HOLDER_API}/cbb/rankings?${params}`,
    );
    if (fallback.length > 0) {
      return fallback;
    }
  }

  return [];
}

export function getTeamConfig(sport: Sport): TeamConfigEntry[] {
  if (sport === "cbb") {
    return cbbTeamConfig as TeamConfigEntry[];
  }
  if (sport === "cfb") {
    return cfbTeamConfig as TeamConfigEntry[];
  }
  return [];
}

export function getTeamByTokenAddress(address: string): TokenTeamEntry | undefined {
  const key = address.toLowerCase();
  return (tokenTeamMap as Record<string, TokenTeamEntry>)[key];
}
