import InvalidActionException from './invalidActionException';

import { HTTP_REQUEST_ACTION_TYPE, HttpRequestAction } from "./httpRequestAction";
import { SET_DATA_ACTION_TYPE, SetDataAction } from "./setDataAction";
import { REMOVE_DATA_ACTION_TYPE, RemoveDataAction } from "./removeDataAction";
import { SHOW_NOTIFICATION_ACTION_TYPE, ShowNotificationAction } from "./showNotificationAction";

const getAction = function(actionType, parameters, data) {
    
    const actions = {};
    actions[HTTP_REQUEST_ACTION_TYPE] = HttpRequestAction;
    actions[SET_DATA_ACTION_TYPE] = SetDataAction;
    actions[REMOVE_DATA_ACTION_TYPE] = RemoveDataAction;
    actions[SHOW_NOTIFICATION_ACTION_TYPE] = ShowNotificationAction;
    
    let action = actions[actionType];
    
    if (!action) {
        throw new InvalidActionException(actionType, actions);
    }
    
    return new action(parameters, data);
};

export default getAction;