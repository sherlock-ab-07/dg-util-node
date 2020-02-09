const { isArrNotEmpty, isNotNull } = require('./data.validator');
const arrObjReducer = (inputData, mappingKeyArray) => {
  if (mappingKeyArray.length === 1) {
    return inputData[mappingKeyArray[0]];
  } else {
    return arrObjReducer(
      inputData[mappingKeyArray[0]],
      mappingKeyArray.splice(1, mappingKeyArray.length - 1),
    );
  }
};
const keySplitter = key =>
  key && key.indexOf('>') > -1 ? key.split('>') : [key];

const resObjCreator = (
  inputObj,
  outKeyArray,
  keyArray,
  excludeEmptyFlag = false,
) => {
  let returnObj = null;
  if (isNotNull(inputObj) && isArrNotEmpty(keyArray)) {
    returnObj = {};
    keyArray.forEach((key, index) => {
      const keyArr = keySplitter(key);
      if (!excludeEmptyFlag && isArrNotEmpty(keyArr)) {
        returnObj[outKeyArray[index]] = arrObjReducer(inputObj, key);
      }
    });
  }
  return returnObj;
};
// const constantCreator =

module.exports = {
  arrObjReducer,
  keySplitter,
  resObjCreator,
};
