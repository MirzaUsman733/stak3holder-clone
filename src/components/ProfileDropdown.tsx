import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  ChevronUp,
  HelpCircle,
  LogOut,
  Moon,
  Settings,
  Trophy,
  User,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { cn } from "../lib/utils";
import { UserAvatar } from "./UserAvatar";

interface ProfileDropdownProps {
  username?: string;
  avatarUrl?: string;
}

function DarkModeToggle({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={onChange}
      className={cn(
        "relative h-6 w-11 shrink-0 rounded-full transition-colors duration-200",
        checked ? "bg-primary" : "bg-muted",
      )}
    >
      <span
        className={cn(
          "absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-background shadow-sm transition-transform duration-200",
          checked && "translate-x-5 bg-primary-foreground",
        )}
      />
    </button>
  );
}

export function ProfileDropdown({
  username = "mirzausman",
  avatarUrl,
}: ProfileDropdownProps) {
  const { theme, toggleTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const closeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function openMenu() {
    if (closeTimeout.current) {
      clearTimeout(closeTimeout.current);
      closeTimeout.current = null;
    }
    setOpen(true);
  }

  function scheduleClose() {
    closeTimeout.current = setTimeout(() => setOpen(false), 180);
  }

  const menuItems = [
    { to: "/portfolio", icon: User, label: "My Portfolio" },
    { to: "/leaderboard", icon: Trophy, label: "Leaderboard" },
    { to: "/faq", icon: HelpCircle, label: "How it Works" },
  ] as const;

  return (
    <div
      ref={containerRef}
      className="relative"
      onMouseEnter={openMenu}
      onMouseLeave={scheduleClose}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="menu"
        onClick={() => setOpen((value) => !value)}
        className="flex items-center gap-2 rounded-full border border-border bg-secondary/80 py-1 pl-1 pr-2.5 transition-colors hover:bg-secondary"
      >
        <UserAvatar avatarUrl={avatarUrl} username={username} />
        <ChevronUp
          className={cn(
            "h-4 w-4 text-muted-foreground transition-transform duration-200",
            !open && "rotate-180",
          )}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            role="menu"
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute right-0 top-[calc(100%+10px)] z-50 w-[17.5rem] overflow-hidden rounded-xl border border-border bg-popover shadow-2xl"
            onMouseEnter={openMenu}
            onMouseLeave={scheduleClose}
          >
            <div className="flex items-center gap-3 border-b border-border px-4 py-3.5">
              <UserAvatar
                avatarUrl={avatarUrl}
                username={username}
                className="h-10 w-10"
              />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold">{username}</p>
                <Link
                  to="/profile"
                  onClick={() => setOpen(false)}
                  className="text-xs text-muted-foreground transition-colors hover:text-foreground"
                >
                  View Profile
                </Link>
              </div>
              <Link
                to="/settings"
                onClick={() => setOpen(false)}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                aria-label="Settings"
              >
                <Settings className="h-4 w-4" />
              </Link>
            </div>

            <div className="p-2">
              {menuItems.map(({ to, icon: Icon, label }) => (
                <Link
                  key={to}
                  to={to}
                  role="menuitem"
                  onClick={() => setOpen(false)}
                  className="flex h-10 items-center gap-3 rounded-lg px-3 text-sm font-medium transition-colors hover:bg-muted"
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  {label}
                </Link>
              ))}

              <div className="flex h-10 items-center justify-between rounded-lg px-3">
                <div className="flex items-center gap-3 text-sm font-medium">
                  <Moon className="h-4 w-4 shrink-0" />
                  Dark Mode
                </div>
                <DarkModeToggle
                  checked={theme === "dark"}
                  onChange={toggleTheme}
                />
              </div>

              <button
                type="button"
                role="menuitem"
                className="flex h-10 w-full items-center gap-3 rounded-lg px-3 text-sm font-medium transition-colors hover:bg-muted"
              >
                <ArrowUpRight className="h-4 w-4 shrink-0" />
                Withdraw
              </button>

              <Link
                to="/settings"
                role="menuitem"
                onClick={() => setOpen(false)}
                className="flex h-10 items-center gap-3 rounded-lg px-3 text-sm font-medium transition-colors hover:bg-muted"
              >
                <Settings className="h-4 w-4 shrink-0" />
                Settings
              </Link>
            </div>

            <div className="border-t border-border p-2">
              <button
                type="button"
                role="menuitem"
                className="flex h-10 w-full items-center gap-3 rounded-lg px-3 text-sm font-medium text-red-500 transition-colors hover:bg-red-500/10"
              >
                <LogOut className="h-4 w-4 shrink-0" />
                Logout
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
