"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _fsExtra = _interopRequireDefault(require("fs-extra"));

var _errors = require("../errors");

var _utils = require("./utils");

var _mdast = _interopRequireDefault(require("../mdast"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class MdastParser {
  constructor() {}

  readMarkdownFile(filename) {
    if ((0, _utils.verifySummaryMD)(filename)) {
      let file = _fsExtra.default.readFileSync(filename);

      return (0, _mdast.default)(file);
    } else {
      throw new _errors.ProblematicFileError(filename, "Invalid filename, requires SUMMARY.md or summary.md");
    }
  }

  analyzeMdast(mdast) {
    if ((0, _utils.verifySummaryMDAST)(mdast)) {
      console.log((0, _utils.deconstructMDAST)(mdast));
    } else {
      throw new _errors.MarkdownASTError("root node", "This MDAST is not a valid list", mdast);
    }
  }

}

var _default = MdastParser;
exports.default = _default;