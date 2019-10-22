"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.invalidCommandResponse = exports.parseOutSuccess = exports.parseSuccess = exports.mdFail = exports.mdIsInvalid = exports.mdIsValid = exports.noOfParentLinks = exports.folderInvalid = exports.generateHelpText = exports.verifyHelpText = void 0;

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

const generateHelpText = () => {
  console.log('');
  console.log('Examples: ');
  console.log('  $ gensum gen -j summary.md');
  console.log('  $ gensum generate summary.md /Users/jonathan.cardenas/gen-summary/sample');
  console.log('  $ gensum generate -a /Users/jonathan.cardenas/gen-summary/sample/summary.md');
  console.log('');
};

exports.generateHelpText = generateHelpText;

const folderInvalid = sourceFolder => console.log('[' + _chalk.default.red('X') + '] ' + sourceFolder + ' is not a valid directory!');

exports.folderInvalid = folderInvalid;

const noOfParentLinks = num => console.log('Number of depth level zero links: ' + _chalk.default.green(num));

exports.noOfParentLinks = noOfParentLinks;

const mdIsValid = () => console.log('[' + _chalk.default.green('✔') + '] Markdown file is valid!');

exports.mdIsValid = mdIsValid;

const mdIsInvalid = () => console.log('[' + _chalk.default.red('X') + '] Markdown file is not valid');

exports.mdIsInvalid = mdIsInvalid;

const mdFail = () => console.log('[' + _chalk.default.red('X') + '] Markdown parse failed! See stack trace above');

exports.mdFail = mdFail;

const parseSuccess = () => console.log('[' + _chalk.default.green('✔') + '] Summary dictionary parsed');

exports.parseSuccess = parseSuccess;

const parseOutSuccess = () => console.log('[' + _chalk.default.green('✔') + '] Summary file written to SUMMARY.json');

exports.parseOutSuccess = parseOutSuccess;

const invalidCommandResponse = args => {
  console.error(_chalk.default.red.bold('Invalid command: %s\nSee --help for a list of available commands.'), args);
};

exports.invalidCommandResponse = invalidCommandResponse;