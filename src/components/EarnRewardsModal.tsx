import { Banknote, Wallet, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";

interface EarnRewardsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const STEPS = [
  {
    icon: Wallet,
    iconClassName: "text-muted-foreground",
    title: "Buy Team Shares",
    description: "Be the first to believe.",
  },
  {
    emoji: "🏆",
    title: "Rewards from AP Rankings",
    description:
      "Teams earn rewards based on AP Poll vote share. APY reflects rewards relative to share price.",
  },
  {
    icon: Banknote,
    iconClassName: "text-success",
    title: "Claim Anytime",
    description: "Rewards stack up daily. Cash out anytime — even a penny.",
  },
] as const;

export function EarnRewardsModal({ open, onOpenChange }: EarnRewardsModalProps) {
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

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.button
            type="button"
            aria-label="Close earn rewards modal"
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
            aria-labelledby="earn-rewards-title"
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 w-full max-w-md overflow-hidden rounded-2xl border border-border bg-card shadow-2xl"
          >
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="absolute right-4 top-4 text-muted-foreground transition-colors hover:text-foreground"
              aria-label="Close"
            >
              <X className="h-5 w-5" strokeWidth={2} />
            </button>

            <div className="flex flex-col items-center px-6 pb-2 pt-8 text-center">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-success/10">
                <Banknote className="h-7 w-7 text-success" />
              </div>
              <h2 id="earn-rewards-title" className="mb-2 text-xl font-bold">
                Earn Rewards
              </h2>
              <p className="text-sm text-muted-foreground">
                Hold team shares and earn yield automatically based on each
                team&apos;s APY.
              </p>
            </div>

            <div className="space-y-3 px-6 pb-6 pt-4">
              {STEPS.map((step) => (
                <div
                  key={step.title}
                  className="flex items-start gap-3 rounded-xl border border-border/50 bg-muted/50 p-4"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-background">
                    {"emoji" in step ? (
                      <span className="text-lg">{step.emoji}</span>
                    ) : (
                      <step.icon
                        className={`h-5 w-5 ${step.iconClassName}`}
                      />
                    )}
                  </div>
                  <div className="text-left">
                    <div className="text-sm font-semibold">{step.title}</div>
                    <div className="text-xs text-muted-foreground">
                      {step.description}
                    </div>
                  </div>
                </div>
              ))}

              <button
                type="button"
                onClick={() => onOpenChange(false)}
                className="mt-4 h-11 w-full cursor-pointer rounded-lg bg-secondary text-sm font-medium text-secondary-foreground transition-colors hover:bg-secondary/80"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
