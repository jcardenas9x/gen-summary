"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _unified = _interopRequireDefault(require("unified"));

var _remarkParse = _interopRequireDefault(require("remark-parse"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const returnMDAST = file => {
  return (0, _unified.default)().use(_remarkParse.default).parse(file);
};

var _default = returnMDAST;
exports.default = _default;