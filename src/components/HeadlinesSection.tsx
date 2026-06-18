import type { Sport } from "../types";
import { getFeaturedHeadline, useHeadlines } from "../hooks/useHeadlines";
import { getSportFeaturedStory } from "../data/featuredStories";
import { getDataSport } from "../lib/market";
import type { Team } from "../types";
import { FeaturedHeadline } from "./FeaturedHeadline";
import { LiveScoresStrip } from "./LiveScoresStrip";
import { Skeleton } from "./ui/primitives";

interface HeadlinesSectionProps {
  sport: Sport;
  teamsById: Map<string, Team>;
}

export function HeadlinesSection({ sport, teamsById }: HeadlinesSectionProps) {
  const dataSport = getDataSport(sport);
  const { headlines, isLoading } = useHeadlines(dataSport, teamsById);
  const sportFeatured = getSportFeaturedStory(sport);
  const featured = sportFeatured ?? getFeaturedHeadline(headlines);

  if (isLoading && !sportFeatured) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-[380px] w-full rounded-2xl md:h-[420px]" />
      </div>
    );
  }

  if (!featured) {
    return (
      <div className="rounded-lg border border-dashed border-border py-12 text-center text-muted-foreground">
        No headlines yet.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <FeaturedHeadline headline={featured} />
      <LiveScoresStrip />
    </div>
  );
}
