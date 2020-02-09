const commonConstants = require('./common.constant');
const connectionConstants = require('./connection.constant');
const pgTableMapConstants = require('./pg-table-mapper.constant');

const statusCodeConstants = require('./status-code.constants');
const statusMsgConstants = require('./status-message.constants');

module.exports = {
  ...pgTableMapConstants,
  ...commonConstants,
  ...connectionConstants,
  ...statusCodeConstants,
  ...statusMsgConstants,
};
