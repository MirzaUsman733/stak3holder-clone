import { Clock } from "lucide-react";
import type { HeroStory } from "../data/heroStories";
import { cn } from "../lib/utils";

interface FeaturedHeroProps {
  story: HeroStory;
}

function TeamChip({
  ticker,
  logoUrl,
  profitPct,
}: NonNullable<HeroStory["teamChip"]>) {
  const positive = profitPct >= 0;

  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-border/40 bg-surface-2 py-1 pl-1 pr-3">
      <img src={logoUrl} alt={ticker} className="h-5 w-5" />
      <span className="text-xs font-extrabold text-foreground">{ticker}</span>
      <span
        className={cn(
          "text-[11px] font-bold",
          positive ? "text-success" : "text-destructive",
        )}
      >
        {positive ? "▲" : "▼"} {Math.abs(profitPct).toFixed(1)}%
      </span>
    </div>
  );
}

function tagClass(accent: HeroStory["accent"]) {
  if (accent === "loss") return "bg-destructive text-destructive-foreground";
  if (accent === "gain") return "bg-success text-success-foreground";
  return "bg-foreground/10 text-foreground";
}

/**
 * Static hero banner — intentionally NOT rotating, NOT animating.
 * Shows the fixed Replit "Baseball Is Back" story only.
 */
export function FeaturedHero({ story }: FeaturedHeroProps) {
  const hideMeta = story.title.startsWith("Baseball Is Back");

  return (
    <div className="relative">
      <div className="relative block aspect-[16/8] overflow-hidden rounded-2xl border border-border/30 bg-surface-1 sm:aspect-[16/6.5]">
        {story.image ? (
          <>
            <img
              src={story.image}
              alt=""
              aria-hidden
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/10" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          </>
        ) : (
          <div className="absolute inset-0 bg-surface-2" />
        )}

        <div className="relative flex h-full max-w-2xl flex-col justify-end p-5 sm:p-7">
          <h1 className="text-lg font-extrabold leading-tight tracking-tight text-white sm:text-2xl lg:text-[28px]">
            {story.title}
          </h1>

          {!hideMeta && (
            <div className="mt-2 flex items-center gap-2 text-xs font-medium text-white/70">
              <span
                className={cn(
                  "rounded-md px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wide",
                  tagClass(story.accent),
                )}
              >
                {story.tag}
              </span>
              <span>{story.source}</span>
              <span className="text-white/40">·</span>
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {story.timeAgo}
              </span>
            </div>
          )}

          {story.teamChip && (
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <TeamChip {...story.teamChip} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
