import chalk from 'chalk';

export const verifyHelpText = () => {
  console.log('');
  console.log('Examples: ');
  console.log('  $ gensum verify summary.md /Users/jonathan.cardenas/gen-summary/sample');
  console.log('  $ gensum verify -a /Users/jonathan.cardenas/gen-summary/sample/summary.md');
  console.log('');
}

export const folderInvalid = (sourceFolder) => 
  console.log('[' + chalk.red('X') + '] '+sourceFolder+' is not a valid directory!');
export const mdIsValid = () => console.log('[' + chalk.green('✔') + '] Markdown file is valid!');
export const mdIsInvalid = () => console.log('[' + chalk.red('X') + '] Markdown file is not valid');
