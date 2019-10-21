import chalk from 'chalk';

const errorText = chalk.bold.red;

class ParserError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

class ProblematicFileError extends ParserError {
  constructor(file, issue) {
    super(errorText(`File ${file} has the following problem: ${issue}`));
    this.data = { file, issue };
  }
}

class MarkdownASTError extends ParserError {
  constructor(node, issue, rawAstNode) {
    super(errorText(`The following issue was found in ${node}: ${issue}`));
    this.data = { rawAstNode, issue };
  }
}

class InternalError extends ParserError {
  constructor(error) {
    super(errorText(`${error.message}`));
    this.data = { error };
  }
}

export {
  ProblematicFileError,
  MarkdownASTError,
  InternalError
};
