'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash');

exports.default = [{ key: 'devServer.contentBase', validate: _lodash.noop }, { key: 'devServer.hot', validate: _lodash.noop }, { key: 'devServer.historyApiFallback', validate: _lodash.noop }, { key: 'devServer.proxy', validate: _lodash.noop }, { key: 'devServer.quiet', validate: _lodash.noop }, { key: 'devServer.noInfo', validate: _lodash.noop }, { key: 'devServer.lazy', validate: _lodash.noop }, { key: 'devServer.filename', validate: _lodash.noop }, { key: 'devServer.watchOptions.aggregateTimeout', validate: _lodash.noop }, { key: 'devServer.watchOptions.poll', validate: _lodash.noop }, { key: 'devServer.publicPath', validate: _lodash.noop }, { key: 'devServer.headers', validate: _lodash.noop }, { key: 'devServer.host', validate: _lodash.noop }, { key: 'devServer.port', validate: _lodash.noop },

// we could probably share logic between here and the root `stats` property
{ key: 'devServer.stats', validate: _lodash.noop }];