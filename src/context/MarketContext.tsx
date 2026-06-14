import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Sport } from "../types";

interface MarketContextValue {
  sport: Sport;
  setSport: (sport: Sport) => void;
}

const MarketContext = createContext<MarketContextValue | undefined>(undefined);

export function MarketProvider({ children }: { children: ReactNode }) {
  const [sport, setSport] = useState<Sport>("cbb");

  const value = useMemo(
    () => ({
      sport,
      setSport,
    }),
    [sport],
  );

  return (
    <MarketContext.Provider value={value}>{children}</MarketContext.Provider>
  );
}

export function useMarket() {
  const context = useContext(MarketContext);
  if (!context) {
    throw new Error("useMarket must be used within MarketProvider");
  }
  return context;
}
