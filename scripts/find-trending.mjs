import fs from "fs";

const js = fs.readFileSync("site.js", "utf8");
const marker = 'G4,{className:"h-5 w-5"}),"Trending"';
const i = js.indexOf(marker);
console.log("idx", i);
if (i >= 0) {
  console.log(js.substring(i - 800, i + 2500));
}
