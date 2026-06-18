export interface HeadlineTeamTag {
  abbreviation: string;
  primaryColor: string;
  logoUrl: string;
  change: number | null;
  rank?: number | null;
}

export interface Headline {
  id: string;
  title: string;
  source: string;
  sourceLogoUrl?: string;
  publishedAgo: string;
  teamTags: HeadlineTeamTag[];
  featured?: boolean;
  imageUrl?: string;
  hideMeta?: boolean;
}

export interface TopTrade {
  id: string;
  username: string;
  avatarUrl?: string;
  avatarColor: string;
  teamName: string;
  teamLogoUrl: string;
  pnl: number;
}
