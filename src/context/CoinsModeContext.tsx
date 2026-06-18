import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

interface CoinsModeContextType {
  coinsMode: boolean;
  setCoinsMode: (value: boolean) => void;
  toggleCoinsMode: () => void;
}

const CoinsModeContext = createContext<CoinsModeContextType>({
  coinsMode: false,
  setCoinsMode: () => {},
  toggleCoinsMode: () => {},
});

const STORAGE_KEY = "streakx_coins_mode";

export function useCoinsMode() {
  return useContext(CoinsModeContext);
}

export function CoinsModeProvider({ children }: { children: ReactNode }) {
  const [coinsMode, setCoinsModeState] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return localStorage.getItem(STORAGE_KEY) === "1";
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, coinsMode ? "1" : "0");
    } catch {
      // ignore storage errors
    }
  }, [coinsMode]);

  const setCoinsMode = (value: boolean) => setCoinsModeState(value);
  const toggleCoinsMode = () => setCoinsModeState((previous) => !previous);

  return (
    <CoinsModeContext.Provider
      value={{ coinsMode, setCoinsMode, toggleCoinsMode }}
    >
      {children}
    </CoinsModeContext.Provider>
  );
}
