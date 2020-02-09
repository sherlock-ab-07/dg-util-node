const request = require('./request.transform');
const response = require('./response.transform');

module.exports = {
  ...request,
  ...response,
};
