'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash');

exports.default = pathDiff;


function pathDiff(keysToCover, coverageKeys) {
  var pathsToCover = keysToCover.map(function (key) {
    return (0, _lodash.toPath)(key);
  });
  var coveragePaths = coverageKeys.map(function (key) {
    return (0, _lodash.toPath)(key);
  });

  var uncoveredPaths = pathsToCover.reduce(findUncoveredPathsReducer, []);
  return uncoveredPaths;

  function findUncoveredPathsReducer(accumulator, currentPath, index) {
    if (!pathIsCovered(currentPath)) {
      accumulator.push(keysToCover[index]);
    }
    return accumulator;
  }

  function pathIsCovered(path) {
    return coveragePaths.some(function (coveragePath) {
      for (var i = 0; i < coveragePath.length && i < path.length; i++) {
        var coveragePathSegment = coveragePath[i];
        var pathSegment = path[i];
        if (coveragePathSegment !== pathSegment) {
          return false;
        }
      }
      return true;
    });
  }
}