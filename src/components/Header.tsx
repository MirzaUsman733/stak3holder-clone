import { Link } from "react-router-dom";
import {
  HelpCircle,
  Menu,
  Moon,
  Search,
  Sun,
  Trophy,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SportToggle } from "./SportToggle";
import { AuthenticatedHeaderActions } from "./AuthenticatedHeaderActions";
import { useTheme } from "../context/ThemeContext";
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
  const { theme, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuCloseTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (!menuRef.current?.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function openMenu() {
    if (menuCloseTimeout.current) {
      clearTimeout(menuCloseTimeout.current);
      menuCloseTimeout.current = null;
    }
    setMenuOpen(true);
  }

  function scheduleCloseMenu() {
    menuCloseTimeout.current = setTimeout(() => setMenuOpen(false), 150);
  }

  return (
    <nav className="sticky top-0 z-40 border-b border-white/10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/75 lg:static lg:bg-transparent lg:backdrop-blur-none">
      <div className="site-container">
        <div className="flex h-14 items-center justify-between lg:h-16">
          <div className="flex min-w-0 flex-1 items-center gap-4 lg:gap-6">
            <Link to="/" className="flex shrink-0 items-center">
              <img
                src={
                  theme === "light"
                    ? "/lovable-uploads/logo_black.png"
                    : "/lovable-uploads/logo_white.png"
                }
                alt="Stakeholder Logo"
                className="h-11 w-auto object-contain lg:h-[2.6rem]"
              />
            </Link>

            <div className="hidden lg:flex">
              <SportToggle />
            </div>

            {showSearch && (
              <div className="relative hidden lg:block">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(event) => onSearchChange?.(event.target.value)}
                  placeholder="Search teams and users..."
                  className={cn(
                    "bg-secondary py-2 pl-10 pr-4 text-sm outline-none transition-shadow focus:ring-2 focus:ring-primary",
                    authenticated
                      ? "w-[28rem] rounded-full"
                      : "w-96 rounded-lg",
                  )}
                />
              </div>
            )}

            {!authenticated && (
              <Link
                to="/faq"
                className="hidden items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground lg:flex"
              >
                <HelpCircle className="h-4 w-4" />
                How it Works
              </Link>
            )}
          </div>

          <div className="ml-3 flex items-center gap-2">
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
                className="rounded-[7px] bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Log In | Sign Up
              </Link>
            )}

            {!authenticated && (
            <div
              ref={menuRef}
              className="relative hidden lg:block"
              onMouseEnter={openMenu}
              onMouseLeave={scheduleCloseMenu}
            >
              <button
                type="button"
                aria-label="Open menu"
                onClick={() => setMenuOpen((value) => !value)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <Menu className="h-7 w-7" />
              </button>

              <AnimatePresence>
                {menuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    className="absolute right-0 top-[calc(100%+8px)] z-50 w-52 rounded-lg border border-border bg-background p-2 shadow-xl"
                    onMouseEnter={openMenu}
                    onMouseLeave={scheduleCloseMenu}
                  >
                    <Link
                      to="/leaderboard"
                      onClick={() => setMenuOpen(false)}
                      className="flex h-9 items-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
                    >
                      <Trophy className="mr-2 h-4 w-4" />
                      Leaderboard
                    </Link>
                    <button
                      type="button"
                      onClick={() => {
                        toggleTheme();
                        setMenuOpen(false);
                      }}
                      className="flex h-9 w-full items-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
                    >
                      {theme === "dark" ? (
                        <Sun className="mr-2 h-4 w-4" />
                      ) : (
                        <Moon className="mr-2 h-4 w-4" />
                      )}
                      {theme === "dark" ? "Light mode" : "Dark mode"}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            )}

            <button
              type="button"
              aria-label="Toggle menu"
              onClick={() => setMobileOpen((value) => !value)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card lg:hidden"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-white/10 lg:hidden"
          >
            <div className="space-y-4 px-4 py-4">
              <SportToggle />
              {showSearch && (
                <div className="relative">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="search"
                    value={searchQuery}
                    onChange={(event) => onSearchChange?.(event.target.value)}
                    placeholder="Search teams and users..."
                    className="w-full rounded-lg bg-secondary py-3 pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              )}
              {authenticated ? (
                <>
                  <Link
                    to="/portfolio"
                    onClick={() => setMobileOpen(false)}
                    className="block text-sm font-medium text-muted-foreground"
                  >
                    My Portfolio
                  </Link>
                  <Link
                    to="/leaderboard"
                    onClick={() => setMobileOpen(false)}
                    className="block text-sm font-medium text-muted-foreground"
                  >
                    Leaderboard
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      toggleTheme();
                    }}
                    className="block text-sm font-medium text-muted-foreground"
                  >
                    {theme === "dark" ? "Light mode" : "Dark mode"}
                  </button>
                </>
              ) : (
                <>
              <Link
                to="/faq"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2 text-sm text-muted-foreground"
              >
                <HelpCircle className="h-4 w-4" />
                How it Works
              </Link>
              <Link
                to="/leaderboard"
                onClick={() => setMobileOpen(false)}
                className="block text-sm font-medium text-muted-foreground"
              >
                Leaderboard
              </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
