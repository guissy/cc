'use strict';

var _ava = require('ava');

var _ava2 = _interopRequireDefault(_ava);

var _proxyquire = require('proxyquire');

var _proxyquire2 = _interopRequireDefault(_proxyquire);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var utilsStub = { fileExists: function fileExists(p) {
    return p.includes('exists');
  } };
var validateEntry = (0, _proxyquire2.default)('.', { '../../utils': utilsStub });

var validate = validateEntry.default.validate;


(0, _ava2.default)('passes with a string as a path', function (t) {
  var entry = './exists';
  t.notOk(validate(entry, { config: {} }));
});

(0, _ava2.default)('fails with a string of a path that does not exist', function (t) {
  var entry = './fake';
  t.ok(validate(entry, { config: {} }));
});

(0, _ava2.default)('passes with an array of strings', function (t) {
  var entry = ['./exists1', './exists2'];
  var config = {};
  t.notOk(validate(entry, { config: config }));
});

(0, _ava2.default)('fails with an array of one string that does not exist', function (t) {
  var entry = ['./exists1', './fake'];
  var config = {};
  var message = validate(entry, { config: config });
  t.ok(message);
  t.false(message.includes(' - '));
  t.true(message.includes('fake'));
  t.false(message.includes('exists1'));
});

(0, _ava2.default)('fails with an array of multiple strings that do not exist', function (t) {
  var entry = ['./fake1', './exists1', './fake2'];
  var config = {};
  var message = validate(entry, { config: config });
  t.ok(message);
  t.false(message.includes('exists1'));
  t.true(message.includes(' - '));
  t.true(message.includes('fake1'));
  t.true(message.includes('fake2'));
});

(0, _ava2.default)('passes with an object', function (t) {
  var entry = {
    path1: './exists1',
    path2: ['./exists2', './exists3']
  };
  var config = {};
  t.notOk(validate(entry, { config: config }));
});

(0, _ava2.default)('fails with an object with a single failure', function (t) {
  var entry = {
    path1: './fake1',
    path2: ['./exists1', './exists2']
  };
  var config = {};
  var message = validate(entry, { config: config });
  t.false(message.includes('exists1'));
  t.false(message.includes(' - '));
  t.true(message.includes('fake1'));
});

(0, _ava2.default)('fails with an object with multiple failures', function (t) {
  var entry = {
    path1: './fake1',
    path2: ['./exists1', './fake2', './exists2']
  };
  var config = {};
  var message = validate(entry, { config: config });
  t.false(message.includes('exists1'));
  t.true(message.includes(' - '));
  t.true(message.includes('fake1'));
  t.true(message.includes('fake2'));
  t.false(message.includes('fake3'));
});

(0, _ava2.default)('fails with anything that\'s not a string, array, or object', function (t) {
  var entry = 42;
  var config = {};
  var message = validate(entry, { config: config });
  t.ok(message);
});