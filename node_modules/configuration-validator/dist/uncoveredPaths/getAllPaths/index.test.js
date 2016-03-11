'use strict';

var _ava = require('ava');

var _ava2 = _interopRequireDefault(_ava);

var _lodash = require('lodash');

var _ = require('.');

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _ava2.default)('paths for an empty object returns an empty array', function (t) {
  var input = {};
  var result = (0, _2.default)(input);
  t.true(result.length === 0);
});

(0, _ava2.default)('returns an empty array for non-plain object', function (t) {
  var input = 'foo';
  var result = (0, _2.default)(input);
  t.true(result.length === 0);
});

(0, _ava2.default)('paths for an object with only primative properties returns a simple array', function (t) {
  var input = {
    a: 'hi',
    b: true,
    c: 23,
    d: null
  };
  var result = (0, _2.default)(input);
  t.true((0, _lodash.isEqual)(result, ['a', 'b', 'c', 'd']));
});

(0, _ava2.default)('paths for an object with deep properties returns an array of the deepest of all properties', function (t) {
  var input = {
    level1: {
      level2: {
        level3: {
          leaf: true
        },
        level32: {
          level4: {
            leaf: 'hi'
          }
        }
      }
    }
  };
  var result = (0, _2.default)(input);
  t.true((0, _lodash.isEqual)(result, ['level1.level2.level3.leaf', 'level1.level2.level32.level4.leaf']));
});

(0, _ava2.default)('stops at arrays', function (t) {
  var input = {
    level1: {
      level2: {
        leaf: [{
          foo: {
            bar: 'baz'
          }
        }]
      },
      level22: {
        level3: {
          leaf: [{
            foobar: {
              spam: 'eggs'
            }
          }]
        }
      }
    }
  };
  var result = (0, _2.default)(input);
  t.true((0, _lodash.isEqual)(result, ['level1.level2.leaf', 'level1.level22.level3.leaf']));
});

(0, _ava2.default)('handles recursive structures without blowing up', function (t) {
  var input1 = {};
  var input2 = { input1: input1 };
  input1.input2 = input2;
  var result = (0, _2.default)(input1);
  t.true((0, _lodash.isEqual)(result, ['input2']));
});

/*
 * Tests below here are used to fix bugs (and keep them from coming back)
 */
(0, _ava2.default)('objects with keys who\'s values are the same as other keys', function (t) {
  var input = {
    externals: {
      angular: 'angular',
      'api-check': {
        root: 'apiCheck',
        amd: 'api-check',
        commonjs2: 'api-check',
        commonjs: 'api-check'
      }
    }
  };
  var result = (0, _2.default)(input);
  t.true((0, _lodash.isEqual)(result, ['externals.angular', 'externals.api-check.root', 'externals.api-check.amd', 'externals.api-check.commonjs2', 'externals.api-check.commonjs']));
});