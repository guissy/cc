'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _ava = require('ava');

var _ava2 = _interopRequireDefault(_ava);

var _ = require('.');

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var coveredPaths = [[[], []], [[], ['foo']], [['foo'], ['foo']], [['foo'], ['foo', 'bar']], [['foo.baz', 'foo.bar'], ['foo']], [['foo.bat', 'foo.buz', 'foo.foo.bar', 'foo.foo.baz'], ['foo.bat', 'foo.buz', 'foo.foo']]];

(0, _ava2.default)('covered config/validator pairs should pass', function (t) {
  coveredPaths.forEach(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2);

    var config = _ref2[0];
    var validators = _ref2[1];

    t.true((0, _2.default)(config, validators).length === 0, 'config: ' + config + ' ; validators: ' + validators);
  });
});

var uncoveredPaths = [[['foo'], []], [['foo'], ['bar']], [['foo.baz', 'foo.bar'], ['foo.baz']], [['foo.bat', 'foo.buz', 'foo.foo.bar', 'foo.foo.baz'], ['foo.bat', 'foo.buz', 'foo.foo.baz']]];

(0, _ava2.default)('uncovered config/validator pairs should fail', function (t) {
  uncoveredPaths.forEach(function (_ref3) {
    var _ref4 = _slicedToArray(_ref3, 2);

    var config = _ref4[0];
    var validators = _ref4[1];

    t.true((0, _2.default)(config, validators).length === 1, 'config: ' + config + ' ; validators: ' + validators);
  });
});