'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash');

exports.default = [{ key: 'node.console', validate: _lodash.noop }, { key: 'node.global', validate: _lodash.noop }, { key: 'node.process', validate: _lodash.noop }, { key: 'node.Buffer', validate: _lodash.noop }, { key: 'node.__filename', validate: _lodash.noop }, { key: 'node.__dirname', validate: _lodash.noop }, { key: 'node', validate: _lodash.noop }];