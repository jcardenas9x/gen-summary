#!/usr/bin/env node
"use strict";

var _path = _interopRequireDefault(require("path"));

var _package = _interopRequireDefault(require("../package.json"));

var _parser = _interopRequireDefault(require("./parser"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Parser = new _parser.default();

const root = _path.default.resolve(__dirname, "../sample/summary.md");

try {
  let mdast = Parser.readMarkdownFile(root);
  Parser.analyzeMdast(mdast);
} catch (ex) {
  console.log(ex);
}