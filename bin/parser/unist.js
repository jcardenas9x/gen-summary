"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.recursiveNavigate = void 0;

var _constants = require("../constants");

var _lodash = _interopRequireDefault(require("lodash"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  LIST_TYPE,
  LINK_TYPE,
  PARAGRAPH_TYPE
} = _constants.CONSTANTS;

const deserialize = object => JSON.stringify(object, null, 4);

const parseTextNode = node => {
  let item = {
    "title": ""
  };
  item["title"] = node.children.map(node => node.value).join('');
  return item;
};

const parseLinkNode = node => {
  let item = {
    "title": "",
    "link": ""
  };
  item["link"] = node.url;
  item["title"] = node.children.map(node => node.value).join('');
  return item;
};

const createSummaryItem = (node, subs) => {
  let item = node.type === LINK_TYPE ? parseLinkNode(node) : parseTextNode(node);

  if (subs.length > 0) {
    item = Object.assign(item, {
      "sub": []
    });
  }

  return item;
};

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
};

const recursiveNavigate = function recursiveNavigate(list) {
  let initializedOutput = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
    "array": [],
    "title": ""
  };

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
};

exports.recursiveNavigate = recursiveNavigate;