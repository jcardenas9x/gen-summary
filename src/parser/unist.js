import { CONSTANTS } from '../constants';
import _ from 'lodash';
import visit from 'unist-util-visit';

const {
  ROOT_TYPE,
  LIST_TYPE,
  LIST_ITEM_TYPE,
  LINK_TYPE,
  TEXT_TYPE,
  PARAGRAPH_TYPE
} = CONSTANTS

const initializeSummary = () => Object.assign({}, {
  "array": [],
  "title": ""
});

const nodesAreSamePosition = (parent, rootPos) => {
  if (
    _.isEqual(parent.position.start, rootPos.start) &&
    _.isEqual(parent.position.end, rootPos.end)
  ) {
    return true;
  }
  return false;
}

const parseTextNode = (node) => {
  let item = {"title": ""};
  item["title"] = node.children.map(node => node.value).join('');
  return item;
}

const parseLinkNode = (node) => {
  let item = {"title": "", "link": ""};
  item["link"] = node.url;
  item["title"] = node.children.map(node => node.value).join('');
  return item;
}

const createSummaryItem = (node, subs) => {
  let item = (node.type === LINK_TYPE) ? 
    parseLinkNode(node) : 
    parseTextNode(node);
  if (subs.length > 0) {
    item = Object.assign(item, {"sub": []});
  }
  return item;
}

export const navigate = (tree) => {
  let rootListNodePosition = {};
  let subIndexNodePosition = {};
  let summary = initializeSummary();
  let workingIndex = 0;

  visit(tree, (node, index, parent) => {
    if (node.type === LIST_TYPE && parent && parent.type === ROOT_TYPE) {
      rootListNodePosition = Object.assign({}, node.position);
    }

    if (node.type === LIST_ITEM_TYPE) {        
      let label = node.children.filter(child => child.type === PARAGRAPH_TYPE);
      let subs = node.children.filter(child => child.type === LIST_TYPE);

      if (nodesAreSamePosition(parent, rootListNodePosition)) {
        workingIndex = index;
        let item = createSummaryItem(label[0].children[0], subs)
        summary["array"].push(item);
      }
/*       console.log(
        `Current working depthIndex: ${workingIndex} w/ listItem node index ${index} w/ ${node.children.length} children`
      ); */
      if (!nodesAreSamePosition(parent, rootListNodePosition)) {
        let item = createSummaryItem(label[0].children[0], subs);
        if (item.sub) {
          subIndexNodePosition = Object.assign({}, node.position);
        }
        if (workingIndex === 7) {
          console.log(subIndexNodePosition);
          console.log(item);
        }
      }
    }
  })

  return summary;
}
