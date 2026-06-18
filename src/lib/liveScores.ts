export type LiveLeague = "MLB" | "NBA" | "WNBA" | "NHL";

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

const SPORT_PATHS: Record<LiveLeague, string> = {
  NBA: "basketball/nba",
  MLB: "baseball/mlb",
  NHL: "hockey/nhl",
  WNBA: "basketball/wnba",
};

const NYY_LOGO = "/assets/team-logo-mlb-nyy-white.webp";

function getTeamLogo(league: LiveLeague, ticker: string, logo?: string) {
  const upper = ticker.toUpperCase();
  if (league === "MLB" && ["SD", "SDP"].includes(upper)) {
    return "https://a.espncdn.com/i/teamlogos/mlb/500-dark/sd.png";
  }
  if (league === "MLB" && upper === "MIN") {
    return "https://a.espncdn.com/i/teamlogos/mlb/500-dark/min.png";
  }
  if (league === "MLB" && upper === "NYY") {
    return NYY_LOGO;
  }
  return logo ?? "";
}

export async function fetchLiveGames(league: LiveLeague): Promise<LiveGame[]> {
  const path = SPORT_PATHS[league];
  const url = `https://site.api.espn.com/apis/site/v2/sports/${path}/scoreboard`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`ESPN scoreboard ${res.status}`);

  const json = await res.json();
  const events = (json?.events ?? []) as Array<Record<string, unknown>>;

  const games: LiveGame[] = events.map((ev) => {
    const comp = (ev.competitions as Array<Record<string, unknown>> | undefined)?.[0];
    const competitors = (comp?.competitors as Array<Record<string, unknown>>) ?? [];
    const home =
      competitors.find((c) => c.homeAway === "home") ?? competitors[0];
    const away =
      competitors.find((c) => c.homeAway === "away") ?? competitors[1];
    const status = comp?.status as Record<string, unknown> | undefined;
    const statusType = status?.type as Record<string, unknown> | undefined;
    const stateRaw = String(statusType?.state ?? "pre");

    let liveStatus: LiveStatus = "pre";
    if (stateRaw === "in") liveStatus = "live";
    else if (stateRaw === "post") liveStatus = "final";

    let detail = String(statusType?.shortDetail ?? statusType?.detail ?? "");
    if (liveStatus === "pre") {
      const d = new Date(String(ev.date));
      detail = d.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
      });
    }

    const homeTeam = home?.team as Record<string, unknown> | undefined;
    const awayTeam = away?.team as Record<string, unknown> | undefined;
    const homeScore = parseInt(String(home?.score ?? "0"), 10) || 0;
    const awayScore = parseInt(String(away?.score ?? "0"), 10) || 0;

    return {
      id: String(ev.id),
      homeTicker: String(homeTeam?.abbreviation ?? "").toUpperCase(),
      homeLogo: getTeamLogo(
        league,
        String(homeTeam?.abbreviation ?? ""),
        String(homeTeam?.logo ?? ""),
      ),
      homeScore,
      awayTicker: String(awayTeam?.abbreviation ?? "").toUpperCase(),
      awayLogo: getTeamLogo(
        league,
        String(awayTeam?.abbreviation ?? ""),
        String(awayTeam?.logo ?? ""),
      ),
      awayScore,
      status: liveStatus,
      detail,
      startTime: String(ev.date),
      homeWinning: homeScore >= awayScore,
    };
  });

  const order = { live: 0, pre: 1, final: 2 } as const;
  return games.sort((a, b) => order[a.status] - order[b.status]);
}

export const LIVE_LEAGUES: LiveLeague[] = ["MLB", "NBA", "WNBA", "NHL"];

export async function fetchAllLiveGames() {
  const results = await Promise.allSettled(
    LIVE_LEAGUES.map((league) => fetchLiveGames(league)),
  );

  const games: Array<LiveGame & { sport: LiveLeague }> = [];
  results.forEach((result, index) => {
    if (result.status === "fulfilled") {
      result.value.forEach((game) => {
        games.push({ ...game, sport: LIVE_LEAGUES[index] });
      });
    }
  });

  const sportRank: Record<LiveLeague, number> = {
    MLB: 0,
    NBA: 1,
    WNBA: 2,
    NHL: 3,
  };
  const order = { live: 0, pre: 1, final: 2 } as const;

  return games.sort((a, b) => {
    const statusOrder = order[a.status] - order[b.status];
    if (statusOrder !== 0) return statusOrder;
    const sportOrder = sportRank[a.sport] - sportRank[b.sport];
    if (sportOrder !== 0) return sportOrder;
    return new Date(a.startTime).getTime() - new Date(b.startTime).getTime();
  });
}
