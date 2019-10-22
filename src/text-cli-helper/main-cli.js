import chalk from 'chalk';

export const verifyHelpText = () => {
  console.log('');
  console.log('Examples: ');
  console.log('  $ gensum verify summary.md /Users/jonathan.cardenas/gen-summary/sample');
  console.log('  $ gensum verify -a /Users/jonathan.cardenas/gen-summary/sample/summary.md');
  console.log('');
}

export const generateHelpText = () => {
  console.log('');
  console.log('Examples: ');
  console.log('  $ gensum gen -j summary.md');
  console.log('  $ gensum generate summary.md /Users/jonathan.cardenas/gen-summary/sample');
  console.log('  $ gensum generate -a /Users/jonathan.cardenas/gen-summary/sample/summary.md');
  console.log('');
}

export const folderInvalid = (sourceFolder) => 
  console.log('[' + chalk.red('X') + '] '+sourceFolder+' is not a valid directory!');
export const noOfParentLinks = (num) => console.log(
  'Number of depth level zero links: ' + chalk.green(num)
);
export const mdIsValid = () => console.log('[' + chalk.green('✔') + '] Markdown file is valid!');
export const mdIsInvalid = () => console.log('[' + chalk.red('X') + '] Markdown file is not valid');
export const mdFail = () => console.log('[' + chalk.red('X') + '] Markdown parse failed! See stack trace above');

export const invalidCommandResponse = (args) => {
  console.error(
    chalk.red.bold('Invalid command: %s\nSee --help for a list of available commands.'),
    args
  );
}
