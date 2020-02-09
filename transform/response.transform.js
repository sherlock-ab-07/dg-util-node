const { statusCodes } = require('../constants/status-message.constants');

const fennixResponse = (status, language, data) => {
  let returnObj = {};
  if (typeof status !== 'number') {
    throw new Error('status must be a number');
  } else {
    returnObj = {
      responseStatus: status,
      userMessage: statusCodes[status]['userMsg'][language],
      devMessage: statusCodes[status]['devMsg'],
      responseData: data,
    };
  }
  return returnObj;
};

const dropdownCreator = (dropdownKey, dropdownValue, isDisabledFlag) => {
  dropdownKey, dropdownValue, isDisabledFlag;
};

const dropdownActionButtonCreator = dropActBtn => {
  let dropdownAction = {
    dropdownSetId: dropActBtn['dropdown_set_id'],
    dropdownKey: dropActBtn['dropdown_key'],
    dropdownId: dropActBtn['dropdown_id'],
    dropdownValue: dropActBtn['dropdown_value'],
    isDisabledFlag: dropActBtn['is_disable'],
    dropdownTransferKey: dropActBtn['dropdown_transfer_key'],
    dropdownIconKey: dropActBtn['dropdown_action_button_icon_key'],
    dropdownIconValue: dropActBtn['dropdown_action_button_icon_value'],
    isPrimaryAction: dropActBtn['is_primary_action'],
  };
  if (dropActBtn['is_action_button']) {
    dropdownAction = {
      ...dropdownAction,
      modalId: dropActBtn['dropdown_action_button_modal_id'],
      actionType: dropActBtn['action_name'],
      submitEndpoint: dropActBtn['endpoint'],
      subReqType: dropActBtn['endpoint_request_type'],
      subReqParams: dropActBtn['endpoint_mandatory_request_params'],
      navigationRouteName: dropActBtn['route_name'],
      navigationRouteUrl: dropActBtn['route_url'],
      navigationRouteId: dropActBtn['route_id'],
    };
  }
  return dropdownAction;
};

module.exports = {
  fennixResponse,
  dropdownCreator,
  dropdownActionButtonCreator,
};
