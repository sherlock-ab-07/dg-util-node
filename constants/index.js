const commonConstants = require('./common.constant');
const connectionConstants = require('./connection.constant');
const pgTableMapConstants = require('./pg-table-mapper.constant');

const STATUS_CODES = require('./status-code.constants');
const STATUS_MSGS = require('./status-message.constants');

module.exports = {
  ...pgTableMapConstants,
  ...commonConstants,
  ...connectionConstants,
  ...STATUS_CODES,
  ...STATUS_MSGS,
};
