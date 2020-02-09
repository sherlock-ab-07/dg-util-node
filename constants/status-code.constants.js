/**
 * @description Success codes with data 200
 * @description Success codes with empty records 204
 * @description Error connecting to mongo 520
 * @description Error connecting to pg 521
 * @description Error connecting to other micro services 522
 * @description Errors due to other reasons 523
 */
const statusCodeConstants = {
  STATUS_OK: 200,
  STATUS_EMPTY: 204,
  STATUS_MONGO_ERR: 520,
  STATUS_PG_ERR: 521,
  STATUS_MICRO_ERR: 522,
  STATUS_OTHER_ERR: 523,
};

module.exports = { statusCodeConstants };
