import { getFeaturedHeroStory } from "../data/heroStories";
import { FeaturedHero } from "./FeaturedHero";
import { MobileHeroBanner } from "./MobileHeroBanner";

interface HeadlinesSectionProps {
  variant?: "desktop" | "mobile";
}

export function HeadlinesSection({ variant = "desktop" }: HeadlinesSectionProps) {
  const story = getFeaturedHeroStory();

  if (variant === "mobile") {
    return (
      <div className="-mx-3 pt-1">
        <MobileHeroBanner story={story} />
      </div>
    );
  }

  return <FeaturedHero story={story} />;
}
