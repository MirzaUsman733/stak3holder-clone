export type LiveScoreSport = "mlb" | "nba" | "wnba" | "nhl";

export type LiveStatus = "pre" | "live" | "final";

export interface LiveGame {
  id: string;
  homeTicker: string;
  homeLogo: string;
  homeScore: number;
  awayTicker: string;
  awayLogo: string;
  awayScore: number;
  status: LiveStatus;
  detail: string;
  startTime: string;
  homeWinning: boolean;
}

export interface LiveGameWithSport extends LiveGame {
  sport: LiveScoreSport;
}

const SPORT_PATHS: Record<LiveScoreSport, string> = {
  mlb: "baseball/mlb",
  nba: "basketball/nba",
  wnba: "basketball/wnba",
  nhl: "hockey/nhl",
};

function getTeamLogo(sport: LiveScoreSport, ticker: string, logo?: string) {
  const upper = ticker.toUpperCase();
  if (sport === "mlb" && ["SD", "SDP"].includes(upper)) {
    return "https://a.espncdn.com/i/teamlogos/mlb/500-dark/sd.png";
  }
  if (sport === "mlb" && upper === "MIN") {
    return "https://a.espncdn.com/i/teamlogos/mlb/500-dark/min.png";
  }
  return logo ?? "";
}

export async function fetchLiveGames(sport: LiveScoreSport): Promise<LiveGame[]> {
  const path = SPORT_PATHS[sport];
  const res = await fetch(
    `https://site.api.espn.com/apis/site/v2/sports/${path}/scoreboard`,
  );
  if (!res.ok) {
    throw new Error(`ESPN scoreboard ${res.status}`);
  }

  const json = (await res.json()) as {
    events?: Array<{
      id: string;
      date: string;
      competitions?: Array<{
        competitors?: Array<{
          homeAway?: string;
          score?: string;
          team?: { abbreviation?: string; logo?: string };
        }>;
        status?: {
          type?: { state?: string; shortDetail?: string; detail?: string };
          period?: number;
          displayClock?: string;
        };
      }>;
    }>;
  };

  const games: LiveGame[] = (json.events ?? []).map((ev) => {
    const comp = ev.competitions?.[0];
    const competitors = comp?.competitors ?? [];
    const home =
      competitors.find((c) => c.homeAway === "home") ?? competitors[0];
    const away =
      competitors.find((c) => c.homeAway === "away") ?? competitors[1];
    const status = comp?.status?.type;
    const stateRaw = status?.state ?? "pre";

    let liveStatus: LiveStatus = "pre";
    if (stateRaw === "in") liveStatus = "live";
    else if (stateRaw === "post") liveStatus = "final";

    let detail = status?.shortDetail ?? status?.detail ?? "";
    if (liveStatus === "pre") {
      detail = new Date(ev.date).toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
      });
    }

    const homeScore = parseInt(home?.score ?? "0", 10) || 0;
    const awayScore = parseInt(away?.score ?? "0", 10) || 0;

    return {
      id: ev.id,
      homeTicker: (home?.team?.abbreviation ?? "").toUpperCase(),
      homeLogo: getTeamLogo(
        sport,
        home?.team?.abbreviation ?? "",
        home?.team?.logo,
      ),
      homeScore,
      awayTicker: (away?.team?.abbreviation ?? "").toUpperCase(),
      awayLogo: getTeamLogo(
        sport,
        away?.team?.abbreviation ?? "",
        away?.team?.logo,
      ),
      awayScore,
      status: liveStatus,
      detail,
      startTime: ev.date,
      homeWinning: homeScore >= awayScore,
    };
  });

  const order = { live: 0, pre: 1, final: 2 } as const;
  return games.sort((a, b) => order[a.status] - order[b.status]);
}

export const LIVE_SCORE_LEAGUES: LiveScoreSport[] = ["mlb", "nba", "wnba", "nhl"];

export async function fetchAllLiveGames(): Promise<LiveGameWithSport[]> {
  const results = await Promise.allSettled(
    LIVE_SCORE_LEAGUES.map(async (sport) => {
      const games = await fetchLiveGames(sport);
      return games.map((game) => ({ ...game, sport }));
    }),
  );

  const out: LiveGameWithSport[] = [];
  for (const result of results) {
    if (result.status === "fulfilled") {
      out.push(...result.value);
    }
  }

  const order = { live: 0, pre: 1, final: 2 } as const;
  const sportRank: Record<LiveScoreSport, number> = {
    mlb: 0,
    nba: 1,
    wnba: 2,
    nhl: 3,
  };

  return out.sort((a, b) => {
    const statusOrder = order[a.status] - order[b.status];
    if (statusOrder !== 0) return statusOrder;
    const sportOrder = sportRank[a.sport] - sportRank[b.sport];
    if (sportOrder !== 0) return sportOrder;
    return new Date(a.startTime).getTime() - new Date(b.startTime).getTime();
  });
}
