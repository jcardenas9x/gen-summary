#!/usr/bin/env node

import program from 'commander';

import pkg from '../package.json';
import Text from './text-cli-helper';
import MdastParser from './parser';

const Parser = new MdastParser(process.cwd());

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
        if (!Parser.verifyFolder(sourceFolder)) {
          Text.folderInvalid(sourceFolder);
          return
        }
        sourceParser = new MdastParser(sourceFolder);
      }

      const filename = (sourceParser) ? sourceParser.grabFilename(path, isAbs) :
        Parser.grabFilename(path, isAbs);
      const file = Parser.readMarkdownFile(filename);

      if (Parser.analyzeMdast(file)) {
        Text.mdIsValid();
      } else {
        Text.mdIsInvalid();
      }
    } catch (ex) {
      console.log(ex);
      Text.mdIsInvalid();
    }
  }).on('--help', () => {
    Text.verifyHelpText();
  })

program.parse(process.argv)
