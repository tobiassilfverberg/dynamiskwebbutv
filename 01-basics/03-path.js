/**
 * Path
 */

console.log("Absolute path to directory of this file:", __dirname);
console.log("Absolute path to this file:", __filename);

const path = require("path");

const file_wo_path = path.basename(
  "/Applications/MAMP/htdocs/dynamiskwebbutv/01-basics/03-path.js"
);
console.log("Filename without path:", file_wo_path); // "03-path.js"

const file_ext = path.extname(__filename);
console.log("My extension is:", file_ext); // .js

const parts = path.parse(__filename);
console.log("All my parts:", parts); // root, dir, base, ext, name
