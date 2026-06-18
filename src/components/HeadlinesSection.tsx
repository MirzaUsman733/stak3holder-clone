import type { Headline } from "../types/headlines";
import { FeaturedHeadline } from "./FeaturedHeadline";
import { LiveScoresStrip } from "./LiveScoresStrip";
import { Skeleton } from "./ui/primitives";

interface HeadlinesSectionProps {
  featured: Headline | null | undefined;
  isLoading?: boolean;
}

export function HeadlinesSection({ featured, isLoading }: HeadlinesSectionProps) {
  const showGradientHero = featured && !featured.imageUrl;

  if (isLoading && !featured) {
    return (
      <div className="space-y-2">
        <Skeleton className="h-[380px] w-full rounded-2xl md:h-[420px]" />
        <LiveScoresStrip />
      </div>
    );
  }

  if (!featured && !isLoading) {
    return (
      <div className="space-y-2">
        <div className="rounded-lg border border-dashed border-border py-12 text-center text-muted-foreground">
          No headlines yet.
        </div>
        <LiveScoresStrip />
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {showGradientHero && <FeaturedHeadline headline={featured} />}
      <LiveScoresStrip />
    </div>
  );
}
