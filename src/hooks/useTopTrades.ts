import { useMemo } from "react";
import { fetchTopTrades } from "../api/client";
import type { TopTrade } from "../types/headlines";
import type { Sport, Team } from "../types";
import { useFetch } from "./useFetch";

const AVATAR_COLORS = [
  "#2563eb",
  "#059669",
  "#d97706",
  "#dc2626",
  "#7c3aed",
  "#0891b2",
];

function hashString(value: string) {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash << 5) - hash + value.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function mapTrade(
  trade: {
    walletAddress: string;
    username: string;
    pfpUrl: string;
    tokenAddress: string;
    pnl: number;
  },
  teamByToken: Map<string, Team>,
): TopTrade {
  const team = teamByToken.get(trade.tokenAddress.toLowerCase());

  return {
    id: `${trade.walletAddress}-${trade.tokenAddress}`,
    username: trade.username,
    avatarUrl: trade.pfpUrl.startsWith("/")
      ? `https://stak3holder.com${trade.pfpUrl}`
      : trade.pfpUrl,
    avatarColor: AVATAR_COLORS[hashString(trade.username) % AVATAR_COLORS.length],
    teamName: team?.name ?? "Unknown",
    teamLogoUrl: team?.logoUrl ?? "",
    pnl: trade.pnl,
  };
}

export function useTopTrades(sport: Sport, teamByToken: Map<string, Team>) {
  const weeklyQuery = useFetch(
    () => fetchTopTrades("7d", sport),
    [sport],
  );
  const allTimeQuery = useFetch(
    () => fetchTopTrades("all-time", sport),
    [sport],
  );

  const weeklyTrades = useMemo(
    () =>
      (weeklyQuery.data?.trades ?? []).map((trade) =>
        mapTrade(trade, teamByToken),
      ),
    [weeklyQuery.data, teamByToken],
  );

  const allTimeTrades = useMemo(
    () =>
      (allTimeQuery.data?.trades ?? []).map((trade) =>
        mapTrade(trade, teamByToken),
      ),
    [allTimeQuery.data, teamByToken],
  );

  return {
    weeklyTrades,
    allTimeTrades,
    isLoading: weeklyQuery.isLoading || allTimeQuery.isLoading,
    error: weeklyQuery.error ?? allTimeQuery.error,
  };
}
