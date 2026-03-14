const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const ROOT = process.cwd();

const SOURCE_DIRS = [
  path.resolve(ROOT, "_posts"),
  path.resolve(ROOT, "src/app"),
  path.resolve(ROOT, "src/components"),
  path.resolve(ROOT, "src/lib"),
];

const FONT_INPUT = "src/app/ZCOOLKuaiLe-Regular.woff2";
const FONT_OUTPUT = "src/app/ZCOOLKuaiLe-Subset.woff2";
const UNICODE_FILE = "src/lib/unicodes.txt";
const EXTRA = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

function collectFiles(dir, exts, list = []) {
  if (!fs.existsSync(dir)) return list;

  for (const file of fs.readdirSync(dir)) {
    const p = path.join(dir, file);
    const stat = fs.statSync(p);

    if (stat.isDirectory()) {
      collectFiles(p, exts, list);
    } else if (exts.some(e => file.endsWith(e))) {
      list.push(p);
    }
  }

  return list;
}

function extractChars(files) {
  const set = new Set();

  for (const file of files) {
    const text = fs.readFileSync(file,"utf8");

    for (const ch of text) {
      if (ch.trim()) set.add(ch);
    }
  }

  return [...set];
}

function toUnicode(chars) {
  const codes = new Set();

  for (const ch of chars) {
    const code = ch.codePointAt(0).toString(16).toUpperCase();
    codes.add(`U+${code}`);
  }

  return [...codes];
}

function main(){

  console.log("Scanning project text...");

  const files = SOURCE_DIRS.flatMap(d =>
    collectFiles(d, [".js",".ts",".tsx",".jsx",".md",".mdx",".json"])
  );

  console.log(`Found ${files.length} files`);

  const chars = [...extractChars(files), ...EXTRA];

  console.log(`Unique characters: ${chars.length}`);

  const unicodes = toUnicode(chars);

  fs.writeFileSync(UNICODE_FILE, unicodes.join(","));

  console.log("Unicode list saved:", UNICODE_FILE);

  const cmd = `pyftsubset "${FONT_INPUT}" --output-file="${FONT_OUTPUT}" --flavor=woff2 --unicodes-file="${UNICODE_FILE}"`;

  execSync(cmd,{stdio:"inherit"});

  console.log("Font subset generated:", FONT_OUTPUT);
}

main();