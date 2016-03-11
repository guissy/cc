'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _lodash = require('lodash');

var _utils = require('../../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  key: 'entry',
  validate: validateEntry
};


function validateEntry(val, _ref) {
  var config = _ref.config;

  var context = config.context || process.cwd();
  if ((0, _lodash.isString)(val)) {
    return getEntryError(context, val);
  } else if ((0, _lodash.isArray)(val)) {
    return (0, _lodash.map)(val, function (entry) {
      return getEntryError(context, entry);
    }).filter(function (error) {
      return error;
    }).join(' - ');
  } else if ((0, _lodash.isObject)(val)) {
    return (0, _lodash.map)(val, function (entryVal) {
      return validateEntry(entryVal, { config: config });
    }).filter(function (error) {
      return error;
    }).join(' - ');
  } else {
    return 'must be a string, array of strings, or an object';
  }
}

function getEntryError(context, entry) {
  var entryPath = _path2.default.resolve(context, entry);
  var entryExists = (0, _utils.fileExists)(entryPath);
  if (!entryExists) {
    return 'no file exists at ' + entryPath;
  }
}