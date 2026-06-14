import { useMemo } from "react";
import { fetchHeadlines } from "../api/client";
import { formatTimeAgo } from "../lib/format";
import type { Headline } from "../types/headlines";
import type { Sport, Team } from "../types";
import { useFetch } from "./useFetch";

export function useHeadlines(sport: Sport, teamsById: Map<string, Team>) {
  const query = useFetch(() => fetchHeadlines(sport, 10), [sport]);

  const headlines = useMemo<Headline[]>(() => {
    return (query.data ?? []).map((item) => {
      return {
        id: item.id,
        title: item.title,
        source: item.source?.name ?? "",
        sourceLogoUrl: item.source?.logoUrl ?? undefined,
        publishedAgo: formatTimeAgo(item.publishedAt),
        featured: item.isFeatured,
        teamTags: item.teamTags.map((tag) => {
          const taggedTeam = teamsById.get(tag.team.id);
          return {
            abbreviation: tag.team.abbreviation,
            primaryColor:
              taggedTeam?.primaryColor ??
              (tag.team.id === "duke" ? "#003087" : "#1e3a8a"),
            logoUrl: tag.team.logoUrl,
            change: taggedTeam?.change24h ?? null,
            rank: taggedTeam?.apRank ?? null,
          };
        }),
      };
    });
  }, [query.data, teamsById]);

  return {
    headlines,
    isLoading: query.isLoading,
    error: query.error,
  };
}

export function getFeaturedHeadline(headlines: Headline[]) {
  return headlines.find((headline) => headline.featured) ?? headlines[0];
}

export function getHeadlineGrid(headlines: Headline[]) {
  const featured = getFeaturedHeadline(headlines);
  return headlines.filter((headline) => headline.id !== featured?.id).slice(0, 6);
}
