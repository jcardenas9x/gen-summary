class ParserError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

class ProblematicFileError extends ParserError {
  constructor(file, issue) {
    super(`File ${file} has the following problem: ${issue}`);
    this.data = { file, issue };
  }
}

class MarkdownASTError extends ParserError {
  constructor(node, issue, rawAstNode) {
    super(`The following issue was found in ${node}: ${issue}`);
    this.data = { rawAstNode, issue };
  }
}

class InternalError extends ParserError {
  constructor(error) {
    super(error.message);
    this.data = { error };
  }
}

export {
  ProblematicFileError,
  MarkdownASTError,
  InternalError
};
