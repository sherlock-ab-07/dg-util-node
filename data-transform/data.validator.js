/**
 * @description Checks if the data is not null or not.
 * @param {*} data - Can be anything.
 */
const isNotNull = data =>
  data !== null &&
  data !== undefined &&
  data !== '' &&
  data !== 'undefined' &&
  data !== 'null';

const isNotNullAndEmpty = data => isNotNull(data) && data !== '';
/**
 * @description checks if the data is array or not as well if it has value or not.
 * @param  arrayData : [] must be an array.
 */
const isArrNotEmpty = arrayData =>
  isNotNull(arrayData) &&
  Object.prototype.toString.call(arrayData) === '[object Array]' &&
  arrayData.length > 0;
/**
 *
 * @param {*} objectData
 * @param {*} propertyName
 */
const doesObjHavProp = (objectData, propertyName) =>
  isNotNull(objectData) &&
  objectData.hasOwnProperty(propertyName) &&
  isNotNull(objectData[propertyName]);

const deviceStatusMapper = (key, value, condtnMap) => {
  let statusMap = { status: '', color: '' };
  Object.keys(condtnMap[key]).map(item => {
    if (
      value > condtnMap[key][item]['startValue'] &&
      value < condtnMap[key][item]['endValue']
    ) {
      statusMap.status = item;
      statusMap.color = condtnMap[key][item]['color'];
    }
  });
  return statusMap;
};

const isString = str =>
  isNotNullAndEmpty(str) &&
  typeof str === 'string' &&
  str.constructor.name.toLowerCase() === 'string';

const isNumber = num =>
  isNotNullAndEmpty(num) &&
  typeof num === 'number' &&
  str.constructor.name.toLowerCase() === 'number';

const stringComparator = (str1, str2) =>
  isString(str1) && isString(str2) && str1.toLowerCase() === str2.toLowerCase();

module.exports = {
  isNotNull,
  isArrNotEmpty,
  isString,
  isNumber,
  isNotNullAndEmpty,
  doesObjHavProp,
  stringComparator,
  deviceStatusMapper,
};
