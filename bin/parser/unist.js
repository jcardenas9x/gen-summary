"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.navigate = exports.recursiveNavigate = void 0;

var _constants = require("../constants");

var _lodash = _interopRequireDefault(require("lodash"));

var _unistUtilVisit = _interopRequireDefault(require("unist-util-visit"));

var _unistUtilParents = _interopRequireDefault(require("unist-util-parents"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  ROOT_TYPE,
  LIST_TYPE,
  LIST_ITEM_TYPE,
  LINK_TYPE,
  TEXT_TYPE,
  PARAGRAPH_TYPE
} = _constants.CONSTANTS;

const initializeSummary = () => Object.assign({}, {
  "array": [],
  "title": ""
});

const deserialize = object => JSON.stringify(object, null, 4);

const nodesAreSamePosition = (parent, rootPos) => {
  if (_lodash.default.isEqual(parent.position.start, rootPos.start) && _lodash.default.isEqual(parent.position.end, rootPos.end)) {
    return true;
  }

  return false;
};

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

const subAdd = (node, subArray) => {};

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
    console.log(item);

    if (item.sub) {
      console.log(subs[0].children);
    }
  }
};

exports.recursiveNavigate = recursiveNavigate;

const navigate = tree => {
  let rootListNodePosition = {};
  let summary = initializeSummary();
  let workingIndex = 0;
  let workingParent = null;
  let siblings = [];
  (0, _unistUtilVisit.default)((0, _unistUtilParents.default)(tree), (node, index, parent) => {
    if (node.type === LIST_TYPE && parent && parent.type === ROOT_TYPE) {
      rootListNodePosition = Object.assign({}, node.position);
    }

    if (node.type === LIST_ITEM_TYPE) {
      let label = node.children.filter(child => child.type === PARAGRAPH_TYPE);
      let subs = node.children.filter(child => child.type === LIST_TYPE);

      if (nodesAreSamePosition(parent, rootListNodePosition)) {
        workingIndex = index;
        workingParent = Object.assign({}, node);
        let item = createSummaryItem(label[0].children[0], subs);
        summary["array"].push(item);
      }

      if (!nodesAreSamePosition(parent, rootListNodePosition)) {
        let item = createSummaryItem(label[0].children[0], subs);
        siblings = parent.children;

        if (summary["array"][workingIndex].sub) {
          summary["array"][workingIndex].sub.push(item);
        }
      }
    }
  });
  return summary;
};

exports.navigate = navigate;