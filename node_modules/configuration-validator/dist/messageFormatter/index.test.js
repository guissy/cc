'use strict';

var _ava = require('ava');

var _ava2 = _interopRequireDefault(_ava);

var _ = require('.');

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _ava2.default)('formats messages for errors', function (t) {
  var results = [{ type: 'error', message: 'first error message', key: 'the.first.key' }, { type: 'error', message: 'second error message', key: 'the.second.key' }];

  var _messageFormatter = (0, _2.default)(results);

  var error = _messageFormatter.error;

  t.ok(error.match(/the\.first\.key.*?first error message/));
  t.ok(error.match(/the\.second\.key.*?second error message/));
});

(0, _ava2.default)('formats messages for warnings', function (t) {
  var results = [{ type: 'warning', message: 'first warning message', key: 'the.first.key' }, { type: 'warning', message: 'second warning message', key: 'the.second.key' }];

  var _messageFormatter2 = (0, _2.default)(results);

  var warning = _messageFormatter2.warning;

  t.ok(warning.match(/the\.first\.key.*?first warning message/));
  t.ok(warning.match(/the\.second\.key.*?second warning message/));
});