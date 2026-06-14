import fs from "fs";

const js = fs.readFileSync("site.js", "utf8");
const i = js.indexOf("function CKr");
console.log(js.substring(i, i + 2000));
