import { Compass, Home, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "../lib/utils";

function SocialIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.25"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="2" fill="currentColor" stroke="none" />
      <path d="M8.5 15.5a5 5 0 0 1 0-7" />
      <path d="M15.5 8.5a5 5 0 0 1 0 7" />
      <path d="M5.5 18.5a9 9 0 0 1 0-13" />
      <path d="M18.5 5.5a9 9 0 0 1 0 13" />
    </svg>
  );
}

const tabs = [
  { icon: Home, label: "Home", path: "/" },
  { icon: Compass, label: "Explore", path: "/#browse" },
  { icon: SocialIcon, label: "Social", path: "/leaderboard" },
  { icon: User, label: "Profile", path: "/profile" },
];

export function MobileBottomNav() {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background pb-[env(safe-area-inset-bottom)] md:hidden">
      <div className="grid h-12 grid-cols-4">
        {tabs.map((tab) => {
          const isActive =
            tab.path === "/"
              ? location.pathname === "/"
              : location.pathname + location.hash === tab.path ||
                location.pathname === tab.path;
          const Icon = tab.icon;

          return (
            <Link
              key={tab.label}
              to={tab.path}
              className="relative flex flex-col items-center justify-center gap-1 transition-colors"
            >
              {isActive && (
                <span className="absolute top-0 left-1/2 h-0.5 w-8 -translate-x-1/2 rounded-full bg-primary" />
              )}
              {tab.label === "Social" ? (
                <SocialIcon
                  className={cn(
                    "h-6 w-6 transition-all",
                    isActive ? "text-primary" : "text-muted-foreground",
                  )}
                />
              ) : (
                <Icon
                  className={cn(
                    "h-[22px] w-[22px] transition-all",
                    isActive ? "text-primary" : "text-muted-foreground",
                  )}
                  strokeWidth={isActive ? 2.25 : 1.75}
                />
              )}
              <span
                className={cn(
                  "text-[10px] tracking-wide transition-all",
                  isActive
                    ? "font-semibold text-primary"
                    : "font-medium text-muted-foreground",
                )}
              >
                {tab.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
