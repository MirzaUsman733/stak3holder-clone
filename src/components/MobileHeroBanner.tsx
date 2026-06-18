import type { HeroStory } from "../data/heroStories";

interface MobileHeroBannerProps {
  story: HeroStory;
}

/**
 * Static mobile hero — first story only, no rotation.
 */
export function MobileHeroBanner({ story }: MobileHeroBannerProps) {
  const hideMeta = story.title.startsWith("Baseball Is Back");

  return (
    <div className="relative overflow-hidden bg-surface-1">
      <div className="relative aspect-[16/9] w-full overflow-hidden">
        {story.image ? (
          <div className="absolute inset-0 bg-black">
            <img
              src={story.image}
              alt=""
              aria-hidden
              loading="eager"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/20 to-black/80" />
          </div>
        ) : (
          <div className="absolute inset-0 bg-surface-2" />
        )}

        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/85 to-transparent px-4 pb-3 pt-8">
          <h2 className="line-clamp-2 text-[15px] font-extrabold leading-[1.2] tracking-tight text-white">
            {story.title}
          </h2>
          {!hideMeta && story.source && (
            <div className="mt-1.5 flex items-center gap-2 text-[10px] font-medium text-white/70">
              <span>{story.source}</span>
              <span className="text-white/40">·</span>
              <span>{story.timeAgo}</span>
            </div>
          )}
          {story.teamChip && (
            <div className="mt-2">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/40 py-1 pl-1 pr-3 backdrop-blur-sm">
                <img
                  src={story.teamChip.logoUrl}
                  alt={story.teamChip.ticker}
                  className="h-5 w-5"
                />
                <span className="text-xs font-extrabold text-white">
                  {story.teamChip.ticker}
                </span>
                <span className="text-[11px] font-bold text-success">
                  ▲ {story.teamChip.profitPct.toFixed(1)}%
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
