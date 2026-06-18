import type { Sport } from "../types";

/** Sports with live token/team data on the platform. */
export type DataSport = "cbb" | "cfb";

export function getDataSport(sport: Sport): DataSport {
  return sport === "cfb" ? "cfb" : "cbb";
}

export function hasLiveMarketData(sport: Sport): boolean {
  return sport === "cbb" || sport === "cfb";
}
