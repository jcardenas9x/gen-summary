import { CONSTANTS } from '../constants';
import path from 'path';

const {
  ROOT_TYPE,
  LIST_TYPE
} = CONSTANTS

export const initializeSummary = () => Object.assign({}, {
  "array": [],
  "title": ""
});

export const initializeListItem = () => Object.assign({}, {
  "title": "",
  "link": "",
})

export const parseListItemNode = (node) => {
  
}

export const deconstructMDAST = (mdast) => {
  const { children } = mdast;
  let data = {
    depthLevelZeroLinks: 0,
    actualList: []
  };

  if (children[0].children.length > 0) {
    data.depthLevelZeroLinks = children[0].children.length;
    data.actualList = children[0].children.slice(0);
    return data;
  } else {
    return data;
  }
}

export const verifySummaryMD = (filename) => (path.basename(filename, '.md') === 'SUMMARY' || path.basename(filename, '.md') === 'summary');
export const verifySummaryMDAST = (mdast) => (mdast.type === ROOT_TYPE && mdast.children.length === 1 && mdast.children[0].type === LIST_TYPE);
