import { Clock } from "lucide-react";
import type { Headline, HeadlineTeamTag } from "../types/headlines";
import { TeamTradeBadge } from "./TeamTradeBadge";
import { cn } from "../lib/utils";

interface FeaturedHeadlineProps {
  headline: Headline;
}

function PhotoHeroChip({ tag }: { tag: HeadlineTeamTag }) {
  const hasChange = tag.change != null;
  const isUp = (tag.change ?? 0) >= 0;

  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-border/40 bg-secondary py-1 pl-1 pr-3">
      <img
        src={tag.logoUrl}
        alt={tag.abbreviation}
        className="h-5 w-5 object-contain"
      />
      <span className="text-xs font-semibold">{tag.abbreviation}</span>
      {hasChange && (
        <span
          className={cn(
            "text-[11px] font-semibold",
            isUp ? "text-success" : "text-red-400",
          )}
        >
          {isUp ? "▲" : "▼"} {Math.abs(tag.change!).toFixed(1)}%
        </span>
      )}
    </div>
  );
}

export function FeaturedHeadline({ headline }: FeaturedHeadlineProps) {
  const team = headline.teamTags[0];

  if (headline.imageUrl) {
    return (
      <button
        type="button"
        className="relative block aspect-[21/9] w-full cursor-pointer overflow-hidden rounded-2xl border border-border/30 bg-card text-left sm:aspect-[16/6.5]"
      >
        <img
          src={headline.imageUrl}
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-black/5" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/45 via-black/15 to-transparent" />

        <div className="relative flex h-full max-w-2xl flex-col justify-end p-4 sm:p-7">
          <h2 className="mb-1.5 line-clamp-2 text-base font-bold leading-snug text-white sm:mb-2 sm:line-clamp-3 sm:text-lg md:text-2xl">
            {headline.title}
          </h2>

          {!headline.hideMeta && (headline.source || headline.publishedAgo) && (
            <div className="mb-4 flex items-center gap-3 text-sm text-white/70">
              {headline.source && <span>{headline.source}</span>}
              {headline.publishedAgo && (
                <div className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4" />
                  <span>{headline.publishedAgo}</span>
                </div>
              )}
            </div>
          )}

          {team && (
            <div className="flex gap-2">
              <PhotoHeroChip tag={team} />
            </div>
          )}
        </div>
      </button>
    );
  }

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
