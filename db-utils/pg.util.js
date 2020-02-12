const { Pool } = require('pg');
const {
  isNotNull,
  isArrNotEmpty,
  isNotNullAndEmpty,
  doesObjHavProp,
} = require('../data-transform/data.validator');
const {
  ROWS,
  STATUS_PG_ERR,
  STATUS_OK,
  STATUS_EMPTY,
} = require('../constants');
const { progress, error } = require('../util/color.log');
const { postgresSofiaDev } = require('../constants/connection.constant');
const pool = new Pool(postgresSofiaDev);

const metaFilterQueryCreator = (filterQuery, colName) => {
  filterQuery = filterQuery.replace(
    '{0}',
    `fs.${dbTableColMap['filterset'][colName]}`,
  );
  return filterQuery;
};
const pgRowExtractor = result => {
  const { data, status } = result;
  return status === STATUS_OK && doesObjHavProp(data, ROWS)
    ? {
        status: isArrNotEmpty(data.rows) ? status : STATUS_EMPTY,
        data: data.rows,
      }
    : result;
};

const insertQueryCreator = (req, tableName, insertQuery) => {
  let columns = '',
    values = 'values',
    keysArray = [],
    updatedInsertQuery,
    valuesArray = [],
    counter = 0;
  keysArray = Object.keys(req).filter(key =>
    isNotNull(dbTableColMap[tableName][key]),
  );
  keysArray.forEach((key, index) => {
    if (index === 0) {
      columns = `(${dbTableColMap[tableName][key]}`;
      values = `${values} ($${counter + 1}`;
    } else if (index === keysArray.length - 1) {
      columns = `${columns},${dbTableColMap[tableName][key]})`;
      values = `${values}, $${counter + 1})`;
    } else {
      columns = `${columns},${dbTableColMap[tableName][key]}`;
      values = `${values}, $${counter + 1}`;
    }
    counter++;
    valuesArray.push(req[key]);
  });
  updatedInsertQuery = `${insertQuery} ${tableName} ${columns} ${values} RETURNING ${tableKeyMap[tableName]['key']}`;
  return { valuesArray, updatedInsertQuery };
};

const updateQueryCreator = (table, fields, whereCondition) => {
  let query = `update ${table} set `;
  fields = fields.filter(field => isNotNull(dbTableColMap[table][field]));
  fields.forEach((field, index) => {
    let deltaQuery = '';
    query = `${query} ${dbTableColMap[table][field]} = $${index + 1}`;
    deltaQuery =
      index === fields.length - 1
        ? `where ${whereCondition} = $${index + 2}`
        : ',';
    query = `${query} ${deltaQuery}`;
  });
  return { fields, query };
};

const requestInModifier = (itemArray, query, isLanguage) => {
  let modifiedQuery = query;
  if (isArrNotEmpty(itemArray)) {
    itemArray.forEach((item, index) => {
      const paramNumber = isLanguage ? index + 2 : index + 1;
      if (index === 0 && itemArray.length === 1) {
        modifiedQuery = `${modifiedQuery} ($${paramNumber})`;
      } else if (index === 0) {
        modifiedQuery = `${modifiedQuery} ($${paramNumber},`;
      } else if (index === itemArray.length - 1) {
        modifiedQuery = `${modifiedQuery} $${paramNumber})`;
      } else {
        modifiedQuery = `${modifiedQuery} $${paramNumber},`;
      }
    });
  }
  return modifiedQuery;
};

const sortAndPaginateCreator = (sortBy, sortOrder, offset, limit, table) => {
  let query;
  offset = offset || 0;
  limit = limit || 10;
  sortBy = isNotNull(sortBy) ? sortBy : tableDefaultSortMap[table].sortBy;
  sortOrder = isNotNull(sortOrder)
    ? sortOrder
    : tableDefaultSortMap[table].sortOrder;
  query = `order by ${sortBy} ${sortOrder} nulls last offset ${offset} limit ${limit}`;
  return query;
};
const skipFieldsCreator = (setFields, skipValue) => {
  if (isNotNull(setFields)) {
    delete setFields[skipValue];
  }
  return setFields;
};
const pgDataFilterQueryCreator = (keyArray, valueArray) => {
  let filterQuery = ``;
  if (isArrNotEmpty(keyArray) && isArrNotEmpty(valueArray)) {
    keyArray.forEach((value, index) => {
      filterQuery =
        index === keyArray.length - 1
          ? `${value} = ${valueArray[index]}`
          : `${value} = ${valueArray[index]} and `;
    });
  }
  return filterQuery;
};

const pgQueryExec = async (req, query) => {
  let returnQuery;
  const start = Date.now();
  try {
    if (isNotNullAndEmpty(query)) {
      req = isNotNullAndEmpty(req) ? req : [];
      returnQuery = await pool.query(query, req);
      const duration = Date.now() - start;
      progress(`query  took : ${duration}`);
    }
    return { status: STATUS_OK, data: returnQuery };
  } catch (err) {
    const duration = Date.now() - start;
    //TODO : Add logging.
    error(`query failed after: ${duration} with the following error : ${err}`);
    return { status: STATUS_PG_ERR, data: null };
  }
};

module.exports = {
  pgQueryExec,
  metaFilterQueryCreator,
  pgRowExtractor,
  insertQueryCreator,
  updateQueryCreator,
  requestInModifier,
  sortAndPaginateCreator,
  skipFieldsCreator,
  pgDataFilterQueryCreator,
};
