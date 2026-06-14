import fs from "fs";

const js = fs.readFileSync("site.js", "utf8");
const markers = ["function SKr", "function Ju(", "container mx-auto", "AGr=()"];
for (const m of markers) {
  const i = js.indexOf(m);
  if (i >= 0) console.log("\n---", m, "---\n", js.substring(i, i + 1200).replace(/\n/g, " "));
}
