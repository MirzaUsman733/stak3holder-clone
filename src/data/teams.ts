import type { Sport, Team } from "../types";

type TeamSeed = Omit<
  Team,
  "rank" | "price" | "change24h" | "change7d" | "change3m" | "apy" | "slug" | "abbreviation"
> & { abbreviation?: string };

function slugify(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function seedTeam(
  base: TeamSeed,
  index: number,
): Team {
  const slug = slugify(base.name);
  return {
    ...base,
    slug,
    abbreviation: base.abbreviation ?? base.name.slice(0, 4).toUpperCase(),
    rank: index + 1,
    price: 0,
    change24h: null,
    change7d: null,
    change3m: null,
    apy: null,
  };
}

const CBB_TEAMS: TeamSeed[] = [
  { id: "alabama", name: "Alabama", conference: "SEC", apRank: null, logoUrl: "https://a.espncdn.com/i/teamlogos/ncaa/500/333.png", primaryColor: "#9E1B32" },
  { id: "arizona", name: "Arizona", conference: "Big 12", apRank: 14, logoUrl: "https://a.espncdn.com/i/teamlogos/ncaa/500/12.png", primaryColor: "#CC0033" },
  { id: "arizona-state", name: "Arizona State", conference: "Big 12", apRank: null, logoUrl: "https://a.espncdn.com/i/teamlogos/ncaa/500/9.png", primaryColor: "#8C1D40" },
  { id: "arkansas", name: "Arkansas", conference: "SEC", apRank: 16, logoUrl: "https://a.espncdn.com/i/teamlogos/ncaa/500/8.png", primaryColor: "#9D2235" },
  { id: "auburn", name: "Auburn", conference: "SEC", apRank: 1, logoUrl: "https://a.espncdn.com/i/teamlogos/ncaa/500/2.png", primaryColor: "#0C2340" },
  { id: "baylor", name: "Baylor", conference: "Big 12", apRank: null, logoUrl: "https://a.espncdn.com/i/teamlogos/ncaa/500/239.png", primaryColor: "#154734" },
  { id: "boise-state", name: "Boise State", conference: "MWC", apRank: null, logoUrl: "https://a.espncdn.com/i/teamlogos/ncaa/500/68.png", primaryColor: "#0033A0" },
  { id: "boston-college", name: "Boston College", conference: "ACC", apRank: null, logoUrl: "https://a.espncdn.com/i/teamlogos/ncaa/500/103.png", primaryColor: "#98002E" },
  { id: "bradley", name: "Bradley", conference: "MVC", apRank: null, logoUrl: "https://a.espncdn.com/i/teamlogos/ncaa/500/71.png", primaryColor: "#A6192E" },
  { id: "butler", name: "Butler", conference: "Big East", apRank: null, logoUrl: "https://a.espncdn.com/i/teamlogos/ncaa/500/2086.png", primaryColor: "#13294B" },
  { id: "byu", name: "BYU", conference: "Big 12", apRank: 8, logoUrl: "https://a.espncdn.com/i/teamlogos/ncaa/500/252.png", primaryColor: "#002E5D", abbreviation: "BYU" },
  { id: "california", name: "California", conference: "ACC", apRank: null, logoUrl: "https://a.espncdn.com/i/teamlogos/ncaa/500/25.png", primaryColor: "#003262" },
  { id: "charlotte", name: "Charlotte", conference: "AAC", apRank: null, logoUrl: "https://a.espncdn.com/i/teamlogos/ncaa/500/2429.png", primaryColor: "#00703C" },
  { id: "cincinnati", name: "Cincinnati", conference: "Big 12", apRank: null, logoUrl: "https://a.espncdn.com/i/teamlogos/ncaa/500/2132.png", primaryColor: "#E00122" },
  { id: "clemson", name: "Clemson", conference: "ACC", apRank: null, logoUrl: "https://a.espncdn.com/i/teamlogos/ncaa/500/228.png", primaryColor: "#F56600" },
  { id: "colorado", name: "Colorado", conference: "Big 12", apRank: null, logoUrl: "https://a.espncdn.com/i/teamlogos/ncaa/500/38.png", primaryColor: "#CFB87C" },
  { id: "colorado-state", name: "Colorado State", conference: "MWC", apRank: null, logoUrl: "https://a.espncdn.com/i/teamlogos/ncaa/500/36.png", primaryColor: "#1E4D2B" },
  { id: "cornell", name: "Cornell", conference: "Ivy", apRank: null, logoUrl: "https://a.espncdn.com/i/teamlogos/ncaa/500/172.png", primaryColor: "#B31B1B" },
  { id: "creighton", name: "Creighton", conference: "Big East", apRank: 12, logoUrl: "https://a.espncdn.com/i/teamlogos/ncaa/500/156.png", primaryColor: "#005CA9" },
  { id: "dayton", name: "Dayton", conference: "A-10", apRank: null, logoUrl: "https://a.espncdn.com/i/teamlogos/ncaa/500/2168.png", primaryColor: "#CE1141" },
  { id: "depaul", name: "DePaul", conference: "Big East", apRank: null, logoUrl: "https://a.espncdn.com/i/teamlogos/ncaa/500/305.png", primaryColor: "#005EB8" },
  { id: "drake", name: "Drake", conference: "MVC", apRank: null, logoUrl: "https://a.espncdn.com/i/teamlogos/ncaa/500/2181.png", primaryColor: "#004477" },
  { id: "duke", name: "Duke", conference: "ACC", apRank: 2, logoUrl: "https://a.espncdn.com/i/teamlogos/ncaa/500/150.png", primaryColor: "#003087" },
  { id: "duquesne", name: "Duquesne", conference: "A-10", apRank: null, logoUrl: "https://a.espncdn.com/i/teamlogos/ncaa/500/2184.png", primaryColor: "#041E42" },
  { id: "florida", name: "Florida", conference: "SEC", apRank: 3, logoUrl: "https://a.espncdn.com/i/teamlogos/ncaa/500/57.png", primaryColor: "#0021A5" },
  { id: "florida-atlantic", name: "Florida Atlantic", conference: "AAC", apRank: null, logoUrl: "https://a.espncdn.com/i/teamlogos/ncaa/500/2226.png", primaryColor: "#003366", abbreviation: "FAU" },
  { id: "florida-state", name: "Florida State", conference: "ACC", apRank: null, logoUrl: "https://a.espncdn.com/i/teamlogos/ncaa/500/52.png", primaryColor: "#782F40" },
  { id: "george-mason", name: "George Mason", conference: "A-10", apRank: null, logoUrl: "https://a.espncdn.com/i/teamlogos/ncaa/500/2244.png", primaryColor: "#006633" },
  { id: "georgetown", name: "Georgetown", conference: "Big East", apRank: null, logoUrl: "https://a.espncdn.com/i/teamlogos/ncaa/500/46.png", primaryColor: "#041E42" },
  { id: "georgia", name: "Georgia", conference: "SEC", apRank: null, logoUrl: "https://a.espncdn.com/i/teamlogos/ncaa/500/61.png", primaryColor: "#BA0C2F" },
  { id: "georgia-state", name: "Georgia State", conference: "Sun Belt", apRank: null, logoUrl: "https://a.espncdn.com/i/teamlogos/ncaa/500/2247.png", primaryColor: "#0039A6" },
  { id: "georgia-tech", name: "Georgia Tech", conference: "ACC", apRank: null, logoUrl: "https://a.espncdn.com/i/teamlogos/ncaa/500/59.png", primaryColor: "#B3A369" },
  { id: "gonzaga", name: "Gonzaga", conference: "WCC", apRank: 9, logoUrl: "https://a.espncdn.com/i/teamlogos/ncaa/500/2250.png", primaryColor: "#002967" },
  { id: "harvard", name: "Harvard", conference: "Ivy", apRank: null, logoUrl: "https://a.espncdn.com/i/teamlogos/ncaa/500/108.png", primaryColor: "#A41034" },
  { id: "houston", name: "Houston", conference: "Big 12", apRank: 4, logoUrl: "https://a.espncdn.com/i/teamlogos/ncaa/500/248.png", primaryColor: "#C8102E" },
  { id: "illinois", name: "Illinois", conference: "Big Ten", apRank: 10, logoUrl: "https://a.espncdn.com/i/teamlogos/ncaa/500/356.png", primaryColor: "#E84A27" },
  { id: "indiana", name: "Indiana", conference: "Big Ten", apRank: null, logoUrl: "https://a.espncdn.com/i/teamlogos/ncaa/500/84.png", primaryColor: "#990000" },
  { id: "indiana-state", name: "Indiana State", conference: "MVC", apRank: null, logoUrl: "https://a.espncdn.com/i/teamlogos/ncaa/500/282.png", primaryColor: "#00669A" },
  { id: "iowa", name: "Iowa", conference: "Big Ten", apRank: null, logoUrl: "https://a.espncdn.com/i/teamlogos/ncaa/500/2294.png", primaryColor: "#FFCD00" },
  { id: "iowa-state", name: "Iowa State", conference: "Big 12", apRank: 5, logoUrl: "https://a.espncdn.com/i/teamlogos/ncaa/500/66.png", primaryColor: "#C8102E" },
  { id: "james-madison", name: "James Madison", conference: "Sun Belt", apRank: null, logoUrl: "https://a.espncdn.com/i/teamlogos/ncaa/500/256.png", primaryColor: "#450084" },
  { id: "kansas", name: "Kansas", conference: "Big 12", apRank: 13, logoUrl: "https://a.espncdn.com/i/teamlogos/ncaa/500/2305.png", primaryColor: "#0051BA" },
  { id: "kansas-state", name: "Kansas State", conference: "Big 12", apRank: null, logoUrl: "https://a.espncdn.com/i/teamlogos/ncaa/500/2306.png", primaryColor: "#512888" },
  { id: "kentucky", name: "Kentucky", conference: "SEC", apRank: 11, logoUrl: "https://a.espncdn.com/i/teamlogos/ncaa/500/96.png", primaryColor: "#0033A0" },
  { id: "louisville", name: "Louisville", conference: "ACC", apRank: null, logoUrl: "https://a.espncdn.com/i/teamlogos/ncaa/500/97.png", primaryColor: "#AD0000" },
  { id: "loyola-marymount", name: "Loyola Marymount", conference: "WCC", apRank: null, logoUrl: "https://a.espncdn.com/i/teamlogos/ncaa/500/2351.png", primaryColor: "#862633", abbreviation: "LMU" },
  { id: "lsu", name: "LSU", conference: "SEC", apRank: null, logoUrl: "https://a.espncdn.com/i/teamlogos/ncaa/500/99.png", primaryColor: "#461D7C" },
  { id: "marquette", name: "Marquette", conference: "Big East", apRank: 7, logoUrl: "https://a.espncdn.com/i/teamlogos/ncaa/500/269.png", primaryColor: "#003366" },
  { id: "maryland", name: "Maryland", conference: "Big Ten", apRank: null, logoUrl: "https://a.espncdn.com/i/teamlogos/ncaa/500/120.png", primaryColor: "#E03A3E" },
  { id: "memphis", name: "Memphis", conference: "AAC", apRank: null, logoUrl: "https://a.espncdn.com/i/teamlogos/ncaa/500/235.png", primaryColor: "#003087" },
  { id: "miami", name: "Miami", conference: "ACC", apRank: null, logoUrl: "https://a.espncdn.com/i/teamlogos/ncaa/500/2390.png", primaryColor: "#F47321" },
  { id: "michigan", name: "Michigan", conference: "Big Ten", apRank: 6, logoUrl: "https://a.espncdn.com/i/teamlogos/ncaa/500/130.png", primaryColor: "#00274C" },
  { id: "michigan-state", name: "Michigan State", conference: "Big Ten", apRank: null, logoUrl: "https://a.espncdn.com/i/teamlogos/ncaa/500/127.png", primaryColor: "#18453B" },
  { id: "minnesota", name: "Minnesota", conference: "Big Ten", apRank: null, logoUrl: "https://a.espncdn.com/i/teamlogos/ncaa/500/135.png", primaryColor: "#7A0019" },
  { id: "mississippi-state", name: "Mississippi State", conference: "SEC", apRank: null, logoUrl: "https://a.espncdn.com/i/teamlogos/ncaa/500/344.png", primaryColor: "#660000" },
  { id: "missouri", name: "Missouri", conference: "SEC", apRank: null, logoUrl: "https://a.espncdn.com/i/teamlogos/ncaa/500/142.png", primaryColor: "#F1B82D" },
  { id: "nc-state", name: "NC State", conference: "ACC", apRank: null, logoUrl: "https://a.espncdn.com/i/teamlogos/ncaa/500/152.png", primaryColor: "#CC0000" },
  { id: "nebraska", name: "Nebraska", conference: "Big Ten", apRank: null, logoUrl: "https://a.espncdn.com/i/teamlogos/ncaa/500/158.png", primaryColor: "#E41C38" },
  { id: "nevada", name: "Nevada", conference: "MWC", apRank: null, logoUrl: "https://a.espncdn.com/i/teamlogos/ncaa/500/2440.png", primaryColor: "#003366" },
  { id: "new-mexico", name: "New Mexico", conference: "MWC", apRank: null, logoUrl: "https://a.espncdn.com/i/teamlogos/ncaa/500/167.png", primaryColor: "#BA0C2F" },
  { id: "north-carolina", name: "North Carolina", conference: "ACC", apRank: 15, logoUrl: "https://a.espncdn.com/i/teamlogos/ncaa/500/153.png", primaryColor: "#7BAFD4" },
  { id: "north-texas", name: "North Texas", conference: "AAC", apRank: null, logoUrl: "https://a.espncdn.com/i/teamlogos/ncaa/500/249.png", primaryColor: "#00853D" },
  { id: "northern-iowa", name: "Northern Iowa", conference: "MVC", apRank: null, logoUrl: "https://a.espncdn.com/i/teamlogos/ncaa/500/2460.png", primaryColor: "#4B116F" },
  { id: "northwestern", name: "Northwestern", conference: "Big Ten", apRank: null, logoUrl: "https://a.espncdn.com/i/teamlogos/ncaa/500/77.png", primaryColor: "#4E2A84" },
  { id: "notre-dame", name: "Notre Dame", conference: "ACC", apRank: null, logoUrl: "https://a.espncdn.com/i/teamlogos/ncaa/500/87.png", primaryColor: "#0C2340" },
  { id: "ohio-state", name: "Ohio State", conference: "Big Ten", apRank: null, logoUrl: "https://a.espncdn.com/i/teamlogos/ncaa/500/194.png", primaryColor: "#BB0000" },
  { id: "oklahoma", name: "Oklahoma", conference: "SEC", apRank: null, logoUrl: "https://a.espncdn.com/i/teamlogos/ncaa/500/201.png", primaryColor: "#841617" },
  { id: "oklahoma-state", name: "Oklahoma State", conference: "Big 12", apRank: null, logoUrl: "https://a.espncdn.com/i/teamlogos/ncaa/500/197.png", primaryColor: "#FF7300" },
  { id: "ole-miss", name: "Ole Miss", conference: "SEC", apRank: null, logoUrl: "https://a.espncdn.com/i/teamlogos/ncaa/500/145.png", primaryColor: "#CE1126" },
  { id: "oregon", name: "Oregon", conference: "Big Ten", apRank: null, logoUrl: "https://a.espncdn.com/i/teamlogos/ncaa/500/2483.png", primaryColor: "#154733" },
  { id: "penn-state", name: "Penn State", conference: "Big Ten", apRank: null, logoUrl: "https://a.espncdn.com/i/teamlogos/ncaa/500/213.png", primaryColor: "#041E42" },
  { id: "pittsburgh", name: "Pittsburgh", conference: "ACC", apRank: null, logoUrl: "https://a.espncdn.com/i/teamlogos/ncaa/500/221.png", primaryColor: "#003594" },
  { id: "princeton", name: "Princeton", conference: "Ivy", apRank: null, logoUrl: "https://a.espncdn.com/i/teamlogos/ncaa/500/163.png", primaryColor: "#E87722" },
  { id: "providence", name: "Providence", conference: "Big East", apRank: null, logoUrl: "https://a.espncdn.com/i/teamlogos/ncaa/500/2507.png", primaryColor: "#000000" },
  { id: "purdue", name: "Purdue", conference: "Big Ten", apRank: null, logoUrl: "https://a.espncdn.com/i/teamlogos/ncaa/500/2509.png", primaryColor: "#CEB888" },
  { id: "rhode-island", name: "Rhode Island", conference: "A-10", apRank: null, logoUrl: "https://a.espncdn.com/i/teamlogos/ncaa/500/227.png", primaryColor: "#002147" },
  { id: "richmond", name: "Richmond", conference: "A-10", apRank: null, logoUrl: "https://a.espncdn.com/i/teamlogos/ncaa/500/257.png", primaryColor: "#990000" },
  { id: "rutgers", name: "Rutgers", conference: "Big Ten", apRank: null, logoUrl: "https://a.espncdn.com/i/teamlogos/ncaa/500/164.png", primaryColor: "#CC0033" },
  { id: "saint-louis", name: "Saint Louis", conference: "A-10", apRank: null, logoUrl: "https://a.espncdn.com/i/teamlogos/ncaa/500/139.png", primaryColor: "#003DA5" },
  { id: "saint-marys", name: "Saint Mary's", conference: "WCC", apRank: null, logoUrl: "https://a.espncdn.com/i/teamlogos/ncaa/500/2608.png", primaryColor: "#D80024" },
  { id: "san-diego-state", name: "San Diego State", conference: "MWC", apRank: null, logoUrl: "https://a.espncdn.com/i/teamlogos/ncaa/500/21.png", primaryColor: "#A6192E" },
  { id: "san-francisco", name: "San Francisco", conference: "WCC", apRank: null, logoUrl: "https://a.espncdn.com/i/teamlogos/ncaa/500/2539.png", primaryColor: "#00543C" },
  { id: "santa-clara", name: "Santa Clara", conference: "WCC", apRank: null, logoUrl: "https://a.espncdn.com/i/teamlogos/ncaa/500/2541.png", primaryColor: "#862633" },
  { id: "seton-hall", name: "Seton Hall", conference: "Big East", apRank: null, logoUrl: "https://a.espncdn.com/i/teamlogos/ncaa/500/2550.png", primaryColor: "#004488" },
  { id: "smu", name: "SMU", conference: "ACC", apRank: null, logoUrl: "https://a.espncdn.com/i/teamlogos/ncaa/500/2567.png", primaryColor: "#CC0035", abbreviation: "SMU" },
  { id: "south-alabama", name: "South Alabama", conference: "Sun Belt", apRank: null, logoUrl: "https://a.espncdn.com/i/teamlogos/ncaa/500/6.png", primaryColor: "#00205B" },
  { id: "south-carolina", name: "South Carolina", conference: "SEC", apRank: null, logoUrl: "https://a.espncdn.com/i/teamlogos/ncaa/500/2579.png", primaryColor: "#73000A" },
  { id: "st-bonaventure", name: "St. Bonaventure", conference: "A-10", apRank: null, logoUrl: "https://a.espncdn.com/i/teamlogos/ncaa/500/179.png", primaryColor: "#54261A" },
  { id: "st-johns", name: "St. John's", conference: "Big East", apRank: 17, logoUrl: "https://a.espncdn.com/i/teamlogos/ncaa/500/2599.png", primaryColor: "#BA0C2F" },
  { id: "stanford", name: "Stanford", conference: "ACC", apRank: null, logoUrl: "https://a.espncdn.com/i/teamlogos/ncaa/500/24.png", primaryColor: "#8C1515" },
  { id: "syracuse", name: "Syracuse", conference: "ACC", apRank: null, logoUrl: "https://a.espncdn.com/i/teamlogos/ncaa/500/183.png", primaryColor: "#F76900" },
  { id: "tcu", name: "TCU", conference: "Big 12", apRank: null, logoUrl: "https://a.espncdn.com/i/teamlogos/ncaa/500/2628.png", primaryColor: "#4D1979", abbreviation: "TCU" },
  { id: "temple", name: "Temple", conference: "AAC", apRank: null, logoUrl: "https://a.espncdn.com/i/teamlogos/ncaa/500/218.png", primaryColor: "#A41E35" },
  { id: "tennessee", name: "Tennessee", conference: "SEC", apRank: null, logoUrl: "https://a.espncdn.com/i/teamlogos/ncaa/500/2633.png", primaryColor: "#FF8200" },
  { id: "texas", name: "Texas", conference: "SEC", apRank: null, logoUrl: "https://a.espncdn.com/i/teamlogos/ncaa/500/251.png", primaryColor: "#BF5700" },
  { id: "texas-am", name: "Texas A&M", conference: "SEC", apRank: null, logoUrl: "https://a.espncdn.com/i/teamlogos/ncaa/500/245.png", primaryColor: "#500000" },
  { id: "texas-tech", name: "Texas Tech", conference: "Big 12", apRank: null, logoUrl: "https://a.espncdn.com/i/teamlogos/ncaa/500/2641.png", primaryColor: "#CC0000" },
  { id: "troy", name: "Troy", conference: "Sun Belt", apRank: null, logoUrl: "https://a.espncdn.com/i/teamlogos/ncaa/500/2653.png", primaryColor: "#862633" },
  { id: "tulane", name: "Tulane", conference: "AAC", apRank: null, logoUrl: "https://a.espncdn.com/i/teamlogos/ncaa/500/2655.png", primaryColor: "#006747" },
  { id: "uab", name: "UAB", conference: "AAC", apRank: null, logoUrl: "https://a.espncdn.com/i/teamlogos/ncaa/500/5.png", primaryColor: "#006341", abbreviation: "UAB" },
  { id: "ucf", name: "UCF", conference: "Big 12", apRank: null, logoUrl: "https://a.espncdn.com/i/teamlogos/ncaa/500/2116.png", primaryColor: "#BA9B37", abbreviation: "UCF" },
  { id: "ucla", name: "UCLA", conference: "Big Ten", apRank: null, logoUrl: "https://a.espncdn.com/i/teamlogos/ncaa/500/26.png", primaryColor: "#2774AE", abbreviation: "UCLA" },
  { id: "uconn", name: "UConn", conference: "Big East", apRank: 18, logoUrl: "https://a.espncdn.com/i/teamlogos/ncaa/500/41.png", primaryColor: "#000E2F" },
  { id: "usc", name: "USC", conference: "Big Ten", apRank: null, logoUrl: "https://a.espncdn.com/i/teamlogos/ncaa/500/30.png", primaryColor: "#990000", abbreviation: "USC" },
  { id: "utah", name: "Utah", conference: "Big 12", apRank: null, logoUrl: "https://a.espncdn.com/i/teamlogos/ncaa/500/254.png", primaryColor: "#CC0000" },
  { id: "utah-state", name: "Utah State", conference: "MWC", apRank: null, logoUrl: "https://a.espncdn.com/i/teamlogos/ncaa/500/328.png", primaryColor: "#00263A" },
  { id: "vanderbilt", name: "Vanderbilt", conference: "SEC", apRank: null, logoUrl: "https://a.espncdn.com/i/teamlogos/ncaa/500/238.png", primaryColor: "#866D4B" },
  { id: "vcu", name: "VCU", conference: "A-10", apRank: null, logoUrl: "https://a.espncdn.com/i/teamlogos/ncaa/500/2670.png", primaryColor: "#FFB300", abbreviation: "VCU" },
  { id: "villanova", name: "Villanova", conference: "Big East", apRank: null, logoUrl: "https://a.espncdn.com/i/teamlogos/ncaa/500/222.png", primaryColor: "#00205B" },
  { id: "virginia", name: "Virginia", conference: "ACC", apRank: null, logoUrl: "https://a.espncdn.com/i/teamlogos/ncaa/500/258.png", primaryColor: "#232D4B" },
  { id: "virginia-tech", name: "Virginia Tech", conference: "ACC", apRank: null, logoUrl: "https://a.espncdn.com/i/teamlogos/ncaa/500/259.png", primaryColor: "#630031" },
  { id: "wake-forest", name: "Wake Forest", conference: "ACC", apRank: null, logoUrl: "https://a.espncdn.com/i/teamlogos/ncaa/500/154.png", primaryColor: "#9E7E38" },
  { id: "washington", name: "Washington", conference: "Big Ten", apRank: null, logoUrl: "https://a.espncdn.com/i/teamlogos/ncaa/500/264.png", primaryColor: "#4B2E83" },
  { id: "west-virginia", name: "West Virginia", conference: "Big 12", apRank: null, logoUrl: "https://a.espncdn.com/i/teamlogos/ncaa/500/277.png", primaryColor: "#002855" },
  { id: "wisconsin", name: "Wisconsin", conference: "Big Ten", apRank: null, logoUrl: "https://a.espncdn.com/i/teamlogos/ncaa/500/275.png", primaryColor: "#C5050C" },
  { id: "wyoming", name: "Wyoming", conference: "MWC", apRank: null, logoUrl: "https://a.espncdn.com/i/teamlogos/ncaa/500/2751.png", primaryColor: "#492F24" },
  { id: "xavier", name: "Xavier", conference: "Big East", apRank: null, logoUrl: "https://a.espncdn.com/i/teamlogos/ncaa/500/2752.png", primaryColor: "#00205B" },
  { id: "yale", name: "Yale", conference: "Ivy", apRank: null, logoUrl: "https://a.espncdn.com/i/teamlogos/ncaa/500/43.png", primaryColor: "#00356B" },
  { id: "miami-oh", name: "Miami (OH)", conference: "Mid-American", apRank: null, logoUrl: "https://a.espncdn.com/i/teamlogos/ncaa/500/193.png", primaryColor: "#C8102E" },
  { id: "south-florida", name: "South Florida", conference: "American Athletic", apRank: null, logoUrl: "https://a.espncdn.com/i/teamlogos/ncaa/500/58.png", primaryColor: "#006747", abbreviation: "USF" },
];

export function getTeams(_sport: Sport): Team[] {
  return CBB_TEAMS.map(seedTeam);
}

export function getApPollTeams(teams: Team[]) {
  return [...teams]
    .filter((team) => team.apRank != null)
    .sort((a, b) => (a.apRank ?? 0) - (b.apRank ?? 0));
}

export function getGainerTeams(teams: Team[]) {
  return teams.filter((team) => (team.change24h ?? 0) > 0);
}

export function getSportLabel(sport: Sport) {
  return sport === "cbb" ? "College Basketball" : "College Football";
}

export function hasActivePrices(teams: Team[]) {
  return teams.some((team) => team.price > 0);
}
