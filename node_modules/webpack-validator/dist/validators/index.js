'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash');

var _context = require('./context');

var _context2 = _interopRequireDefault(_context);

var _entry = require('./entry');

var _entry2 = _interopRequireDefault(_entry);

var _output = require('./output');

var _output2 = _interopRequireDefault(_output);

var _module2 = require('./module');

var _module3 = _interopRequireDefault(_module2);

var _plugins = require('./plugins');

var _plugins2 = _interopRequireDefault(_plugins);

var _externals = require('./externals');

var _externals2 = _interopRequireDefault(_externals);

var _node = require('./node');

var _node2 = _interopRequireDefault(_node);

var _stats = require('./stats');

var _stats2 = _interopRequireDefault(_stats);

var _resolve = require('./resolve');

var _resolve2 = _interopRequireDefault(_resolve);

var _devtool = require('./devtool');

var _devtool2 = _interopRequireDefault(_devtool);

var _debug = require('./debug');

var _debug2 = _interopRequireDefault(_debug);

var _devServer = require('./devServer');

var _devServer2 = _interopRequireDefault(_devServer);

var _resolveLoader = require('./resolveLoader');

var _resolveLoader2 = _interopRequireDefault(_resolveLoader);

var _target = require('./target');

var _target2 = _interopRequireDefault(_target);

var _bail = require('./bail');

var _bail2 = _interopRequireDefault(_bail);

var _profile = require('./profile');

var _profile2 = _interopRequireDefault(_profile);

var _cache = require('./cache');

var _cache2 = _interopRequireDefault(_cache);

var _amd = require('./amd');

var _amd2 = _interopRequireDefault(_amd);

var _loader = require('./loader');

var _loader2 = _interopRequireDefault(_loader);

var _recordsPath = require('./recordsPath');

var _recordsPath2 = _interopRequireDefault(_recordsPath);

var _recordsInputPath = require('./recordsInputPath');

var _recordsInputPath2 = _interopRequireDefault(_recordsInputPath);

var _recordsOutputPath = require('./recordsOutputPath');

var _recordsOutputPath2 = _interopRequireDefault(_recordsOutputPath);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _lodash.flatten)([_context2.default, _entry2.default, _plugins2.default, _externals2.default, _output2.default, _module3.default, _node2.default, _stats2.default, _resolve2.default, _devtool2.default, _debug2.default, _devServer2.default, _resolveLoader2.default, _target2.default, _bail2.default, _profile2.default, _cache2.default, _amd2.default, _loader2.default, _recordsPath2.default, _recordsInputPath2.default, _recordsOutputPath2.default]);