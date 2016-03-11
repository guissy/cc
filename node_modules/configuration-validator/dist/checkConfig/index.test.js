'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _ava = require('ava');

var _ava2 = _interopRequireDefault(_ava);

var _lodash = require('lodash');

var _ = require('.');

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

(0, _ava2.default)('can fail', function (t) {
  var validators = [{ key: 'foo.bar.baz', validate: function validate() {
      return 'foo error';
    }, description: 'foo bar baz thing' }];
  var config = { foo: { bar: { baz: 'error stuff' } } };
  var result = (0, _2.default)(config, validators);

  var _result = _slicedToArray(result, 1);

  var item = _result[0];

  t.true((0, _lodash.isMatch)(item, {
    key: 'foo.bar.baz',
    message: 'foo error',
    value: 'error stuff',
    validator: validators[0],
    type: 'error'
  }));
});

(0, _ava2.default)('can pass', function (t) {
  var validators = [getPassingValidator({ key: 'foo' })];
  var config = { foo: 'working stuff' };
  var result = (0, _2.default)(config, validators);
  noErrors(t, result);
});

(0, _ava2.default)('can warn', function (t) {
  var key = 'foo';
  var message = 'warning about foo';
  var value = 'foo value';
  var validators = [{
    key: key,
    validate: function validate() {
      return { warning: message };
    }
  }];
  var config = _defineProperty({}, key, value);
  var result = (0, _2.default)(config, validators);

  var _result2 = _slicedToArray(result, 1);

  var warning = _result2[0];

  t.true((0, _lodash.isMatch)(warning, {
    key: key,
    message: message,
    value: value,
    validator: validators[0],
    type: 'warning'
  }));
});

(0, _ava2.default)('doesn\'t check non-existing keys', function (t) {
  var validators = [getPassingValidator({ key: 'foo' }), getFailingValidator({ key: 'bar' })];
  var config = { foo: true };
  var result = (0, _2.default)(config, validators);
  noErrors(t, result);
});

(0, _ava2.default)('doesn\'t check non-exsisting validators', function (t) {
  var validators = [getFailingValidator({ key: 'baz' })];
  var config = { foo: true };
  var result = (0, _2.default)(config, validators);
  noErrors(t, result);
});

function noErrors(t, result) {
  t.true(result.length === 0);
}

function getFailingValidator(overrides) {
  return _extends({
    key: 'failing.property',
    validate: function validate() {
      return 'failed prop';
    },
    description: 'Always Failing Prop'
  }, overrides);
}

function getPassingValidator(overrides) {
  return _extends({
    key: 'passing.property',
    validate: function validate() {
      return undefined;
    },
    description: 'Always Passing Prop'
  }, overrides);
}