"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifySummaryMDAST = exports.verifySummaryMD = exports.deconstructMDAST = exports.parseListItemNode = exports.initializeListItem = exports.initializeSummary = void 0;

var _constants = require("../constants");

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  ROOT_TYPE,
  LIST_TYPE
} = _constants.CONSTANTS;

const initializeSummary = () => Object.assign({}, {
  "array": [],
  "title": ""
});

exports.initializeSummary = initializeSummary;

const initializeListItem = () => Object.assign({}, {
  "title": "",
  "link": ""
});

exports.initializeListItem = initializeListItem;

const parseListItemNode = node => {};

exports.parseListItemNode = parseListItemNode;

const deconstructMDAST = mdast => {
  const {
    children
  } = mdast;
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
};

exports.deconstructMDAST = deconstructMDAST;

const verifySummaryMD = filename => _path.default.basename(filename, '.md') === 'SUMMARY' || _path.default.basename(filename, '.md') === 'summary';

exports.verifySummaryMD = verifySummaryMD;

const verifySummaryMDAST = mdast => mdast.type === ROOT_TYPE && mdast.children.length === 1 && mdast.children[0].type === LIST_TYPE;

exports.verifySummaryMDAST = verifySummaryMDAST;