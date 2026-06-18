import { useMemo, useState } from "react";
import { useMarket } from "../context/MarketContext";
import { useMarketData } from "../hooks/useMarketData";
import { getDataSport } from "../lib/market";
import type { MobileListTab } from "../types";
import { Header } from "../components/Header";
import { PriceTicker } from "../components/PriceTicker";
import { Footer } from "../components/Footer";
import { HeadlinesSection } from "../components/HeadlinesSection";
import { TrendingSidebar } from "../components/TrendingSidebar";
import { WeeklyTopTrades } from "../components/WeeklyTopTrades";
import { BrowseTeamsSection } from "../components/TeamsTable";
import { MobileTeamList } from "../components/MobileTeamList";
import { cn } from "../lib/utils";

export function HomePage() {
  const { sport } = useMarket();
  const dataSport = getDataSport(sport);
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileTab, setMobileTab] = useState<MobileListTab>("trending");

  const {
    teams,
    trending,
    gainers,
    teamByTokenAddress,
    isLoading,
  } = useMarketData(dataSport);

  const teamsById = useMemo(
    () => new Map(teams.map((team) => [team.id, team])),
    [teams],
  );

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
    <div className="min-h-screen bg-background text-foreground">
      <Header
        showSearch
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <PriceTicker teams={teams} sport={dataSport} isLoading={isLoading} />

      <main className="site-container py-6">
        <div className="mb-8 grid grid-cols-1 items-stretch gap-6 lg:grid-cols-4">
          <div className="lg:col-span-3">
            <HeadlinesSection sport={sport} teamsById={teamsById} />
          </div>
          <TrendingSidebar items={trending} sport={dataSport} isLoading={isLoading} />
        </div>

        <WeeklyTopTrades sport={dataSport} teamByToken={teamByTokenAddress} />

        <div className="lg:hidden">
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
            sport={dataSport}
            changeField={mobileChangeField}
            isLoading={isLoading}
          />
        </div>

        <BrowseTeamsSection
          teams={teams}
          searchQuery={searchQuery}
          isLoading={isLoading}
        />
      </main>

      <Footer />
    </div>
  );
}
