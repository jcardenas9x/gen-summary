#!/usr/bin/env node
"use strict";

require("core-js/modules/es.symbol.description");

var _commander = _interopRequireDefault(require("commander"));

var _chalk = _interopRequireDefault(require("chalk"));

var _package = _interopRequireDefault(require("../package.json"));

var _parser = _interopRequireDefault(require("./parser"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Parser = new _parser.default(process.cwd());

_commander.default.version(_package.default.version, '-v, --version', 'Output the current version');

_commander.default.command('verify <path> [src]').description('Verify that the file in <path> is valid Markdown AST, and is a valid SUMMARY file').option('-a, --abs', 'if true, the path is absolute. False by default').action((path, src, options) => {
  try {
    const isAbs = options.abs || false;
    const sourceFolder = src || "";
    let sourceParser = null;

    if (sourceFolder !== "") {
      if (!Parser.verifyFolder(sourceFolder)) {
        console.log('[' + _chalk.default.red('X') + '] ' + sourceFolder + ' is not a valid directory!');
        return;
      }

      sourceParser = new _parser.default(sourceFolder);
    }

    const filename = sourceParser ? sourceParser.grabFilename(path, isAbs) : Parser.grabFilename(path, isAbs);
    const file = Parser.readMarkdownFile(filename);

    if (Parser.analyzeMdast(file)) {
      console.log('[' + _chalk.default.green('✔') + '] Markdown file is valid!');
    } else {
      console.log('[' + _chalk.default.red('X') + '] Markdown file is not valid');
    }
  } catch (ex) {
    console.log(ex);
    console.log('[' + _chalk.default.red('X') + '] Markdown file is not valid');
  }
}).on('--help', () => {
  console.log('');
  console.log('Examples: ');
  console.log('  $ gensum verify summary.md /Users/jonathan.cardenas/gen-summary/sample');
  console.log('  $ gensum verify -a /Users/jonathan.cardenas/gen-summary/sample/summary.md');
  console.log('');
});

_commander.default.parse(process.argv);