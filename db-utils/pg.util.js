const {
  isNotNull,
  isArrNotEmpty,
  doesObjHavProp,
} = require('../data-transform/data.validator');

const meataFilterQueryCreator = (filterQuery, colName) => {
  filterQuery = filterQuery.replace(
    '{0}',
    `fs.${dbTableColMap['filterset'][colName]}`,
  );
  return filterQuery;
};
const pgRowExtractor = result =>
  doesObjHavProp(result, 'rows') && isArrNotEmpty(result.rows)
    ? isArrNotEmpty(result.rows)
    : null;

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

module.exports = {
  meataFilterQueryCreator,
  pgRowExtractor,
  insertQueryCreator,
  updateQueryCreator,
  requestInModifier,
  sortAndPaginateCreator,
  skipFieldsCreator,
  pgDataFilterQueryCreator,
};
