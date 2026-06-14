export function rawPriceToUsd(raw: string | null | undefined): number {
  if (!raw) return 0;
  return parseFloat(raw) / 1_000_000;
}

export function rawChangePercent(
  raw: string | null | undefined,
): number | null {
  if (raw == null || raw === "") return null;
  const value = parseInt(raw, 10) / 100;
  return Number.isFinite(value) ? value : null;
}

export function rawApy(raw: string | null | undefined): number | null {
  if (!raw) return null;
  const value = parseFloat(raw) / 10_000;
  return Number.isFinite(value) ? value : null;
}

export function formatTimeAgo(isoDate: string): string {
  const published = new Date(isoDate).getTime();
  const diffMs = Date.now() - published;
  const minutes = Math.floor(diffMs / 60_000);

  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes}m ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;

  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;

  return new Date(isoDate).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });
}
