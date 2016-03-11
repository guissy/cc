'use strict';

var _ava = require('ava');

var _ava2 = _interopRequireDefault(_ava);

var _lodash = require('lodash');

var _ = require('.');

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _ava2.default)('throws an error with a result of the incorrect type', function (t) {
  var resultStub = false;
  var validator = { key: 'the key' };
  t.throws(function () {
    return (0, _2.default)(resultStub, validator);
  }, /config-validator.*?false.*?the key/);
});

(0, _ava2.default)('throws an error with an improper object result', function (t) {
  var resultStub = { bar: 'baz' };
  var validator = { description: 'the description' };
  t.throws(function () {
    return (0, _2.default)(resultStub, validator);
  }, /config-validator.*?\{"bar":"baz"\}.*?the description/);
});

(0, _ava2.default)('returns a type error and message of result if result is a string', function (t) {
  var resultStub = 'result stub';
  var result = (0, _2.default)(resultStub);
  t.true((0, _lodash.isMatch)(result, {
    type: 'error',
    message: 'result stub'
  }));
});

(0, _ava2.default)('returns a type error and message of result.error', function (t) {
  var resultStub = { error: 'result error' };
  var result = (0, _2.default)(resultStub);
  t.true((0, _lodash.isMatch)(result, {
    type: 'error',
    message: 'result error'
  }));
});

(0, _ava2.default)('returns a type warning and error of result.error', function (t) {
  var resultStub = { error: 'result error' };
  var result = (0, _2.default)(resultStub);
  t.true((0, _lodash.isMatch)(result, {
    type: 'error',
    message: 'result error'
  }));
});

(0, _ava2.default)('returns a type warning and message of result.warning', function (t) {
  var resultStub = { warning: 'result warning' };
  var result = (0, _2.default)(resultStub);
  t.true((0, _lodash.isMatch)(result, {
    type: 'warning',
    message: 'result warning'
  }));
});