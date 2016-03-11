'use strict';

var _ava = require('ava');

var _ava2 = _interopRequireDefault(_ava);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _os = require('os');

var _os2 = _interopRequireDefault(_os);

var _ = require('.');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _ava2.default)('fileExists returns true for a file', function (t) {
  t.true((0, _.fileExists)(__filename));
});

(0, _ava2.default)('fileExists returns true for a directory with an index.js', function (t) {
  t.true((0, _.fileExists)(__dirname));
});

(0, _ava2.default)('fileExists returns false for a directory without an index.js', function (t) {
  var directoryPath = _os2.default.tmpdir();
  t.false((0, _.fileExists)(directoryPath));
});

(0, _ava2.default)('fileExists returns false for a path without a file', function (t) {
  var tmp = _os2.default.tmpdir();
  var filepath = _path2.default.join(tmp, tmp);
  t.false((0, _.fileExists)(filepath));
});