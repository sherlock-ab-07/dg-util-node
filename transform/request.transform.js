const { Pool } = require('pg');
const { postgresSofiaDev } = require('../constants/connection.constant');
const pool = new Pool(postgresSofiaDev);

const pgQueryExec = async (req, query) => {
  let returnQuery;
  const start = Date.now();
  if (query !== null && query !== undefined && query !== '') {
    req = req !== null && req !== undefined && req !== '' ? req : [];
    returnQuery = await pool.query(query, req);
    const duration = Date.now() - start;
    console.log(`query  took : ${duration}`);
  }
  return returnQuery;
};

const reqBodyExtractor = req =>
  req && isNotNull(req.body) ? { ...req.body } : null;

module.exports = {
  reqBodyExtractor,
  pgQueryExec,
};
