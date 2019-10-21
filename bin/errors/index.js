"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InternalError = exports.MarkdownASTError = exports.ProblematicFileError = void 0;

class ParserError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }

}

class ProblematicFileError extends ParserError {
  constructor(file, issue) {
    super("File ".concat(file, " has the following problem: ").concat(issue));
    this.data = {
      file,
      issue
    };
  }

}

exports.ProblematicFileError = ProblematicFileError;

class MarkdownASTError extends ParserError {
  constructor(node, issue, rawAstNode) {
    super("The following issue was found in ".concat(node, ": ").concat(issue));
    this.data = {
      rawAstNode,
      issue
    };
  }

}

exports.MarkdownASTError = MarkdownASTError;

class InternalError extends ParserError {
  constructor(error) {
    super(error.message);
    this.data = {
      error
    };
  }

}

exports.InternalError = InternalError;