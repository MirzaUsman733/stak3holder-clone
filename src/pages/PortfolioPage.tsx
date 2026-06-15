import { Link } from "react-router-dom";
import {
  Banknote,
  CircleHelp,
  TrendingUp,
  Wallet,
} from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { EarnRewardsModal } from "../components/EarnRewardsModal";
import { cn, formatPrice } from "../lib/utils";

type PortfolioTab = "positions" | "activity";

function PortfolioStatCard({
  icon: Icon,
  value,
  label,
  showInfo,
  onInfoClick,
  to,
}: {
  icon: typeof Wallet;
  value: number;
  label: string;
  showInfo?: boolean;
  onInfoClick?: () => void;
  to?: string;
}) {
  const content = (
    <>
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 md:h-10 md:w-10">
        <Icon className="h-4 w-4 text-emerald-500 md:h-5 md:w-5" />
      </div>
      <div className="min-w-0">
        <p className="text-xl font-bold tabular-nums md:text-2xl">
          {formatPrice(value)}
        </p>
        <p className="text-xs text-muted-foreground">{label}</p>
      </div>
      {showInfo && (
        <CircleHelp className="absolute bottom-1.5 right-1.5 h-3.5 w-3.5 text-muted-foreground/50 transition-colors group-hover:text-muted-foreground" />
      )}
    </>
  );

  const className =
    "group relative flex h-full min-w-[8.75rem] items-center gap-2 rounded-lg border border-border/50 bg-background/50 p-2 text-left transition-colors hover:bg-background/70 md:min-w-[9.5rem] md:gap-3 md:p-3";

  if (showInfo) {
    return (
      <button
        type="button"
        onClick={onInfoClick}
        className={cn(className, "cursor-pointer")}
        aria-label="Learn about rewards"
      >
        {content}
      </button>
    );
  }

  if (to) {
    return (
      <Link to={to} className={className}>
        {content}
      </Link>
    );
  }

  return <div className={className}>{content}</div>;
}

export function PortfolioPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<PortfolioTab>("positions");
  const [earnRewardsOpen, setEarnRewardsOpen] = useState(false);

  const cashBalance = 0;
  const portfolioValue = 0;
  const rewardsBalance = 0;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header
        showSearch
        authenticated
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        cashBalance={cashBalance}
        portfolioValue={portfolioValue}
        username="mirzausman"
        avatarUrl="/pfp/Black_and_Red.png"
      />

      <main className="mx-auto max-w-4xl px-4 py-6 lg:py-8">
        <div className="space-y-4">
          <section className="mb-8 rounded-xl border border-primary/20 bg-gradient-to-br from-primary/5 to-background">
            <div className="px-4 py-6 md:px-6 md:py-8">
              <div className="flex flex-col items-start justify-between gap-4 md:gap-6 lg:flex-row lg:gap-8">
                <div className="w-full shrink-0 lg:w-auto">
                  <p className="mb-1 text-xs font-medium uppercase tracking-wider text-muted-foreground md:mb-2">
                    Portfolio Value
                  </p>
                  <p className="bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-4xl font-bold tabular-nums text-transparent md:text-5xl lg:text-6xl">
                    {formatPrice(portfolioValue)}
                  </p>
                </div>

                <div className="w-full lg:ml-auto lg:w-auto lg:shrink-0">
                  <div className="grid grid-cols-2 gap-2 md:gap-3">
                    <PortfolioStatCard
                      icon={Wallet}
                      value={cashBalance}
                      label="Cash"
                      to="/profile"
                    />
                    <PortfolioStatCard
                      icon={Banknote}
                      value={rewardsBalance}
                      label="Rewards"
                      showInfo
                      onInfoClick={() => setEarnRewardsOpen(true)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="overflow-hidden rounded-xl border border-border bg-card">
            <div className="flex gap-6 border-b border-border px-5 pt-1 lg:px-6">
              {(
                [
                  ["positions", "Positions"],
                  ["activity", "Activity"],
                ] as const
              ).map(([tab, label]) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={cn(
                    "relative py-3.5 text-sm font-medium transition-colors",
                    activeTab === tab
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {label}
                  {activeTab === tab && (
                    <motion.span
                      layoutId="portfolio-tab-indicator"
                      className="absolute inset-x-0 -bottom-px h-0.5 bg-primary"
                      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    />
                  )}
                </button>
              ))}
            </div>

            <div className="flex min-h-[22rem] flex-col items-center justify-center px-6 py-16 text-center">
              {activeTab === "positions" ? (
                <>
                  <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-border bg-secondary/40">
                    <Wallet className="h-8 w-8 text-muted-foreground/70" strokeWidth={1.5} />
                  </div>
                  <h2 className="text-lg font-semibold">Your Portfolio is Empty</h2>
                  <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
                    Start building your portfolio by trading teams. The higher your
                    teams rank, the bigger the rewards.
                  </p>
                  <Link
                    to="/"
                    className="mt-6 inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                  >
                    <TrendingUp className="h-4 w-4" />
                    Start Trading
                  </Link>
                </>
              ) : (
                <>
                  <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-border bg-secondary/40">
                    <TrendingUp className="h-8 w-8 text-muted-foreground/70" strokeWidth={1.5} />
                  </div>
                  <h2 className="text-lg font-semibold">No Activity Yet</h2>
                  <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
                    Your trades, deposits, and withdrawals will appear here once you
                    start using the platform.
                  </p>
                  <Link
                    to="/"
                    className="mt-6 inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                  >
                    <TrendingUp className="h-4 w-4" />
                    Start Trading
                  </Link>
                </>
              )}
            </div>
          </section>
        </div>
      </main>

      <Footer />

      <EarnRewardsModal
        open={earnRewardsOpen}
        onOpenChange={setEarnRewardsOpen}
      />
    </div>
  );
}
