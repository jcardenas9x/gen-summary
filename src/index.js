#!/usr/bin/env node

import program from 'commander';
import chalk from 'chalk';

import pkg from '../package.json';
import MdastParser from './parser';

const Parser = new MdastParser(__dirname);
//const root = path.resolve(__dirname, "../sample/summary.md");

program
  .version(pkg.version, '-v, --version', 'Output the current version');

program
  .command('verify <path> [src]')
  .description('Verify that the file in <path> is valid Markdown AST, and is a valid SUMMARY file')
  .option('-a, --abs', 'if true, the path is absolute. False by default')
  .action((path, src, options) => {
    try {
      const isAbs = options.abs || false;
      const sourceFolder = src || "";
      let sourceParser = null;

      if (sourceFolder !== "") {
        sourceParser = new MdastParser(src);
      }

      const filename = (sourceParser) ? sourceParser.grabFilename(path, isAbs) :
        Parser.grabFilename(path, isAbs);
      const file = Parser.readMarkdownFile(filename);

      if (Parser.analyzeMdast(file)) {
        console.log('[' + chalk.green('✔') + '] Markdown file is valid!');
      } else {
        console.log('[' + chalk.red('X') + '] Markdown file is not valid');
      }
    } catch (ex) {
      console.log(ex);
      console.log('[' + chalk.red('X') + '] Markdown file is not valid');
    }
  }).on('--help', () => {
    console.log('');
    console.log('Examples: ');
    console.log('  $ gensum verify summary.md /Users/jonathan.cardenas/gen-summary/sample');
    console.log('  $ gensum verify -a /Users/jonathan.cardenas/gen-summary/sample/summary.md');
    console.log('');
  })

program.parse(process.argv)
