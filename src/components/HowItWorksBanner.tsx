import { useState } from "react";
import { HelpCircle, X } from "lucide-react";

export function HowItWorksBanner() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="How it works"
        className="fixed left-0 right-0 z-40 flex items-center justify-center gap-2 border-t border-border bg-background/90 py-2.5 backdrop-blur-md transition-colors active:bg-muted/50 md:hidden"
        style={{ bottom: "calc(3rem + env(safe-area-inset-bottom) - 3px)" }}
      >
        <HelpCircle className="h-4 w-4 text-muted-foreground" strokeWidth={2} />
        <span className="text-[13px] font-semibold text-foreground">
          How it Works
        </span>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[60] flex items-end bg-black/50 md:hidden"
          onClick={() => setOpen(false)}
        >
          <div
            className="w-full rounded-t-2xl border-t border-border bg-background p-5 pb-8"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-bold">How Stakeholder Works</h2>
              <button
                type="button"
                aria-label="Close"
                onClick={() => setOpen(false)}
                className="rounded-xl p-1.5 text-muted-foreground hover:bg-muted"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-4 text-[14px] leading-relaxed text-muted-foreground">
              <div>
                <p className="font-bold text-foreground">1. Pick a team</p>
                <p>
                  Browse CBB and CFB markets. Every team shows price, AP rank,
                  and recent performance.
                </p>
              </div>
              <div>
                <p className="font-bold text-foreground">2. Build a position</p>
                <p>
                  Buy team tokens when you believe in a program, or trade out
                  when momentum shifts.
                </p>
              </div>
              <div>
                <p className="font-bold text-foreground">3. Track your portfolio</p>
                <p>
                  Monitor holdings, weekly top trades, and leaderboard rankings
                  as the season unfolds.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
