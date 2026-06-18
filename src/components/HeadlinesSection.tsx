import type { Sport } from "../types";
import {
  getFeaturedHeadline,
  getHeadlineGrid,
  useHeadlines,
} from "../hooks/useHeadlines";
import type { Team } from "../types";
import { FeaturedHeadline, HeadlineCard } from "./FeaturedHeadline";
import { Skeleton } from "./ui/primitives";

interface HeadlinesSectionProps {
  sport: Sport;
  teamsById: Map<string, Team>;
}

export function HeadlinesSection({ sport, teamsById }: HeadlinesSectionProps) {
  const { headlines, isLoading } = useHeadlines(sport, teamsById);
  const featured = getFeaturedHeadline(headlines);
  const grid = getHeadlineGrid(headlines);

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-[380px] w-full rounded-2xl md:h-[420px]" />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <Skeleton key={index} className="h-36 rounded-2xl" />
          ))}
        </div>
      </div>
    );
  }

  if (!featured) {
    return (
      <div className="rounded-lg border border-dashed border-border py-12 text-center text-muted-foreground">
        No headlines yet for College Basketball.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <FeaturedHeadline headline={featured} />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {grid.map((headline, index) => (
          <HeadlineCard
            key={headline.id}
            headline={headline}
            className={index >= 3 ? "hidden md:block" : undefined}
          />
        ))}
      </div>
    </div>
  );
}
