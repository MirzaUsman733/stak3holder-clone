import { CreditCard } from "lucide-react";
import { useState } from "react";
import { formatPrice } from "../lib/utils";
import { DepositModal } from "./DepositModal";
import { ProfileDropdown } from "./ProfileDropdown";

interface AuthenticatedHeaderActionsProps {
  cashBalance?: number;
  portfolioValue?: number;
  username?: string;
  avatarUrl?: string;
}

function BalanceStat({
  value,
  label,
}: {
  value: number;
  label: string;
}) {
  return (
    <div className="hidden flex-col items-end sm:flex">
      <span className="text-sm font-semibold tabular-nums">{formatPrice(value)}</span>
      <span className="text-[11px] text-muted-foreground">{label}</span>
    </div>
  );
}

export function AuthenticatedHeaderActions({
  cashBalance = 0,
  portfolioValue = 0,
  username,
  avatarUrl,
}: AuthenticatedHeaderActionsProps) {
  const [depositOpen, setDepositOpen] = useState(false);

  return (
    <>
      <div className="flex items-center gap-3 lg:gap-4">
        <BalanceStat value={cashBalance} label="Cash" />
        <BalanceStat value={portfolioValue} label="Portfolio" />

        <button
          type="button"
          onClick={() => setDepositOpen(true)}
          className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-primary px-3.5 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 lg:px-4"
        >
          <CreditCard className="h-4 w-4" />
          <span className="hidden sm:inline">Deposit</span>
        </button>

        <ProfileDropdown username={username} avatarUrl={avatarUrl} />
      </div>

      <DepositModal open={depositOpen} onOpenChange={setDepositOpen} />
    </>
  );
}
