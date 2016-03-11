'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _lodash = require('lodash');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = messageFormatter;


function messageFormatter(results) {
  var _groupBy = (0, _lodash.groupBy)(results, 'type');

  var _groupBy$warning = _groupBy.warning;
  var warnings = _groupBy$warning === undefined ? [] : _groupBy$warning;
  var _groupBy$error = _groupBy.error;
  var errors = _groupBy$error === undefined ? [] : _groupBy$error;

  var error = errors.reduce(messageReducer, '');
  var warning = warnings.reduce(messageReducer, '');
  return { error: error, warning: warning };
}

function messageReducer(string, _ref, index, array) {
  var key = _ref.key;
  var message = _ref.message;
  var type = _ref.type;

  var newline = index === array.length - 1 ? '\n' : '';
  var highlight = type === 'error' ? 'red' : 'yellow';
  var keyPart = _chalk2.default.bold[highlight]('' + key);
  var messagePart = _chalk2.default.gray(message);
  return '' + string + newline + keyPart + ': ' + messagePart + '\n';
}