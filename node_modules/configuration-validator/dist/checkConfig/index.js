'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash');

var _reformatResult2 = require('./reformatResult');

var _reformatResult3 = _interopRequireDefault(_reformatResult2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = checkConfig;


function checkConfig(config, validators) {
  return (0, _lodash.reduce)(validators, getValidatorReducer(config), []);
}

function getValidatorReducer(config) {
  return validatorReducer;

  function validatorReducer(accumulator, validator) {
    var key = validator.key;

    var value = (0, _lodash.get)(config, key);
    if (!(0, _lodash.isUndefined)(value)) {
      var context = getContext(config, key);
      var result = validator.validate(value, context);
      if (result) {
        var _reformatResult = (0, _reformatResult3.default)(result, validator);

        var message = _reformatResult.message;
        var type = _reformatResult.type;

        accumulator.push({
          key: key,
          message: message,
          value: value,
          validator: validator,
          type: type
        });
      }
    }
    return accumulator;
  }
}

function getContext(config, key) {
  var path = (0, _lodash.toPath)(key);
  var parentPath = (0, _lodash.take)(path, path.length - 1);
  var parent = (0, _lodash.get)(config, parentPath);
  return {
    key: key,
    parent: parent,
    config: config
  };
}