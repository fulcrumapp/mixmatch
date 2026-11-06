"use strict";

const assert = require("node:assert/strict");
const path = require("node:path");

if (!process.argv[2]) throw new Error("Provide the installed package path");
const Mixin = require(path.resolve(process.argv[2])).default;
assert.equal(typeof Mixin, "function");
class Extra extends Mixin {
  get answer() { return 42; }
  static label() { return "mixed"; }
}
class Target {}
Extra.includeInto(Target);
assert.equal(new Target().answer, 42);
assert.equal(Target.label(), "mixed");
console.log("Installed package exports a working mixin.");
