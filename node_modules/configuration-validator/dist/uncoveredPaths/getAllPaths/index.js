'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash');

exports.default = getAllPaths;


function getAllPaths(object) {
  var base = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];
  var visited = arguments.length <= 2 || arguments[2] === undefined ? [] : arguments[2];

  if (!(0, _lodash.isPlainObject)(object) || (0, _lodash.isEmpty)(object)) {
    return [];
  }
  var paths = Object.keys(object).map(function (key) {
    var val = object[key];
    var alreadyVisited = (0, _lodash.includes)(visited, val);
    if (alreadyVisited) {
      return key;
    }
    var path = base ? base + '.' + key : key;
    if (!(0, _lodash.isPlainObject)(val)) {
      return path;
    }

    visited.push(val); // only add visited to plain objects
    return getAllPaths(object[key], path, visited);
  });
  return (0, _lodash.flatten)(paths);
}