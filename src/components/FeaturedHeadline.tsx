import { useEffect, useState } from "react";
import { Clock } from "lucide-react";
import type { Headline, HeadlineTeamTag } from "../types/headlines";
import { cn } from "../lib/utils";

interface FeaturedHeadlineProps {
  headlines: Headline[];
}

function TeamChip({ tag }: { tag: HeadlineTeamTag }) {
  const positive = (tag.change ?? 0) >= 0;

  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-border/40 bg-surface-2 py-1 pl-1 pr-3">
      <img src={tag.logoUrl} alt={tag.abbreviation} className="h-5 w-5" />
      <span className="text-xs font-extrabold text-foreground">
        {tag.abbreviation}
      </span>
      {tag.change != null && (
        <span
          className={cn(
            "text-[11px] font-bold",
            positive ? "text-success" : "text-destructive",
          )}
        >
          {positive ? "▲" : "▼"} {Math.abs(tag.change).toFixed(1)}%
        </span>
      )}
    </div>
  );
}

export function FeaturedHeadline({ headlines }: FeaturedHeadlineProps) {
  const [active, setActive] = useState(0);

  useEffect(() => setActive(0), [headlines]);

  useEffect(() => {
    if (headlines.length < 2) return;
    const id = setTimeout(() => {
      setActive((prev) => (prev + 1) % headlines.length);
    }, 17000);
    return () => clearTimeout(id);
  }, [headlines.length, active, headlines]);

  if (!headlines.length) return null;

  const safeIndex = active >= headlines.length ? 0 : active;
  const headline = headlines[safeIndex];
  const team = headline.teamTags[0];

  return (
    <div className="relative">
      <div className="group relative block aspect-[16/8] overflow-hidden rounded-2xl border border-border/30 bg-surface-1 sm:aspect-[16/6.5]">
        {team ? (
          <>
            <div
              className="absolute inset-0"
              style={{ backgroundColor: team.primaryColor }}
            />
            <div className="absolute inset-0 flex items-center justify-end pr-6 sm:pr-12">
              <img
                src={team.logoUrl}
                alt=""
                aria-hidden
                className="pointer-events-none h-40 w-40 select-none object-contain opacity-[0.35] sm:h-56 sm:w-56"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-surface-1 via-surface-1/80 to-transparent" />
          </>
        ) : (
          <div className="absolute inset-0 bg-surface-2" />
        )}

        <div className="relative flex h-full max-w-2xl flex-col justify-end p-5 sm:p-7">
          <h1 className="text-lg font-extrabold leading-tight tracking-tight text-foreground sm:text-2xl lg:text-[28px]">
            {headline.title}
          </h1>

          <div className="mt-2 flex items-center gap-2 text-xs font-medium text-muted-foreground">
            {headline.source && <span>{headline.source}</span>}
            {headline.source && <span className="text-muted-foreground/60">·</span>}
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {headline.publishedAgo}
            </span>
          </div>

          {team && (
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <TeamChip tag={team} />
            </div>
          )}
        </div>

        {headlines.length > 1 && (
          <div className="absolute right-4 top-3 flex gap-1.5">
            {headlines.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setActive(index)}
                aria-label={`Show article ${index + 1}`}
                className={cn(
                  "h-1.5 rounded-full transition-all",
                  index === safeIndex
                    ? "w-5 bg-foreground"
                    : "w-1.5 bg-muted-foreground/30 hover:bg-muted-foreground/60",
                )}
              />
            ))}
          </div>
        )}
      </div>
    </div>
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
      className={cn(
        "group flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl border border-border/30 bg-surface-1 text-left transition-colors hover:border-border/50",
        className,
      )}
    >
      <div className="flex flex-1 flex-col p-4">
        <h3 className="line-clamp-2 font-extrabold">{headline.title}</h3>
        <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
          {headline.source && <span>{headline.source}</span>}
          <span>·</span>
          <span>{headline.publishedAgo}</span>
        </div>
        {team && (
          <div className="mt-auto flex gap-2 pt-4">
            <TeamChip tag={team} />
          </div>
        )}
      </div>
    </button>
  );
}
