import type { Sport } from "../types";

export function getSeasonYear(sport: Sport, date = new Date()): number {
  const month = date.getUTCMonth();
  const year = date.getUTCFullYear();

  if (sport === "cbb") {
    return month >= 6 ? year + 1 : year;
  }

  return month >= 6 ? year : year - 1;
}

export function getApPollWeek(date = new Date()): number {
  const season = getSeasonYear("cbb", date);
  const seasonStart = new Date(Date.UTC(season - 1, 10, 4));
  const weekMs = 7 * 24 * 60 * 60 * 1000;
  const week = Math.floor((date.getTime() - seasonStart.getTime()) / weekMs);
  return Math.max(1, Math.min(week + 1, 25));
}
