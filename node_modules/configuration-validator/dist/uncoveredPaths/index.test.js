'use strict';

var _ava = require('ava');

var _ava2 = _interopRequireDefault(_ava);

var _ = require('.');

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var coveredPaths = [{
  config: {
    bar: '',
    baz: false
  },
  validators: [{ key: 'bar' }, { key: 'baz' }]
}, {
  config: {
    bar: {
      baz: []
    },
    foo: {
      foobar: false,
      spam: true
    }
  },
  validators: [{ key: 'bar.baz' }, { key: 'foo' }]
}];

coveredPaths.forEach(function (_ref, index) {
  var config = _ref.config;
  var validators = _ref.validators;

  (0, _ava2.default)('passing config/validator pair ' + index + ' should pass', function (t) {
    t.true((0, _2.default)(config, validators).length === 0, 'config: ' + JSON.stringify(config) + ' ; validators: ' + JSON.stringify(validators));
  });
});

var uncoveredPaths = [{
  config: {
    bar: '',
    baz: false
  },
  validators: [{ key: 'baz' }]
}, {
  config: {
    bar: {
      baz: []
    },
    foo: {
      foobar: false,
      spam: true
    }
  },
  validators: [{ key: 'bar.baz' }, { key: 'foo.spam' }]
}];

(0, _ava2.default)('passing config/validator pairs should pass', function (t) {
  uncoveredPaths.forEach(function (_ref2) {
    var config = _ref2.config;
    var validators = _ref2.validators;

    t.true((0, _2.default)(config, validators).length === 1, 'config: ' + JSON.stringify(config) + ' ; validators: ' + JSON.stringify(validators));
  });
});