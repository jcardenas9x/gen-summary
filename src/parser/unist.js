import { CONSTANTS } from '../constants';
import _ from 'lodash';

const {
  LIST_TYPE,
  LINK_TYPE,
  PARAGRAPH_TYPE
} = CONSTANTS

const deserialize = (object) => JSON.stringify(object, null, 4);

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

const subAdd = (node, subArray) => {
  let label = node.children.filter(child => child.type === PARAGRAPH_TYPE);
  let subs = node.children.filter(child => child.type === LIST_TYPE);
  let item = createSummaryItem(label[0].children[0], subs);

  if (item.sub) {
    let subList = subs[0].children.slice(0);
    for (let j = 0; j < subList.length; j++) {
      subAdd(subList[j], item.sub);
    }
  }

  subArray.push(item);
}

export const recursiveNavigate = (
  list, 
  initializedOutput = {"array": [], "title": ""}
) => {
  for (let i = 0; i < list.length; i++) {
    let node = list[i];
    let label = node.children.filter(child => child.type === PARAGRAPH_TYPE);
    let subs = node.children.filter(child => child.type === LIST_TYPE);
    let item = createSummaryItem(label[0].children[0], subs);

    if (item.sub) {
      /**
       * Please add in the children of the list type node
       */
      let subList = subs[0].children.slice(0);
      for (let j = 0; j < subList.length; j++) {
        subAdd(subList[j], item.sub);
      }
    }

    initializedOutput.array.push(item);
  }

  return initializedOutput;
}
