"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _fsExtra = _interopRequireDefault(require("fs-extra"));

var _path = _interopRequireDefault(require("path"));

var _errors = require("../errors");

var _utils = require("./utils");

var _mdast = _interopRequireDefault(require("../mdast"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class MdastParser {
  constructor(directory) {
    this.directory = directory;
    this.cwd = process.cwd();
  }

  verifyFolder(directory) {
    return _fsExtra.default.lstatSync(directory).isDirectory();
  }

  grabFilename(arg) {
    let isAbs = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    if (isAbs) {
      if (_path.default.isAbsolute(arg)) return arg;else throw new _errors.ProblematicFileError(arg, "File is not absolute");
    } else {
      return _path.default.resolve(this.directory, arg);
    }
  }

  readMarkdownFile(filename) {
    if ((0, _utils.verifySummaryMD)(filename)) {
      try {
        let file = _fsExtra.default.readFileSync(filename);

        return (0, _mdast.default)(file);
      } catch (ex) {
        throw new _errors.InternalError(ex);
      }
    } else {
      throw new _errors.ProblematicFileError(filename, "Invalid filename, requires SUMMARY.md or summary.md");
    }
  }

  verifyMdast(mdast) {
    if ((0, _utils.verifySummaryMDAST)(mdast)) {
      return true;
    } else {
      return false;
    }
  }

  analyzeMdast(mdast) {
    if ((0, _utils.verifySummaryMDAST)(mdast)) {
      return (0, _utils.deconstructMDAST)(mdast);
    } else {
      throw new _errors.MarkdownASTError("root node", "This MDAST is not a valid list", mdast);
    }
  }

}

var _default = MdastParser;
exports.default = _default;