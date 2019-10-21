"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.invalidCommandResponse = exports.mdIsInvalid = exports.mdIsValid = exports.folderInvalid = exports.verifyHelpText = void 0;

var _chalk = _interopRequireDefault(require("chalk"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const verifyHelpText = () => {
  console.log('');
  console.log('Examples: ');
  console.log('  $ gensum verify summary.md /Users/jonathan.cardenas/gen-summary/sample');
  console.log('  $ gensum verify -a /Users/jonathan.cardenas/gen-summary/sample/summary.md');
  console.log('');
};

exports.verifyHelpText = verifyHelpText;

const folderInvalid = sourceFolder => console.log('[' + _chalk.default.red('X') + '] ' + sourceFolder + ' is not a valid directory!');

exports.folderInvalid = folderInvalid;

const mdIsValid = () => console.log('[' + _chalk.default.green('✔') + '] Markdown file is valid!');

exports.mdIsValid = mdIsValid;

const mdIsInvalid = () => console.log('[' + _chalk.default.red('X') + '] Markdown file is not valid');

exports.mdIsInvalid = mdIsInvalid;

const invalidCommandResponse = args => {
  console.error(_chalk.default.red.bold('Invalid command: %s\nSee --help for a list of available commands.'), args);
};

exports.invalidCommandResponse = invalidCommandResponse;