#!/usr/bin/env node
"use strict";

require("core-js/modules/es.symbol.description");

var _commander = _interopRequireDefault(require("commander"));

var _package = _interopRequireDefault(require("../package.json"));

var _textCliHelper = _interopRequireDefault(require("./text-cli-helper"));

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
        _textCliHelper.default.folderInvalid(sourceFolder);

        return;
      }

      sourceParser = new _parser.default(sourceFolder);
    }

    const filename = sourceParser ? sourceParser.grabFilename(path, isAbs) : Parser.grabFilename(path, isAbs);
    const file = Parser.readMarkdownFile(filename);

    if (Parser.analyzeMdast(file)) {
      _textCliHelper.default.mdIsValid();
    } else {
      _textCliHelper.default.mdIsInvalid();
    }
  } catch (ex) {
    console.log(ex);

    _textCliHelper.default.mdIsInvalid();
  }
}).on('--help', () => {
  _textCliHelper.default.verifyHelpText();
});

_commander.default.on('command:*', function () {
  _textCliHelper.default.invalidCommandResponse(_commander.default.args.join(' '));

  process.exit(1);
});

_commander.default.parse(process.argv);