#!/usr/bin/env node

import path from 'path';

import pkg from '../package.json';
import MdastParser from './parser';

const Parser = new MdastParser();
const root = path.resolve(__dirname, "../sample/summary.md");

try {
  let mdast = Parser.readMarkdownFile(root);
  Parser.analyzeMdast(mdast)
} catch (ex) {
  console.log(ex);
}
