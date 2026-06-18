import type { Sport, Team } from "../types";
import { getTrendingChangeKey } from "../types";
import { ChangeBadge, TeamAvatar } from "./ui/primitives";

interface MobileTeamListProps {
  teams: Team[];
  sport: Sport;
  changeField?: "24h" | "7d";
  isLoading?: boolean;
}

function getChangeValue(
  team: Team,
  sport: Sport,
  changeField?: "24h" | "7d",
) {
  if (changeField === "24h") {
    return team.change24h;
  }

  return team[getTrendingChangeKey(sport)];
}

export function MobileTeamList({
  teams,
  sport,
  changeField,
  isLoading = false,
}: MobileTeamListProps) {
  if (isLoading) {
    return (
      <div className="flex flex-col gap-3">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="flex items-center gap-3 py-3">
            <div className="h-10 w-10 animate-pulse rounded-full bg-muted" />
            <div className="h-4 flex-1 animate-pulse rounded bg-muted" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {teams.map((team) => {
        const changeValue = getChangeValue(team, sport, changeField);

        return (
          <button
            key={team.id}
            type="button"
            className="flex w-full items-center gap-3 rounded-xl p-3 text-left transition-colors hover:bg-muted/50"
          >
            <TeamAvatar
              src={team.logoUrl}
              alt={team.name}
              bgColor={team.primaryColor}
            />
            <div className="min-w-0 flex-1">
              <span className="block truncate text-sm font-semibold">
                {team.name}
              </span>
              <span className="block truncate text-xs text-muted-foreground">
                {team.conference}
              </span>
            </div>
            <div className="text-right">
              <span className="block text-sm font-bold tabular-nums">
                ${team.price.toFixed(2)}
              </span>
              {changeValue != null && (
                <ChangeBadge
                  value={changeValue}
                  size="xs"
                  variant="sidebar"
                />
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
}
