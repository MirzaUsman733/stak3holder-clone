import { LogOut } from "lucide-react";
import { useCoinsMode } from "../context/CoinsModeContext";
import { cn } from "../lib/utils";

const COINS_BALANCE = 150_000;

function CoinIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 22 22"
      aria-hidden
      className={cn("text-primary-foreground", className)}
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="11"
        cy="11"
        r="9.4"
        fill="currentColor"
        fillOpacity="0.25"
        stroke="currentColor"
        strokeWidth="1.3"
      />
      <circle
        cx="11"
        cy="11"
        r="7"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.7"
        strokeOpacity="0.6"
      />
      <text
        x="11"
        y="14.2"
        textAnchor="middle"
        fontSize="9"
        fontWeight="900"
        fontFamily="DM Sans, Arial, sans-serif"
        fill="currentColor"
        letterSpacing="-0.3"
      >
        C
      </text>
    </svg>
  );
}

interface MobileAuthenticatedNavProps {
  cashBalance?: number;
  onLogout?: () => void;
}

export function MobileBalancePill({ cashBalance = 0 }: { cashBalance?: number }) {
  const { coinsMode, toggleCoinsMode } = useCoinsMode();

  return (
    <button
      type="button"
      onClick={toggleCoinsMode}
      aria-label="Balance"
      style={{ WebkitTapHighlightColor: "transparent" }}
      className={cn(
        "absolute left-1/2 top-1/2 flex h-[28px] w-[166px] -translate-x-[75px] -translate-y-1/2 items-center justify-center rounded-[8px] text-[12px] font-bold leading-none tracking-tight antialiased tabular-nums shadow-[inset_0_1px_0_rgba(255,255,255,0.35)] outline-none focus:outline-none focus-visible:outline-none focus:ring-0 min-[400px]:w-[186px] min-[400px]:-translate-x-[85px] min-[400px]:text-[13px] min-[430px]:w-[206px] min-[430px]:-translate-x-[95px] lg:hidden",
        coinsMode
          ? "bg-primary text-primary-foreground"
          : "bg-[#f4f4f4] text-[#111111]",
      )}
    >
      {coinsMode ? (
        <span className="inline-flex items-center justify-center gap-1.5">
          <CoinIcon className="h-[18px] w-[18px]" />
          <span>{COINS_BALANCE.toLocaleString()} Coins</span>
        </span>
      ) : (
        <span>{cashBalance.toFixed(2)} Balance</span>
      )}
    </button>
  );
}

export function MobileAuthenticatedNav({ onLogout }: MobileAuthenticatedNavProps) {
  const { coinsMode, toggleCoinsMode } = useCoinsMode();

  return (
    <div className="flex items-center gap-2.5 lg:hidden">
      <button
        type="button"
        onClick={toggleCoinsMode}
        aria-label="Toggle coins/cash"
        className="relative flex h-[22px] w-[40px] shrink-0 items-center rounded-full border border-white/20 bg-[#1a1a1a] px-[2px]"
      >
        <span
          className={cn(
            "flex h-[18px] w-[18px] items-center justify-center rounded-full text-[9px] font-black leading-none transition-transform duration-200",
            coinsMode
              ? "translate-x-0 bg-primary text-primary-foreground"
              : "translate-x-[18px] bg-white text-[#111]",
          )}
        >
          {coinsMode ? "S" : "$"}
        </span>
      </button>

      <button
        type="button"
        onClick={onLogout}
        aria-label="Log out"
        className="rounded-xl p-1.5 transition-colors hover:bg-muted"
      >
        <LogOut
          className={cn(
            "h-5 w-5",
            coinsMode ? "text-primary" : "text-foreground",
          )}
        />
      </button>
    </div>
  );
}
