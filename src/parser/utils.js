import { CONSTANTS } from '../constants';
import path from 'path';

const {
  ROOT_TYPE,
  LIST_TYPE
} = CONSTANTS

export const deconstructMDAST = (mdast) => {
  const { children } = mdast;
  const mdastFilterByListType = children.filter(child => child.type === LIST_TYPE);
  let data = {
    depthLevelZeroLinks: 0,
    actualList: [],
    mdast: {}
  };

  if (mdastFilterByListType.length === 0) {
    return data;
  } else {
    if (mdastFilterByListType[0].children.length > 0) {
      data.depthLevelZeroLinks = mdastFilterByListType[0].children.length;
      data.actualList = mdastFilterByListType[0].children.slice(0);
      data.mdast = mdast;
      return data;
    } else {
      return data;
    }
  }
}

export const verifySummaryMD = (filename) => (path.basename(filename, '.md') === 'SUMMARY' || path.basename(filename, '.md') === 'summary');
export const verifySummaryMDAST = (mdast) => {
  const mdastFilterByListType = mdast.children.filter(child => child.type === LIST_TYPE);
  const _isMdastTypeRoot = (mdast.type === ROOT_TYPE);
  const _mdastHasListNode = mdastFilterByListType.length > 0;

  return (_isMdastTypeRoot && _mdastHasListNode);
}
