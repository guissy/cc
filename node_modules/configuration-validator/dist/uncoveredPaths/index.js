'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash');

var _pathDiff = require('./pathDiff');

var _pathDiff2 = _interopRequireDefault(_pathDiff);

var _getAllPaths = require('./getAllPaths');

var _getAllPaths2 = _interopRequireDefault(_getAllPaths);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = uncoveredPaths;


function uncoveredPaths(config, validators) {
  var allPaths = (0, _getAllPaths2.default)(config);
  var validatedPaths = (0, _lodash.uniq)(validators.map(function (v) {
    return v.key;
  }));
  return (0, _pathDiff2.default)(allPaths, validatedPaths);
}