'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fileExists = undefined;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.fileExists = fileExists;


function fileExists(filepath) {
  try {
    var stats = _fs2.default.lstatSync(filepath);
    /* istanbul ignore else because I don't know how to test that... */
    if (stats.isFile()) {
      return true;
    } else if (stats.isDirectory()) {
      var indexFilepath = _path2.default.join(filepath, 'index.js');
      return fileExists(indexFilepath);
    }
  } catch (e) {
    // ignore error
  }
  return false;
}