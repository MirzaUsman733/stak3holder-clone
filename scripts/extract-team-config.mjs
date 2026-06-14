import fs from "fs";

const js = fs.readFileSync("site.js", "utf8");
const marker = "R5e={cfb:oz,cbb:cz}";
const markerIdx = js.indexOf(marker);
if (markerIdx < 0) {
  console.error("R5e marker not found");
  process.exit(1);
}

const ozStart = js.indexOf('WUr="cfb",qUr=[');
if (ozStart < 0) {
  console.error("config start not found");
  process.exit(1);
}

const configSource = js.slice(ozStart, markerIdx + marker.length);

// Evaluate in isolated scope
const fn = new Function(`${configSource}; return { cfb: oz, cbb: cz };`);
const config = fn();

const tokenMap = {};
for (const [sport, data] of Object.entries(config)) {
  for (const team of data.teams) {
    const market = team.markets?.cbb ?? team.markets?.cfb;
    if (!market?.tokenAddress) continue;
    tokenMap[market.tokenAddress.toLowerCase()] = {
      id: team.id,
      slug: team.slug,
      name: team.name,
      mascot: team.mascot,
      abbreviation: team.abbreviation,
      conference: team.conference,
      primaryColor: team.primaryColor,
      secondaryColor: team.secondaryColor,
      logoUrl: team.logoUrl,
      sport,
      tokenAddress: market.tokenAddress.toLowerCase(),
    };
  }
}

console.log("CBB teams:", config.cbb.teams.length);
console.log("CFB teams:", config.cfb.teams.length);
console.log("Token map entries:", Object.keys(tokenMap).length);

fs.mkdirSync("src/data", { recursive: true });
fs.writeFileSync(
  "src/data/tokenTeamMap.json",
  JSON.stringify(tokenMap, null, 2),
);

const cbbSlugs = config.cbb.teams.map((t) => ({
  id: t.id,
  slug: t.slug,
  name: t.name,
  abbreviation: t.abbreviation,
  conference: t.conference,
  primaryColor: t.primaryColor,
  logoUrl: t.logoUrl,
  externalId: t.sportsDataRef?.externalId ?? null,
  tokenAddress: t.markets?.cbb?.tokenAddress?.toLowerCase() ?? null,
}));

fs.writeFileSync(
  "src/data/cbbTeamConfig.json",
  JSON.stringify(cbbSlugs, null, 2),
);

const cfbSlugs = config.cfb.teams.map((t) => ({
  id: t.id,
  slug: t.slug,
  name: t.name,
  abbreviation: t.abbreviation,
  conference: t.conference,
  primaryColor: t.primaryColor,
  logoUrl: t.logoUrl,
  externalId: t.sportsDataRef?.externalId ?? null,
  tokenAddress: t.markets?.cfb?.tokenAddress?.toLowerCase() ?? null,
}));

fs.writeFileSync(
  "src/data/cfbTeamConfig.json",
  JSON.stringify(cfbSlugs, null, 2),
);

console.log("Wrote src/data/tokenTeamMap.json, cbbTeamConfig.json, cfbTeamConfig.json");
