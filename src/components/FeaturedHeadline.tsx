import { Clock } from "lucide-react";
import type { Headline } from "../types/headlines";
import { TeamTradeBadge } from "./TeamTradeBadge";

interface FeaturedHeadlineProps {
  headline: Headline;
}

export function FeaturedHeadline({ headline }: FeaturedHeadlineProps) {
  const team = headline.teamTags[0];

  if (headline.imageUrl) {
    return (
      <button
        type="button"
        className="relative block aspect-[16/9] w-full cursor-pointer overflow-hidden bg-card text-left sm:aspect-[16/6.5] sm:rounded-2xl sm:border sm:border-border/30"
      >
        <img
          src={headline.imageUrl}
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/20 to-black/80 sm:bg-gradient-to-r sm:from-black/85 sm:via-black/55 sm:to-black/10" />
        <div className="absolute inset-0 hidden bg-gradient-to-t from-black/40 via-transparent to-transparent sm:block" />

        <div className="relative flex h-full max-w-2xl flex-col justify-end px-4 pb-4 pt-8 sm:p-7">
          <h2 className="line-clamp-2 text-[15px] font-extrabold leading-[1.2] tracking-tight text-white sm:line-clamp-3 sm:text-2xl lg:text-[28px]">
            {headline.title}
          </h2>

          {!headline.hideMeta && (headline.source || headline.publishedAgo) && (
            <div className="mt-2 flex items-center gap-3 text-sm text-white/70">
              {headline.source && <span>{headline.source}</span>}
              {headline.publishedAgo && (
                <div className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4" />
                  <span>{headline.publishedAgo}</span>
                </div>
              )}
            </div>
          )}
        </div>
      </button>
    );
  }

  const gradient = team
    ? `linear-gradient(to right, ${team.primaryColor}dd 0%, ${team.primaryColor} 100%)`
    : "linear-gradient(to right, #14532d 0%, #22c55e 100%)";

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
