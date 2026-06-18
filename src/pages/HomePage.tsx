import { useState } from "react";
import { useMarket } from "../context/MarketContext";
import { useMarketData } from "../hooks/useMarketData";
import type { MobileListTab } from "../types";
import { Header } from "../components/Header";
import { PriceTicker } from "../components/PriceTicker";
import { Footer } from "../components/Footer";
import { HeadlinesSection } from "../components/HeadlinesSection";
import { TrendingSidebar } from "../components/TrendingSidebar";
import { WeeklyTopTrades } from "../components/WeeklyTopTrades";
import { BrowseTeamsSection } from "../components/TeamsTable";
import { MobileTeamList } from "../components/MobileTeamList";
import { StreakBanner } from "../components/StreakBanner";
import { LiveScoresStrip } from "../components/LiveScoresStrip";
import { MobileBottomNav } from "../components/MobileBottomNav";
import { HowItWorksBanner } from "../components/HowItWorksBanner";
import { cn } from "../lib/utils";

export function HomePage() {
  const { sport } = useMarket();
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileTab, setMobileTab] = useState<MobileListTab>("trending");

  const {
    teams,
    trending,
    gainers,
    teamByTokenAddress,
    isLoading,
  } = useMarketData(sport);

  const mobileTeams =
    mobileTab === "trending"
      ? trending
          .map((item) => teams.find((team) => team.id === item.id))
          .filter(Boolean)
          .map((team) => team!)
      : gainers;

  const mobileChangeField =
    mobileTab === "gainers" ? ("24h" as const) : ("7d" as const);

  return (
    <div className="min-h-screen bg-background pb-28 text-foreground md:pb-0">
      <div className="hidden sm:block">
        <PriceTicker teams={teams} sport={sport} isLoading={isLoading} />
      </div>

      <Header
        showSearch
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <main className="mx-auto max-w-7xl px-3 py-3 sm:px-5 sm:py-6">
        <div className="flex flex-col gap-5 lg:flex-row">
          <div className="min-w-0 flex-1">
            <div className="mb-3 sm:mb-4">
              <StreakBanner />
            </div>

            <LiveScoresStrip />

            <div className="sm:hidden">
              <HeadlinesSection variant="mobile" />
              <WeeklyTopTrades sport={sport} teamByToken={teamByTokenAddress} />
            </div>

            <div className="hidden sm:block">
              <HeadlinesSection variant="desktop" />
              <WeeklyTopTrades sport={sport} teamByToken={teamByTokenAddress} />
            </div>

            <div id="browse" className="mt-6 lg:hidden">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex gap-2">
                  {(
                    [
                      ["trending", "Trending"],
                      ...(gainers.length > 0
                        ? ([["gainers", "Gainers (24H)"]] as const)
                        : []),
                    ] as const
                  ).map(([tab, label]) => (
                    <button
                      key={tab}
                      type="button"
                      onClick={() => setMobileTab(tab)}
                      className={cn(
                        "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                        mobileTab === tab
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground",
                      )}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              <MobileTeamList
                teams={mobileTeams}
                sport={sport}
                changeField={mobileChangeField}
                isLoading={isLoading}
              />
            </div>

            <div className="mt-6 hidden lg:block">
              <BrowseTeamsSection
                teams={teams}
                searchQuery={searchQuery}
                isLoading={isLoading}
              />
            </div>
          </div>

          <TrendingSidebar items={trending} sport={sport} isLoading={isLoading} />
        </div>
      </main>

      <div className="hidden md:block">
        <Footer />
      </div>

      <HowItWorksBanner />
      <MobileBottomNav />
    </div>
  );
}
