import { TrendingUp } from "lucide-react";
import type { Team } from "../types";
import { ChangeBadge, TeamAvatar } from "./ui/primitives";

interface TeamsSidebarProps {
  teams: Team[];
}

function TeamMarketRow({
  team,
  changeValue,
}: {
  team: Team;
  changeValue: number | null | undefined;
}) {
  return (
    <button
      type="button"
      className="flex w-full items-center gap-3 rounded-xl p-3 text-left transition-colors hover:bg-muted/50"
    >
      <TeamAvatar
        src={team.logoUrl}
        alt={team.name}
        bgColor={team.primaryColor}
      />
      <div className="min-w-0 flex-1">
        <span className="block truncate text-sm font-semibold">{team.name}</span>
        <span className="block truncate text-xs text-muted-foreground">
          {team.conference}
        </span>
      </div>
      <div className="text-right">
        <span className="block text-sm font-bold tabular-nums">
          ${team.price.toFixed(2)}
        </span>
        {changeValue != null && (
          <ChangeBadge value={changeValue} size="xs" variant="sidebar" />
        )}
      </div>
    </button>
  );
}

export function TeamsSidebar({ teams }: TeamsSidebarProps) {
  const gainers = teams
    .filter((team) => (team.change24h ?? 0) > 0)
    .sort((a, b) => (b.change24h ?? 0) - (a.change24h ?? 0))
    .slice(0, 8);

  if (gainers.length === 0) {
    return null;
  }

  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold">
        <TrendingUp className="h-5 w-5" />
        Gainers (24H)
      </h3>
      <div className="flex flex-col gap-1">
        {gainers.map((team) => (
          <TeamMarketRow
            key={team.id}
            team={team}
            changeValue={team.change24h}
          />
        ))}
      </div>
    </div>
  );
}
