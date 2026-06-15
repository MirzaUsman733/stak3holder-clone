import { cn } from "../lib/utils";
import { DEFAULT_AVATAR_URL } from "../data/defaultAvatars";

interface UserAvatarProps {
  avatarUrl?: string | null;
  username?: string;
  className?: string;
}

export function UserAvatar({
  avatarUrl,
  username = "user",
  className,
}: UserAvatarProps) {
  const src = avatarUrl || DEFAULT_AVATAR_URL;

  return (
    <div
      className={cn(
        "h-9 w-9 shrink-0 overflow-hidden rounded-full border border-white/25 bg-black",
        className,
      )}
    >
      <img
        src={src}
        alt={username}
        className="h-full w-full object-cover"
      />
    </div>
  );
}
