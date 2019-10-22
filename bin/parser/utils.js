"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifySummaryMDAST = exports.verifySummaryMD = exports.deconstructMDAST = void 0;

var _constants = require("../constants");

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  ROOT_TYPE,
  LIST_TYPE
} = _constants.CONSTANTS;

const deconstructMDAST = mdast => {
  const {
    children
  } = mdast;
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
};

exports.deconstructMDAST = deconstructMDAST;

const verifySummaryMD = filename => _path.default.basename(filename, '.md') === 'SUMMARY' || _path.default.basename(filename, '.md') === 'summary';

exports.verifySummaryMD = verifySummaryMD;

const verifySummaryMDAST = mdast => {
  const mdastFilterByListType = mdast.children.filter(child => child.type === LIST_TYPE);

  const _isMdastTypeRoot = mdast.type === ROOT_TYPE;

  const _mdastHasListNode = mdastFilterByListType.length > 0;

  return _isMdastTypeRoot && _mdastHasListNode;
};

exports.verifySummaryMDAST = verifySummaryMDAST;