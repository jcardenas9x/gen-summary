import fs from 'fs-extra';
import path from 'path';

import { ProblematicFileError, MarkdownASTError, InternalError } from '../errors';
import { CONSTANTS } from '../constants';
import {
  deconstructMDAST, verifySummaryMDAST, verifySummaryMD
} from './utils';
import { navigate, recursiveNavigate } from './unist';
import returnMDAST from '../mdast';

class MdastParser {

  constructor (directory) { 
    this.directory = directory;
  }

  verifyFolder (directory) {
    return fs.lstatSync(directory).isDirectory();
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

  grabDir (arg) {
    return path.dirname(arg);
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

  writeToSummaryFile (data) {
    try {
      let filepath = path.resolve(this.directory, 'SUMMARY.json');
      fs.writeFileSync(filepath, data);
      return 1;
    } catch (ex) {
      throw new InternalError(ex);
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

  parseMdast (mdast) {
    return navigate(mdast);
  }

  parseMdastAlt (mdast) {
    let list = mdast.children.filter(child => child.type === CONSTANTS.LIST_TYPE);
    return recursiveNavigate(list[0].children);
  }

}

export default MdastParser;
