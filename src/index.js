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
      const data = Parser.analyzeMdast(file);
      
      if (data.depthLevelZeroLinks > 0) {
        Text.noOfParentLinks(data.depthLevelZeroLinks);
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
  });

program
  .command('generate <path> [src]')
  .alias('gen')
  .description('Generate the SUMMARY.json file or dictionary')
  .option('-a, --abs', 'if true, the path is absolute. False by default')
  .option('-j, --outjson', 'if true, output a json file named SUMMARY.json. False by default')
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
      const data = Parser.analyzeMdast(file);
  
      if (data.actualList && data.actualList.length > 0) {
        const tree = data.mdast;
        const summary = Parser.parseMdast(tree);
        console.log(summary);
      } else {
        Text.mdIsInvalid();
        return
      }
    } catch (ex) {
      console.log(ex);
      Text.mdFail();
    }
  }).on('--help', () => {
    Text.generateHelpText();
  })

program.on('command:*', function () {
  Text.invalidCommandResponse(program.args.join(' '));
  process.exit(1);
});

program.parse(process.argv)
