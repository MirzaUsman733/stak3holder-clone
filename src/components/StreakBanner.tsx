import { Link } from "react-router-dom";

export function StreakBanner() {
  return (
    <Link
      to="/faq"
      className="group relative block w-full overflow-hidden rounded-full bg-gradient-to-r from-success via-[hsl(109_64%_48%)] to-success px-5 py-2 shadow-card-md transition-transform active:scale-[0.99] sm:py-2.5"
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/15 to-transparent" />
      <span className="relative block text-center text-[13px] font-extrabold tracking-tight text-success-foreground drop-shadow-sm sm:text-sm">
        Pick Your Team. Set The Rules. Streak It!
      </span>
    </Link>
  );
}
