import { CreditCard, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { cn } from "../lib/utils";

const PRESET_AMOUNTS = [25, 100, 500, 2500] as const;

type PaymentMethod = "debit_card" | "apple_pay" | "coinbase";

interface DepositModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function ApplePayIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
    </svg>
  );
}

export function DepositModal({ open, onOpenChange }: DepositModalProps) {
  const [selectedAmount, setSelectedAmount] = useState(PRESET_AMOUNTS[1].toString());
  const [customAmount, setCustomAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("debit_card");

  useEffect(() => {
    if (!open) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onOpenChange(false);
    }

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, onOpenChange]);

  function selectPreset(amount: number) {
    setSelectedAmount(amount.toString());
    setCustomAmount("");
  }

  function handleCustomAmountChange(value: string) {
    let next = value.replace(/[^0-9]/g, "");
    if (next.startsWith("0") && next.length > 1) {
      next = next.slice(1);
    }
    setCustomAmount(next);
    if (next) setSelectedAmount(next);
  }

  const displayAmount = customAmount || selectedAmount;

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center sm:p-4">
          <motion.button
            type="button"
            aria-label="Close deposit modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => onOpenChange(false)}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="deposit-modal-title"
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 flex max-h-[92vh] w-full flex-col overflow-y-auto rounded-t-2xl border border-border bg-card shadow-2xl sm:max-w-[500px] sm:rounded-2xl"
          >
            <div className="px-4 pt-4 sm:px-6">
              <div className="relative flex items-center justify-center sm:block">
                <button
                  type="button"
                  onClick={() => onOpenChange(false)}
                  className="absolute left-0 text-foreground sm:hidden"
                  aria-label="Close"
                >
                  <X className="h-5 w-5" strokeWidth={2} />
                </button>
                <button
                  type="button"
                  onClick={() => onOpenChange(false)}
                  className="absolute right-0 hidden text-muted-foreground transition-colors hover:text-foreground sm:inline-flex"
                  aria-label="Close"
                >
                  <X className="h-5 w-5" strokeWidth={2} />
                </button>
                <h2
                  id="deposit-modal-title"
                  className="text-center text-lg font-bold sm:text-left sm:text-2xl"
                >
                  Deposit
                </h2>
              </div>
              <p className="mt-2 hidden text-sm text-muted-foreground sm:block">
                Select an amount and payment method to deposit to your wallet.
              </p>
            </div>

            <div className="space-y-6 px-4 py-4 sm:px-6">
              <div className="space-y-3">
                <label className="text-sm font-medium">Select Amount</label>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {PRESET_AMOUNTS.map((amount) => {
                    const isActive =
                      selectedAmount === amount.toString() && !customAmount;
                    return (
                      <button
                        key={amount}
                        type="button"
                        onClick={() => selectPreset(amount)}
                        className={cn(
                          "h-12 rounded-lg border text-base font-semibold transition-colors",
                          isActive
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-border bg-transparent text-foreground hover:border-primary/50",
                        )}
                      >
                        ${amount}
                      </button>
                    );
                  })}
                </div>

                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-base text-muted-foreground">
                    $
                  </span>
                  <input
                    id="custom-amount"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    value={customAmount}
                    onChange={(event) =>
                      handleCustomAmountChange(event.target.value)
                    }
                    className="h-12 w-full rounded-lg border border-border bg-background pl-7 pr-28 text-base outline-none transition-shadow focus:ring-2 focus:ring-primary"
                    placeholder="0.00"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
                    Other Amount
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-sm font-medium">Payment Method</label>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("debit_card")}
                    className={cn(
                      "flex h-[80px] flex-col items-center justify-center gap-2 rounded-lg border-2 p-3 transition-all hover:border-primary/50 sm:h-[120px] sm:p-6",
                      paymentMethod === "debit_card"
                        ? "border-primary bg-primary/5"
                        : "border-border",
                    )}
                  >
                    <div className="flex items-center gap-2">
                      <CreditCard className="h-6 w-6 sm:h-7 sm:w-7" />
                      <span className="text-base font-medium">Debit</span>
                    </div>
                    {paymentMethod === "debit_card" && (
                      <span className="text-xs text-muted-foreground">
                        max $500 /week
                      </span>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod("apple_pay")}
                    className={cn(
                      "flex h-[80px] flex-col items-center justify-center gap-2 rounded-lg border-2 bg-black p-3 text-white transition-all hover:border-primary/50 sm:h-[120px] sm:p-6",
                      paymentMethod === "apple_pay"
                        ? "border-primary"
                        : "border-border bg-black/90 hover:bg-black",
                    )}
                  >
                    <div className="flex items-center gap-2">
                      <ApplePayIcon className="h-6 w-6 sm:h-7 sm:w-7" />
                      <span className="text-base font-medium">Pay</span>
                    </div>
                    {paymentMethod === "apple_pay" && (
                      <span className="text-xs text-white/70">
                        max $500 /week
                      </span>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod("coinbase")}
                    className={cn(
                      "col-span-2 flex h-[80px] items-center justify-center gap-2 rounded-lg border-2 bg-[#0052FF] p-3 text-white transition-all hover:border-primary/50 sm:col-span-1 sm:h-[120px] sm:p-6",
                      paymentMethod === "coinbase"
                        ? "border-primary"
                        : "border-border hover:bg-[#0052FF]",
                    )}
                  >
                    <img
                      src="/coinbase-icon.png"
                      alt="Coinbase"
                      className="h-6 w-6 sm:h-7 sm:w-7"
                    />
                    <span className="text-base font-medium">Coinbase</span>
                  </button>
                </div>
              </div>

              <div className="space-y-2 pb-4">
                <button
                  type="button"
                  className="h-12 w-full cursor-pointer rounded-lg bg-primary text-base font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                  onClick={() => onOpenChange(false)}
                >
                  Deposit ${displayAmount}
                </button>
                <p className="text-center text-xs text-muted-foreground">
                  You&apos;ll be redirected to Coinbase to complete your
                  purchase securely
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
