import fs from 'fs-extra';
import path from 'path';

import { ProblematicFileError, MarkdownASTError, InternalError } from '../errors';
import {
  deconstructMDAST, verifySummaryMDAST, verifySummaryMD
} from './utils';
import returnMDAST from '../mdast';

class MdastParser {

  constructor (directory) { 
    this.directory = directory;
    this.cwd = process.cwd();
  }

  grabFilename (arg, isAbs = false) {
    if (isAbs) {
      if (path.isAbsolute(arg)) 
        return arg;
      else
        throw new ProblematicFileError(arg, "File is not absolute");
    } else {
      return path.resolve(this.directory, arg);
    }
  }

  readMarkdownFile (filename) {
    if (verifySummaryMD(filename)) {
      try {
        let file = fs.readFileSync(filename);
        return returnMDAST(file);
      } catch (ex) {
        throw new InternalError(ex);
      }
    } else {
      throw new ProblematicFileError(filename, "Invalid filename, requires SUMMARY.md or summary.md");
    }
  }

  verifyMdast (mdast) {
    if (verifySummaryMDAST(mdast)) {
      return true;
    } else {
      return false;
    }
  }

  analyzeMdast (mdast) {
    if (verifySummaryMDAST(mdast)) {
      return deconstructMDAST(mdast);
    } else {
      throw new MarkdownASTError("root node", "This MDAST is not a valid list", mdast) 
    }
  }

}

export default MdastParser;
