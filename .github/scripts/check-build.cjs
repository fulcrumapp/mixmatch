"use strict";

const assert = require("node:assert/strict");
const { execFileSync } = require("node:child_process");
const manifest = require("../../package.json");
const [pack] = JSON.parse(execFileSync("npm", ["pack", "--dry-run", "--ignore-scripts", "--json"], {
  encoding: "utf8"
}));
const files = new Set(pack.files.map((file) => file.path));

assert.equal(manifest.name, "@fulcrumapp/mixmatch");
assert.equal(pack.name, manifest.name);
assert.equal(pack.version, manifest.version);
for (const file of ["package.json", "dist/index.js", "dist/index.d.ts", "dist/index.js.map"]) {
  assert.ok(files.has(file), `Package is missing ${file}`);
}
assert.ok(![...files].some((file) => file.startsWith(".github/")),
  "Package must not contain CI and release automation");
console.log("Package contains the compiled runtime and declarations.");
