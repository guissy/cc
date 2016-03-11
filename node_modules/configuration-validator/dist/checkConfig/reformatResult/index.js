'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash');

exports.default = reformatResult;


function reformatResult(result) {
  var _ref = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  var description = _ref.description;
  var key = _ref.key;

  /* eslint complexity:[2, 6] */
  if ((0, _lodash.isString)(result)) {
    return { type: 'error', message: result };
  } else if ((0, _lodash.isPlainObject)(result)) {
    if (result.error) {
      return { type: 'error', message: result.error };
    } else if (result.warning) {
      return { type: 'warning', message: result.warning };
    }
  }
  throw new Error(['config-validator is returning a non-string non-conforming object.', 'Returned: ' + JSON.stringify(result) + ' for ' + (description || key)].join(' '));
}