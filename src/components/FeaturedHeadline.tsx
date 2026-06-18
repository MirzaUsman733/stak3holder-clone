import { Clock } from "lucide-react";
import type { Headline } from "../types/headlines";
import { TeamTradeBadge } from "./TeamTradeBadge";

interface FeaturedHeadlineProps {
  headline: Headline;
}

export function FeaturedHeadline({ headline }: FeaturedHeadlineProps) {
  const team = headline.teamTags[0];
  const gradient = team
    ? `linear-gradient(to right, ${team.primaryColor}dd 0%, ${team.primaryColor} 100%)`
    : "linear-gradient(to right, #1e3a8a 0%, #2563eb 100%)";

  return (
    <button
      type="button"
      className="relative h-[380px] w-full cursor-pointer overflow-hidden rounded-2xl text-left md:h-[420px]"
      style={{ background: gradient }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.12),transparent_55%)]" />
      <div className="relative flex h-full flex-col justify-end p-6 md:p-8">
        <h2 className="mb-2 line-clamp-3 text-lg font-bold text-white md:text-2xl">
          {headline.title}
        </h2>
        <div className="mb-4 flex items-center gap-3 text-sm text-white/70">
          {headline.source && <span>{headline.source}</span>}
          <div className="flex items-center gap-1.5">
            <Clock className="h-4 w-4" />
            <span>{headline.publishedAgo}</span>
          </div>
        </div>
        {team && (
          <div className="flex gap-2">
            <TeamTradeBadge tag={team} featured />
          </div>
        )}
      </div>
    </button>
  );
}

interface HeadlineCardProps {
  headline: Headline;
  className?: string;
}

export function HeadlineCard({ headline, className }: HeadlineCardProps) {
  const team = headline.teamTags[0];

  return (
    <button
      type="button"
      className={`group flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl border border-border bg-card text-left transition-all hover:shadow-lg ${className ?? ""}`}
    >
      <div className="flex flex-1 flex-col p-4">
        <h3 className="line-clamp-2 font-semibold">{headline.title}</h3>
        <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
          {headline.source && <span>{headline.source}</span>}
          <span>·</span>
          <span>{headline.publishedAgo}</span>
        </div>
        {team && (
          <div className="mt-auto flex gap-2 pt-4">
            <TeamTradeBadge tag={team} />
          </div>
        )}
      </div>
    </button>
  );
}
