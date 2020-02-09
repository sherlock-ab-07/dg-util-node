const { isArrNotEmpty, doesObjHavProp } = require('../data-transform/data.validator');

const excelRowsCreator = (list, table, keysArray) => {
  let returnObj = {},
    ids = [],
    finalResponse = {};
  if (doesObjHavProp(list, 'rows') && isArrNotEmpty(list.rows)) {
    list.rows.forEach(item => {
      returnObj[item[tableKeyMap[table]['key']]] = {};
      keysArray.forEach(key => {
        returnObj[item[tableKeyMap[table]['key']]][key] =
          item[dbDownloadTableMapper[table][key]];
      });
      ids.push(`${item[tableKeyMap[table]['key']]}`);
    });
  }
  finalResponse['rows'] = returnObj;
  finalResponse['ids'] = ids;
  return finalResponse;
};

// const excelColCreator = async downloadMapAccessor => {
//   let downloadMapResponse,
//     finalResponse = {},
//     keysArray = [];
//   downloadMapperResponse = await downloadMapAccessor([]);
//   if (
//     doesObjHavProp(downloadMapResponse, 'rows') &&
//     isArrNotEmpty(downloadMapResponse.rows)
//   ) {
//     const cols = [];
//     downloadMapperResponse.rows.forEach(item => {
//       cols.push({
//         header: item['localized_key'],
//         key: item['mapping_key'],
//       });
//       keysArray.push(item['mapping_key']);
//     });
//     finalResponse['cols'] = cols;
//     finalResponse['keysArray'] = keysArray;
//   }
//   return finalResponse;
// };

module.exports = {
  excelRowsCreator,
};
