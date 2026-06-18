import { Link, useLocation } from "react-router-dom";
import { Bell, Gauge, Search, Wallet } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { SportToggle } from "./SportToggle";
import { AuthenticatedHeaderActions } from "./AuthenticatedHeaderActions";
import { NAVBAR_LOGO } from "./SportIcon";
import { cn } from "../lib/utils";

interface HeaderProps {
  showSearch?: boolean;
  searchQuery?: string;
  onSearchChange?: (value: string) => void;
  authenticated?: boolean;
  cashBalance?: number;
  portfolioValue?: number;
  username?: string;
  avatarUrl?: string;
}

const notifications = [
  {
    id: 1,
    text: "@SharpEdge just opened a Buy/Back on Thunder — 7-1 ATS streak",
    time: "2m",
  },
  {
    id: 2,
    text: "Wizards spread moved to -8.5 — faders printing",
    time: "5m",
  },
  {
    id: 3,
    text: "@ATSGrinder hit 5 in a row — now #4 ranked",
    time: "12m",
  },
  {
    id: 4,
    text: "New position window: Celtics home stretch 5 games",
    time: "18m",
  },
];

export function Header({
  showSearch = false,
  searchQuery = "",
  onSearchChange,
  authenticated = false,
  cashBalance = 0,
  portfolioValue = 0,
  username,
  avatarUrl,
}: HeaderProps) {
  const location = useLocation();
  const [showNotifications, setShowNotifications] = useState(false);
  const notificationsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (!notificationsRef.current?.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    }

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const navLinks = [
    { to: "/", icon: Gauge, label: "Markets" },
    { to: "/portfolio", icon: Wallet, label: "Portfolio" },
  ];

  return (
    <nav className="relative sticky top-0 z-50 flex items-center justify-between gap-2 border-b border-border/50 bg-background px-3 py-0.5 sm:px-5 md:py-2.5">
      <div className="flex min-w-0 shrink-0 items-center gap-3 sm:gap-5">
        <Link
          to="/"
          className="-ml-2 flex items-center md:hidden"
          aria-label="StreakX home"
        >
          <img
            src={NAVBAR_LOGO}
            alt="StreakX"
            className="h-12 w-auto object-contain"
          />
        </Link>

        <div className="hidden items-center gap-0.5 md:flex">
          {navLinks.map(({ to, icon: Icon, label }) => (
            <Link
              key={to}
              to={to}
              className={cn(
                "flex items-center gap-1.5 rounded-xl px-3 py-2 text-sm font-semibold transition-all",
                location.pathname === to
                  ? "bg-surface-2 text-foreground"
                  : "text-muted-foreground hover:bg-surface-hover hover:text-foreground",
              )}
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex">
          <SportToggle variant="pill-bar" />
        </div>
      </div>

      {showSearch && (
        <div className="mx-auto hidden min-w-0 max-w-xl flex-1 items-center justify-center px-4 md:flex">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              value={searchQuery}
              onChange={(event) => onSearchChange?.(event.target.value)}
              placeholder="Search teams & users..."
              className="h-9 w-full rounded-xl border border-border/30 bg-surface-2 pl-9 pr-4 text-sm outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>
      )}

      <div className="flex shrink-0 items-center gap-2.5">
        {authenticated ? (
          <AuthenticatedHeaderActions
            cashBalance={cashBalance}
            portfolioValue={portfolioValue}
            username={username}
            avatarUrl={avatarUrl}
          />
        ) : (
          <Link
            to="/profile"
            className="rounded-full bg-foreground px-3 py-1.5 text-xs font-bold text-background transition-colors hover:bg-foreground/90 md:hidden"
          >
            Log In
          </Link>
        )}

        <div ref={notificationsRef} className="relative hidden md:block">
          <button
            type="button"
            onClick={() => setShowNotifications((value) => !value)}
            aria-label="Notifications"
            className="relative rounded-xl p-1.5 transition-colors hover:bg-surface-hover"
          >
            <Bell className="h-4 w-4 text-muted-foreground" />
            <span className="absolute right-1 top-1 h-1.5 w-1.5 rounded-full bg-success" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 top-full z-50 mt-2 w-72 overflow-hidden rounded-2xl border border-border/50 bg-surface-1 shadow-card-md sm:w-80">
              <div className="border-b border-border/30 p-3.5">
                <p className="text-xs font-extrabold text-foreground">
                  Notifications
                </p>
              </div>
              <div className="max-h-64 overflow-y-auto">
                {notifications.map((item) => (
                  <div
                    key={item.id}
                    className="cursor-pointer border-b border-border/20 px-3.5 py-3 transition-colors hover:bg-surface-hover"
                  >
                    <p className="text-xs font-medium leading-relaxed text-foreground">
                      {item.text}
                    </p>
                    <p className="mt-1 font-mono text-[10px] text-muted-foreground">
                      {item.time} ago
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
