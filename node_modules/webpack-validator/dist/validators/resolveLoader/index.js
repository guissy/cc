'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _resolve = require('../resolve');

var _resolve2 = _interopRequireDefault(_resolve);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// this is exactly the same as resolve, so we're just re-using those validators
exports.default = _resolve2.default.map(function (validator) {
  return _extends({}, validator, {
    key: validator.key.replace(/resolve/, 'resolveLoader')
  });
});