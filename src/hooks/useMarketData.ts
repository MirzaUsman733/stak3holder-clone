import { useMemo } from "react";
import {
  fetchCbbRankings,
  fetchTokens,
  fetchTrendingTokens,
  getTeamConfig,
} from "../api/client";
import type { IndexerToken } from "../api/types";
import { rawApy, rawChangePercent, rawPriceToUsd } from "../lib/format";
import type { Sport, Team, TrendingItem } from "../types";
import { useFetch } from "./useFetch";

function buildTokenMap(tokens: IndexerToken[]) {
  return new Map(tokens.map((token) => [token.address.toLowerCase(), token]));
}

function buildRankMap(
  rankings: Array<{ teamId: number; ranking: number }>,
) {
  return new Map(
    rankings.map((entry) => [String(entry.teamId), entry.ranking]),
  );
}

function mergeTeam(
  config: ReturnType<typeof getTeamConfig>[number],
  token: IndexerToken | undefined,
  apRank: number | null,
  rank: number,
): Team {
  return {
    id: config.id,
    slug: config.slug,
    rank,
    name: config.name,
    abbreviation: config.abbreviation,
    conference: config.conference,
    apRank,
    price: rawPriceToUsd(token?.price),
    change24h: rawChangePercent(token?.changes["24h"]?.changePercent),
    change7d: rawChangePercent(token?.changes["7d"]?.changePercent),
    change3m: rawChangePercent(token?.changes["3m"]?.changePercent),
    apy: rawApy(token?.apy),
    logoUrl: config.logoUrl,
    primaryColor: config.primaryColor.startsWith("#")
      ? config.primaryColor
      : `#${config.primaryColor}`,
  };
}

export function useMarketData(sport: Sport) {
  const teamConfig = useMemo(() => getTeamConfig(sport), [sport]);

  const tokensQuery = useFetch(
    () => fetchTokens(sport, 200, 0),
    [sport],
  );
  const trendingQuery = useFetch(
    () => fetchTrendingTokens(sport, 200),
    [sport],
  );
  const rankingsQuery = useFetch(
    () => (sport === "cbb" ? fetchCbbRankings() : Promise.resolve([])),
    [sport],
  );

  const teams = useMemo(() => {
    const tokenMap = buildTokenMap(tokensQuery.data?.tokens ?? []);
    const rankMap = buildRankMap(rankingsQuery.data ?? []);

    const merged = teamConfig
      .filter((config) => config.tokenAddress)
      .map((config) => {
        const token = tokenMap.get(config.tokenAddress!.toLowerCase());
        const apRank = config.externalId
          ? (rankMap.get(config.externalId) ?? null)
          : null;

        return mergeTeam(config, token, apRank, 0);
      });

    return merged
      .sort((a, b) => {
        const left = a.apRank ?? Number.POSITIVE_INFINITY;
        const right = b.apRank ?? Number.POSITIVE_INFINITY;
        if (left !== right) return left - right;
        return b.price - a.price;
      })
      .map((team, index) => ({ ...team, rank: index + 1 }));
  }, [teamConfig, tokensQuery.data, rankingsQuery.data]);

  const teamBySlug = useMemo(
    () => new Map(teams.map((team) => [team.slug, team])),
    [teams],
  );

  const trending = useMemo<TrendingItem[]>(() => {
    const trendingTokens = trendingQuery.data?.trending ?? [];
    const configByAddress = new Map(
      teamConfig
        .filter((config) => config.tokenAddress)
        .map((config) => [config.tokenAddress!.toLowerCase(), config]),
    );

    return trendingTokens
      .map((entry) => {
        const config = configByAddress.get(entry.address.toLowerCase());
        if (!config) return null;

        const team = teamBySlug.get(config.slug);
        if (!team) return null;

        return {
          id: team.id,
          slug: team.slug,
          name: team.name,
          conference: team.conference,
          apRank: team.apRank,
          price: team.price,
          change7d: team.change7d,
          change3m: team.change3m,
          logoUrl: team.logoUrl,
          primaryColor: team.primaryColor,
        };
      })
      .filter((item): item is TrendingItem => item != null);
  }, [trendingQuery.data, teamConfig, teamBySlug]);

  const gainers = useMemo(
    () =>
      teams
        .filter((team) => (team.change24h ?? 0) > 0)
        .sort((a, b) => (b.change24h ?? 0) - (a.change24h ?? 0)),
    [teams],
  );

  const pollTeams = useMemo(
    () =>
      teams
        .filter((team) => team.apRank != null)
        .sort((a, b) => (a.apRank ?? 0) - (b.apRank ?? 0)),
    [teams],
  );

  const teamByTokenAddress = useMemo(() => {
    const map = new Map<string, Team>();
    for (const config of teamConfig) {
      if (!config.tokenAddress) continue;
      const team = teamBySlug.get(config.slug);
      if (team) {
        map.set(config.tokenAddress.toLowerCase(), team);
      }
    }
    return map;
  }, [teamConfig, teamBySlug]);

  return {
    teams,
    trending,
    gainers,
    pollTeams,
    teamBySlug,
    teamByTokenAddress,
    isLoading:
      tokensQuery.isLoading ||
      trendingQuery.isLoading ||
      rankingsQuery.isLoading,
    error: tokensQuery.error ?? trendingQuery.error ?? rankingsQuery.error,
  };
}

export function getGainerTeams(teams: Team[]) {
  return teams
    .filter((team) => (team.change24h ?? 0) > 0)
    .sort((a, b) => (b.change24h ?? 0) - (a.change24h ?? 0));
}

export function getApPollTeams(teams: Team[]) {
  return teams
    .filter((team) => team.apRank != null)
    .sort((a, b) => (a.apRank ?? 0) - (b.apRank ?? 0));
}
