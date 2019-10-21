import fs from 'fs-extra';

import { ProblematicFileError, MarkdownASTError, InternalError } from '../errors';
import {
  deconstructMDAST, verifySummaryMDAST, verifySummaryMD
} from './utils';
import returnMDAST from '../mdast';

class MdastParser {

  constructor () { }

  readMarkdownFile (filename) {
    if (verifySummaryMD(filename)) {
      let file = fs.readFileSync(filename);
      return returnMDAST(file);
    } else {
      throw new ProblematicFileError(filename, "Invalid filename, requires SUMMARY.md or summary.md");
    }
  }

  analyzeMdast (mdast) {
    if (verifySummaryMDAST(mdast)) {
      console.log(deconstructMDAST(mdast));
    } else {
      throw new MarkdownASTError("root node", "This MDAST is not a valid list", mdast) 
    }
  }

}

export default MdastParser;
