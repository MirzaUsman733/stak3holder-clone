import { useMemo, useState } from "react";
import { LayoutGrid } from "lucide-react";
import type { SortDirection, SortField, Team } from "../types";
import { cn } from "../lib/utils";
import { ApRankBadge, ChangeBadge, TeamAvatar } from "./ui/primitives";
import { TeamsSidebar } from "./TeamsSidebar";

interface TeamsTableProps {
  teams: Team[];
  searchQuery?: string;
  isLoading?: boolean;
}

const METRIC_COLUMNS: {
  key: SortField;
  label: string;
}[] = [
  { key: "price", label: "Price" },
  { key: "change24h", label: "24H%" },
  { key: "change7d", label: "7D%" },
  { key: "change3m", label: "3M%" },
  { key: "apy", label: "APY" },
];

function SortIndicator({
  active,
  direction,
}: {
  active: boolean;
  direction: SortDirection;
}) {
  return (
    <span className={cn("ml-1", !active && "text-muted-foreground/30")}>
      {active ? (direction === "asc" ? "▲" : "▼") : "▲"}
    </span>
  );
}

function compareTeams(
  a: Team,
  b: Team,
  field: SortField,
  direction: SortDirection,
) {
  const factor = direction === "asc" ? 1 : -1;

  const getValue = (team: Team) => {
    switch (field) {
      case "rank":
        return team.apRank ?? Number.POSITIVE_INFINITY;
      case "name":
        return team.name.toLowerCase();
      case "apRank":
        return team.apRank ?? Number.POSITIVE_INFINITY;
      case "price":
        return team.price;
      case "change24h":
        return team.change24h ?? Number.NEGATIVE_INFINITY;
      case "change7d":
        return team.change7d ?? Number.NEGATIVE_INFINITY;
      case "change3m":
        return team.change3m ?? Number.NEGATIVE_INFINITY;
      case "apy":
        return team.apy ?? Number.NEGATIVE_INFINITY;
      default:
        return 0;
    }
  };

  const left = getValue(a);
  const right = getValue(b);

  if (typeof left === "string" && typeof right === "string") {
    return left.localeCompare(right) * factor;
  }

  return ((left as number) - (right as number)) * factor;
}

export function TeamsTable({
  teams,
  searchQuery = "",
  isLoading = false,
}: TeamsTableProps) {
  const [sortField, setSortField] = useState<SortField>("price");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");

  const sortedTeams = useMemo(() => {
    let filtered = [...teams];

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (team) =>
          team.name.toLowerCase().includes(query) ||
          team.conference.toLowerCase().includes(query),
      );
    }

    return filtered.sort((a, b) =>
      compareTeams(a, b, sortField, sortDirection),
    );
  }, [teams, searchQuery, sortField, sortDirection]);

  function handleSort(field: SortField) {
    if (field === sortField) {
      setSortDirection((current) => (current === "asc" ? "desc" : "asc"));
      return;
    }

    setSortField(field);
    setSortDirection(field === "name" || field === "rank" ? "asc" : "desc");
  }

  return (
    <div className="rounded-xl border border-border bg-card px-5 pb-5 pt-0">
      <div className="mb-1 flex items-center border-b px-3 py-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground/80">
        <span className="w-12 shrink-0">#</span>

        <div className="flex min-w-0 flex-1 items-center gap-4">
          <button
            type="button"
            onClick={() => handleSort("name")}
            className="cursor-pointer select-none"
          >
            Team
            <SortIndicator
              active={sortField === "name"}
              direction={sortDirection}
            />
          </button>
          <button
            type="button"
            onClick={() => handleSort("rank")}
            className="cursor-pointer select-none"
          >
            AP Rank
            <SortIndicator
              active={sortField === "rank"}
              direction={sortDirection}
            />
          </button>
        </div>

        {METRIC_COLUMNS.map((column) => (
          <button
            key={column.key}
            type="button"
            onClick={() => handleSort(column.key)}
            className="w-20 shrink-0 cursor-pointer select-none text-right"
          >
            {column.label}
            <SortIndicator
              active={sortField === column.key}
              direction={sortDirection}
            />
          </button>
        ))}
      </div>

      <div className="flex flex-col">
        {isLoading ? (
          Array.from({ length: 12 }).map((_, index) => (
            <div key={index} className="flex items-center gap-3 rounded-xl p-3">
              <div className="h-4 w-8 animate-pulse rounded bg-muted" />
              <div className="h-10 w-10 animate-pulse rounded-full bg-muted" />
              <div className="h-4 flex-1 animate-pulse rounded bg-muted" />
            </div>
          ))
        ) : sortedTeams.length === 0 ? (
          <div className="py-12 text-center text-muted-foreground">
            No teams match your criteria
          </div>
        ) : (
          sortedTeams.map((team) => (
            <button
              key={team.id}
              type="button"
              className="flex w-full items-center rounded-xl p-3 text-left transition-colors hover:bg-muted/50"
            >
              <span className="w-12 shrink-0 text-sm text-muted-foreground">
                {team.rank}
              </span>

              <div className="flex min-w-0 flex-1 items-center gap-3">
                <TeamAvatar
                  src={team.logoUrl}
                  alt={team.name}
                  bgColor={team.primaryColor}
                />
                {team.apRank != null && (
                  <ApRankBadge rank={team.apRank} size="sm" />
                )}
                <span className="truncate text-[15px] font-semibold">
                  {team.name}
                </span>
                <span className="truncate text-sm text-muted-foreground">
                  {team.conference}
                </span>
              </div>

              <div className="w-20 shrink-0 text-right">
                <span className="text-sm font-semibold tabular-nums">
                  ${team.price.toFixed(2)}
                </span>
              </div>
              <div className="w-20 shrink-0 text-right">
                <ChangeBadge
                  value={team.change24h}
                  size="sm"
                  className="font-semibold"
                />
              </div>
              <div className="w-20 shrink-0 text-right">
                <ChangeBadge
                  value={team.change7d}
                  size="sm"
                  className="font-semibold"
                />
              </div>
              <div className="w-20 shrink-0 text-right">
                <ChangeBadge
                  value={team.change3m}
                  size="sm"
                  className="font-semibold"
                />
              </div>
              <div className="w-20 shrink-0 text-right">
                {team.apy == null ? (
                  <span className="text-sm font-semibold text-muted-foreground">
                    -
                  </span>
                ) : (
                  <span className="text-sm font-semibold text-muted-foreground">
                    {team.apy.toFixed(1)}%
                  </span>
                )}
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  );
}

export function BrowseTeamsSection({
  teams,
  searchQuery = "",
  isLoading = false,
}: TeamsTableProps & { isLoading?: boolean }) {
  return (
    <section className="mt-20 hidden lg:block">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-lg font-bold">
          <LayoutGrid className="h-5 w-5" />
          Browse All Teams
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
        <div className="lg:col-span-3">
          <TeamsTable
            teams={teams}
            searchQuery={searchQuery}
            isLoading={isLoading}
          />
        </div>
        <div className="lg:col-span-1">
          <TeamsSidebar teams={teams} />
        </div>
      </div>
    </section>
  );
}
