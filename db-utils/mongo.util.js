const { isNotNull } = require('../data-transform/data.validator');

const mongoWhereInCreator = data => {
  return { $in: data };
};

const mongoUpdateQueryCreator = obj => {
  let request = { $set: {} };
  if (isNotNull(obj)) {
    Object.keys(obj).forEach(key => {
      request.$set[key] = obj[key];
    });
  }
  return request;
};

module.exports = {
  mongoUpdateQueryCreator,
  mongoWhereInCreator,
};
