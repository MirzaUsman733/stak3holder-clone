import type { Sport } from "../types";

export interface StreakTrade {
  username: string;
  avatar: string;
  team: string;
  teamLogo: string;
  betType: string;
  record: string;
  side: "long" | "short";
  odds: string;
  profit?: number;
  profitPct?: number;
}

const UNIT = 50;
const WIN_PAYOUT = UNIT * (100 / 110);

export function calcStreakPnL(record: string) {
  const [w, l] = record.split("-").map((n) => parseInt(n, 10) || 0);
  const games = w + l;
  const profit = w * WIN_PAYOUT - l * UNIT;
  const wagered = games * UNIT;
  const profitPct = wagered > 0 ? (profit / wagered) * 100 : 0;
  return { profit, profitPct };
}

function withPnL(trade: StreakTrade): StreakTrade & { profit: number; profitPct: number } {
  const calc = calcStreakPnL(trade.record);
  return {
    ...trade,
    profit: trade.profit ?? calc.profit,
    profitPct: trade.profitPct ?? calc.profitPct,
  };
}

const tradesBySport: Record<Sport, StreakTrade[]> = {
  mlb: [
    { username: "wrigleywiz", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=wrigleywiz&backgroundColor=2354e6", team: "Cubs", teamLogo: "https://a.espncdn.com/i/teamlogos/mlb/500/chc.png", betType: "Spread", record: "5-2", side: "long", odds: "+117" },
    { username: "phillyfaithful", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=phillyfaithful&backgroundColor=2354e6", team: "Phillies", teamLogo: "https://a.espncdn.com/i/teamlogos/mlb/500/phi.png", betType: "ML", record: "4-1", side: "short", odds: "-125", profit: 466.78 },
    { username: "buccobanger", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=buccobanger&backgroundColor=f59e0b", team: "Pirates", teamLogo: "https://a.espncdn.com/i/teamlogos/mlb/500/pit.png", betType: "Spread", record: "3-1", side: "long", odds: "+149" },
    { username: "dbackdagger", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=dbackdagger&backgroundColor=ef4444", team: "Diamondbacks", teamLogo: "https://a.espncdn.com/i/teamlogos/mlb/500/ari.png", betType: "O/U", record: "4-2", side: "long", odds: "-110" },
    { username: "brewcrew", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=brewcrew&backgroundColor=8b5cf6", team: "Brewers", teamLogo: "https://a.espncdn.com/i/teamlogos/mlb/500/mil.png", betType: "ML", record: "2-1", side: "long", odds: "-167" },
    { username: "marinermoves", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=marinermoves&backgroundColor=2354e6", team: "Mariners", teamLogo: "https://a.espncdn.com/i/teamlogos/mlb/500/sea.png", betType: "O/U", record: "3-2", side: "short", odds: "-118" },
    { username: "redsoxradar", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=redsoxradar&backgroundColor=ef4444", team: "Red Sox", teamLogo: "https://a.espncdn.com/i/teamlogos/mlb/500/bos.png", betType: "ML", record: "2-2", side: "long", odds: "+105", profit: 90.9 },
    { username: "yank_kee", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=yankkee&backgroundColor=10b981", team: "Yankees", teamLogo: "https://a.espncdn.com/i/teamlogos/mlb/500/nyy.png", betType: "Spread", record: "3-3", side: "short", odds: "+112", profit: 68.18 },
    { username: "cardinalcall", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=cardinalcall&backgroundColor=8b5cf6", team: "Cardinals", teamLogo: "https://a.espncdn.com/i/teamlogos/mlb/500/stl.png", betType: "O/U", record: "2-3", side: "long", odds: "-110", profit: 40.91 },
    { username: "metsmagic", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=metsmagic&backgroundColor=f5d491", team: "Mets", teamLogo: "https://a.espncdn.com/i/teamlogos/mlb/500/nym.png", betType: "ML", record: "1-1", side: "long", odds: "+118", profit: 45.45 },
  ],
  nba: [
    { username: "nuggetnation", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=nuggetnation&backgroundColor=f5d491", team: "Nuggets", teamLogo: "https://a.espncdn.com/i/teamlogos/nba/500/den.png", betType: "Spread", record: "5-0", side: "long", odds: "+108" },
    { username: "warriorwave", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=warriorwave&backgroundColor=ef4444", team: "Warriors", teamLogo: "https://a.espncdn.com/i/teamlogos/nba/500/gs.png", betType: "ML", record: "4-1", side: "long", odds: "-142" },
    { username: "heatcheck", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=heatcheck&backgroundColor=2354e6", team: "Heat", teamLogo: "https://a.espncdn.com/i/teamlogos/nba/500/mia.png", betType: "Spread", record: "3-1", side: "short", odds: "+134" },
    { username: "bucksbettor", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=bucksbettor&backgroundColor=10b981", team: "Bucks", teamLogo: "https://a.espncdn.com/i/teamlogos/nba/500/mil.png", betType: "O/U", record: "4-2", side: "long", odds: "-115" },
    { username: "grizzgang", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=grizzgang&backgroundColor=8b5cf6", team: "Grizzlies", teamLogo: "https://a.espncdn.com/i/teamlogos/nba/500/mem.png", betType: "ML", record: "2-1", side: "short", odds: "-178" },
    { username: "kingscourt", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=kingscourt&backgroundColor=f59e0b", team: "Kings", teamLogo: "https://a.espncdn.com/i/teamlogos/nba/500/sac.png", betType: "O/U", record: "3-2", side: "long", odds: "+102" },
    { username: "celticsguy", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=celticsguy&backgroundColor=10b981", team: "Celtics", teamLogo: "https://a.espncdn.com/i/teamlogos/nba/500/bos.png", betType: "ML", record: "2-2", side: "long", odds: "-138", profit: 90.9 },
    { username: "lakerluv", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=lakerluv&backgroundColor=8b5cf6", team: "Lakers", teamLogo: "https://a.espncdn.com/i/teamlogos/nba/500/lal.png", betType: "Spread", record: "2-3", side: "short", odds: "+118", profit: 45.45 },
    { username: "spurspur", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=spurspur&backgroundColor=f5d491", team: "Spurs", teamLogo: "https://a.espncdn.com/i/teamlogos/nba/500/sa.png", betType: "O/U", record: "1-2", side: "long", odds: "-110", profit: 40.91 },
    { username: "blazetrail", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=blazetrail&backgroundColor=ef4444", team: "Trail Blazers", teamLogo: "https://a.espncdn.com/i/teamlogos/nba/500/por.png", betType: "ML", record: "1-1", side: "long", odds: "+122", profit: 45.45 },
  ],
  wnba: [
    { username: "libertyloyal", avatar: "https://api.dicebear.com/7.x/lorelei/svg?seed=libertyloyal&backgroundColor=10b981", team: "Liberty", teamLogo: "https://a.espncdn.com/i/teamlogos/wnba/500/ny.png", betType: "Spread", record: "8-1", side: "long", odds: "+118" },
    { username: "lynxlife", avatar: "https://api.dicebear.com/7.x/lorelei/svg?seed=lynxlife&backgroundColor=2354e6", team: "Lynx", teamLogo: "https://a.espncdn.com/i/teamlogos/wnba/500/min.png", betType: "ML", record: "6-1", side: "long", odds: "-135" },
    { username: "acesallin", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=acesallin&backgroundColor=ef4444", team: "Aces", teamLogo: "https://a.espncdn.com/i/teamlogos/wnba/500/lv.png", betType: "Spread", record: "5-2", side: "long", odds: "+108" },
    { username: "dreamgirl", avatar: "https://api.dicebear.com/7.x/lorelei/svg?seed=dreamgirl&backgroundColor=f59e0b", team: "Dream", teamLogo: "https://a.espncdn.com/i/teamlogos/wnba/500/atl.png", betType: "ML", record: "3-2", side: "short", odds: "+122", profit: 68.18 },
    { username: "sunriser", avatar: "https://api.dicebear.com/7.x/lorelei/svg?seed=sunriser&backgroundColor=8b5cf6", team: "Sun", teamLogo: "https://a.espncdn.com/i/teamlogos/wnba/500/conn.png", betType: "O/U", record: "2-2", side: "long", odds: "-110", profit: 45.45 },
    { username: "mystique", avatar: "https://api.dicebear.com/7.x/lorelei/svg?seed=mystique&backgroundColor=10b981", team: "Mystics", teamLogo: "https://a.espncdn.com/i/teamlogos/wnba/500/wsh.png", betType: "Spread", record: "2-3", side: "short", odds: "+114", profit: 40.91 },
  ],
  nfl: [
    { username: "eaglesedge", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=eaglesedge&backgroundColor=f5d491", team: "Eagles", teamLogo: "https://a.espncdn.com/i/teamlogos/nfl/500/phi.png", betType: "Spread", record: "5-0", side: "long", odds: "+121" },
    { username: "packerpush", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=packerpush&backgroundColor=ef4444", team: "Packers", teamLogo: "https://a.espncdn.com/i/teamlogos/nfl/500/gb.png", betType: "ML", record: "4-1", side: "long", odds: "-155" },
    { username: "niner_nick", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=niner_nick&backgroundColor=10b981", team: "49ers", teamLogo: "https://a.espncdn.com/i/teamlogos/nfl/500/sf.png", betType: "Spread", record: "3-1", side: "short", odds: "+138" },
    { username: "stargazer", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=stargazer&backgroundColor=2354e6", team: "Cowboys", teamLogo: "https://a.espncdn.com/i/teamlogos/nfl/500/dal.png", betType: "O/U", record: "4-2", side: "long", odds: "-108" },
    { username: "dolphincash", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=dolphincash&backgroundColor=8b5cf6", team: "Dolphins", teamLogo: "https://a.espncdn.com/i/teamlogos/nfl/500/mia.png", betType: "ML", record: "2-1", side: "short", odds: "-185" },
    { username: "jagjuice", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=jagjuice&backgroundColor=f59e0b", team: "Jaguars", teamLogo: "https://a.espncdn.com/i/teamlogos/nfl/500/jax.png", betType: "Spread", record: "3-2", side: "long", odds: "+162" },
    { username: "ravensroost", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ravensroost&backgroundColor=8b5cf6", team: "Ravens", teamLogo: "https://a.espncdn.com/i/teamlogos/nfl/500/bal.png", betType: "ML", record: "2-2", side: "long", odds: "-122", profit: 90.9 },
    { username: "chiefkid", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=chiefkid&backgroundColor=ef4444", team: "Chiefs", teamLogo: "https://a.espncdn.com/i/teamlogos/nfl/500/kc.png", betType: "Spread", record: "2-3", side: "short", odds: "+116", profit: 45.45 },
    { username: "bearsback", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=bearsback&backgroundColor=10b981", team: "Bears", teamLogo: "https://a.espncdn.com/i/teamlogos/nfl/500/chi.png", betType: "O/U", record: "1-2", side: "long", odds: "-110", profit: 40.91 },
    { username: "broncobill", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=broncobill&backgroundColor=f5d491", team: "Broncos", teamLogo: "https://a.espncdn.com/i/teamlogos/nfl/500/den.png", betType: "ML", record: "1-1", side: "long", odds: "+108", profit: 45.45 },
  ],
  nhl: [
    { username: "oilersovi", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=oilersovi&backgroundColor=f5d491", team: "Oilers", teamLogo: "https://a.espncdn.com/i/teamlogos/nhl/500/edm.png", betType: "ML", record: "5-0", side: "long", odds: "-148" },
    { username: "leafsfade", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=leafsfade&backgroundColor=ef4444", team: "Maple Leafs", teamLogo: "https://a.espncdn.com/i/teamlogos/nhl/500/tor.png", betType: "Puck Line", record: "4-1", side: "short", odds: "+128" },
    { username: "vegasvic", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=vegasvic&backgroundColor=2354e6", team: "Golden Knights", teamLogo: "https://a.espncdn.com/i/teamlogos/nhl/500/vgk.png", betType: "ML", record: "3-1", side: "long", odds: "-132" },
    { username: "kraken_ken", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=kraken_ken&backgroundColor=10b981", team: "Kraken", teamLogo: "https://a.espncdn.com/i/teamlogos/nhl/500/sea.png", betType: "O/U", record: "4-2", side: "long", odds: "-112" },
    { username: "rangerice", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=rangerice&backgroundColor=8b5cf6", team: "Rangers", teamLogo: "https://a.espncdn.com/i/teamlogos/nhl/500/nyr.png", betType: "Puck Line", record: "2-1", side: "short", odds: "+144" },
    { username: "hurricanehit", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=hurricanehit&backgroundColor=f59e0b", team: "Hurricanes", teamLogo: "https://a.espncdn.com/i/teamlogos/nhl/500/car.png", betType: "ML", record: "3-2", side: "long", odds: "-158" },
    { username: "penguinpunter", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=penguinpunter&backgroundColor=f59e0b", team: "Penguins", teamLogo: "https://a.espncdn.com/i/teamlogos/nhl/500/pit.png", betType: "ML", record: "2-2", side: "long", odds: "+112", profit: 90.9 },
    { username: "flamesfan", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=flamesfan&backgroundColor=ef4444", team: "Flames", teamLogo: "https://a.espncdn.com/i/teamlogos/nhl/500/cgy.png", betType: "Puck Line", record: "2-3", side: "short", odds: "+138", profit: 45.45 },
    { username: "bluejakets", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=bluejakets&backgroundColor=2354e6", team: "Blue Jackets", teamLogo: "https://a.espncdn.com/i/teamlogos/nhl/500/cbj.png", betType: "O/U", record: "1-2", side: "long", odds: "-110", profit: 40.91 },
    { username: "capitalsbet", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=capitalsbet&backgroundColor=8b5cf6", team: "Capitals", teamLogo: "https://a.espncdn.com/i/teamlogos/nhl/500/wsh.png", betType: "ML", record: "1-1", side: "long", odds: "-118", profit: 45.45 },
  ],
  cbb: [
    { username: "hardwoodhawk", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=hardwoodhawk&backgroundColor=f5d491", team: "Houston", teamLogo: "https://a.espncdn.com/i/teamlogos/ncaa/500/248.png", betType: "Spread", record: "9-1", side: "long", odds: "+115" },
    { username: "bracketbreak", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=bracketbreak&backgroundColor=ef4444", team: "Syracuse", teamLogo: "https://a.espncdn.com/i/teamlogos/ncaa/500/183.png", betType: "Spread", record: "7-1", side: "short", odds: "+139" },
    { username: "dukehater", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=dukehater&backgroundColor=2354e6", team: "Duke", teamLogo: "https://a.espncdn.com/i/teamlogos/ncaa/500/150.png", betType: "ML", record: "8-2", side: "long", odds: "-165" },
    { username: "midmajor", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=midmajor&backgroundColor=10b981", team: "Auburn", teamLogo: "https://a.espncdn.com/i/teamlogos/ncaa/500/2.png", betType: "O/U", record: "6-2", side: "long", odds: "-110" },
    { username: "tipoff", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=tipoff&backgroundColor=8b5cf6", team: "UCLA", teamLogo: "https://a.espncdn.com/i/teamlogos/ncaa/500/26.png", betType: "ML", record: "5-1", side: "short", odds: "-192" },
    { username: "zoneoffense", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=zoneoffense&backgroundColor=f59e0b", team: "UConn", teamLogo: "https://a.espncdn.com/i/teamlogos/ncaa/500/41.png", betType: "O/U", record: "5-2", side: "long", odds: "+106" },
    { username: "tar_heelz", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=tarheelz&backgroundColor=2354e6", team: "UNC", teamLogo: "https://a.espncdn.com/i/teamlogos/ncaa/500/153.png", betType: "Spread", record: "3-2", side: "long", odds: "+118", profit: 68.18 },
    { username: "illini_il", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=illiniil&backgroundColor=f59e0b", team: "Illinois", teamLogo: "https://a.espncdn.com/i/teamlogos/ncaa/500/356.png", betType: "ML", record: "2-2", side: "short", odds: "+124", profit: 45.45 },
    { username: "gonzagaguy", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=gonzagaguy&backgroundColor=10b981", team: "Gonzaga", teamLogo: "https://a.espncdn.com/i/teamlogos/ncaa/500/2250.png", betType: "O/U", record: "2-3", side: "long", odds: "-110", profit: 40.91 },
    { username: "wildcatbetz", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=wildcatbetz&backgroundColor=8b5cf6", team: "Kentucky", teamLogo: "https://a.espncdn.com/i/teamlogos/ncaa/500/96.png", betType: "ML", record: "1-1", side: "long", odds: "-145", profit: 45.45 },
  ],
  cfb: [
    { username: "saturdaysharp", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=saturdaysharp&backgroundColor=f5d491", team: "Oregon", teamLogo: "https://a.espncdn.com/i/teamlogos/ncaa/500/2483.png", betType: "Spread", record: "10-1", side: "long", odds: "+124" },
    { username: "fadefsu", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=fadefsu&backgroundColor=ef4444", team: "Florida State", teamLogo: "https://a.espncdn.com/i/teamlogos/ncaa/500/52.png", betType: "Spread", record: "8-1", side: "short", odds: "+147" },
    { username: "sec_sniper", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sec_sniper&backgroundColor=2354e6", team: "Georgia", teamLogo: "https://a.espncdn.com/i/teamlogos/ncaa/500/61.png", betType: "ML", record: "7-1", side: "long", odds: "-172" },
    { username: "bigtenbull", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=bigtenbull&backgroundColor=10b981", team: "Ohio State", teamLogo: "https://a.espncdn.com/i/teamlogos/ncaa/500/194.png", betType: "O/U", record: "8-2", side: "long", odds: "-115" },
    { username: "michfade", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=michfade&backgroundColor=8b5cf6", team: "Michigan", teamLogo: "https://a.espncdn.com/i/teamlogos/ncaa/500/130.png", betType: "Spread", record: "6-1", side: "short", odds: "+131" },
    { username: "hookemhorns", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=hookemhorns&backgroundColor=f59e0b", team: "Texas", teamLogo: "https://a.espncdn.com/i/teamlogos/ncaa/500/251.png", betType: "ML", record: "6-2", side: "long", odds: "-158" },
    { username: "trojantrader", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=trojantrader&backgroundColor=ef4444", team: "USC", teamLogo: "https://a.espncdn.com/i/teamlogos/ncaa/500/30.png", betType: "Spread", record: "3-2", side: "long", odds: "+119", profit: 68.18 },
    { username: "tigerbet", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=tigerbet&backgroundColor=f5d491", team: "LSU", teamLogo: "https://a.espncdn.com/i/teamlogos/ncaa/500/99.png", betType: "ML", record: "2-2", side: "short", odds: "+132", profit: 45.45 },
    { username: "cornhusk", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=cornhusk&backgroundColor=10b981", team: "Nebraska", teamLogo: "https://a.espncdn.com/i/teamlogos/ncaa/500/158.png", betType: "O/U", record: "2-3", side: "long", odds: "-110", profit: 40.91 },
    { username: "dawgpound", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=dawgpound&backgroundColor=8b5cf6", team: "Washington", teamLogo: "https://a.espncdn.com/i/teamlogos/ncaa/500/264.png", betType: "ML", record: "1-1", side: "long", odds: "+114", profit: 45.45 },
  ],
};

const coinsMlbTrades: StreakTrade[] = [
  { username: "buccobanger", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=buccobanger&backgroundColor=f59e0b", team: "Pirates", teamLogo: "https://a.espncdn.com/i/teamlogos/mlb/500/pit.png", betType: "Spread", record: "6-1", side: "long", odds: "+135" },
  { username: "southsider", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=southsider&backgroundColor=ffffff", team: "White Sox", teamLogo: "https://a.espncdn.com/i/teamlogos/mlb/500/chw.png", betType: "ML", record: "5-1", side: "long", odds: "-128" },
  { username: "phillyphan", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=phillyphan&backgroundColor=2354e6", team: "Phillies", teamLogo: "https://a.espncdn.com/i/teamlogos/mlb/500/phi.png", betType: "Spread", record: "5-2", side: "short", odds: "+112" },
  { username: "rockymtnhi", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=rockymtnhi&backgroundColor=8b5cf6", team: "Rockies", teamLogo: "https://a.espncdn.com/i/teamlogos/mlb/500/col.png", betType: "O/U", record: "4-2", side: "long", odds: "-110" },
  { username: "halofan", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=halofan&backgroundColor=10b981", team: "Angels", teamLogo: "https://a.espncdn.com/i/teamlogos/mlb/500/laa.png", betType: "ML", record: "3-1", side: "long", odds: "-145" },
  { username: "twincities", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=twincities&backgroundColor=f5d491", team: "Twins", teamLogo: "https://a.espncdn.com/i/teamlogos/mlb/500/min.png", betType: "Spread", record: "4-2", side: "short", odds: "+118" },
];

export function getWeeklyTopStreaks(
  sport: Sport,
  coinsMode: boolean,
): Array<StreakTrade & { profit: number; profitPct: number }> {
  const baseTrades =
    coinsMode && sport === "mlb"
      ? coinsMlbTrades
      : (tradesBySport[sport] ?? tradesBySport.mlb);

  const withValues = baseTrades.map(withPnL);

  if (coinsMode && sport === "mlb") {
    return withValues;
  }

  return [...withValues].sort((a, b) => b.profit - a.profit);
}
