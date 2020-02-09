const dataModifiers = require('./data.modifier');
const dataValidators = require('./data.validator');

module.exports = {
  ...dataModifiers,
  ...dataValidators,
};
