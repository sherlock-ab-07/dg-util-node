/**
 * @description Success codes with data 200
 * @description Success codes with empty records 204
 * @description Error connecting to mongo 520
 * @description Error connecting to pg 521
 * @description Error connecting to other micro services 522
 * @description Errors due to other reasons 523
 */
const STATUS_CODES = {
  STATUS_OK: 200,
  STATUS_CREATED: 201,
  STATUS_UPDATED: 210,
  STATUS_DELETED: 211,
  STATUS_EMPTY: 204,
  STATUS_MONGO_ERR: 520,
  STATUS_PG_ERR: 521,
  STATUS_MICRO_ERR: 522,
  STATUS_OTHER_ERR: 523,
  STATUS_GET_ERR: 524,
  STATUS_DELETE_ERR: 525,
  STATUS_UPDATE_ERR: 526,
  STATUS_CREATE_ERR: 527,
};

module.exports = { ...STATUS_CODES };
