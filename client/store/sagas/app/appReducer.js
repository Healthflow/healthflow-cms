import * as constants from './appConstants';
import assign from 'object-assign';
import _ from "lodash";

import {
    SET_DATA_ACTION_TYPE
}
from "framework/actions/setDataAction";
import {
    REMOVE_DATA_ACTION_TYPE
}
from "framework/actions/removeDataAction";
import {
    ACTION_RESULT
}
from "framework/actions/actionResult";
import {
    SHOW_NOTIFICATION_ACTION_TYPE
}
from "framework/actions/showNotificationAction";
import {
    CLEAR_NOTIFICATION_ACTION_TYPE
}
from "framework/actions/clearNotificationAction";
import {
    setObjectProperty,
    removeObjectProperty
}
from "framework/utils/object";

export default function appReducer(state = {}, {
    type,
    payload
}) {

    switch (type) {

        case constants.APP_LOAD_SETTINGS_SUCCESS:
            return handleAppSettingsLoaded(state, payload);

        case constants.APP_CHANGE_LANGUAGE_SUCCESS:
            return handleAppLanguageChanged(state, payload);

        case constants.APP_LOAD_SUCCESS:
            return handleAppLoaded(state, payload);

        case constants.APP_SET_ERROR:
            return handleError(state, payload);

        case constants.APP_LOAD_SCHEMA_SUCCESS:
            return handleSchemaLoaded(state, payload);

            // This is used by UI components
            // i.e. Entering text into a search filter to manipulate and set state.
        case SET_DATA_ACTION_TYPE:
            return assign({}, state, {
                data: setObjectProperty(state.data, payload)
            });

            // This is used by UI components
            // i.e. cleaning up data loaded by a page onLoad event.
        case REMOVE_DATA_ACTION_TYPE:
            return assign({}, state, {
                data: removeObjectProperty(state.data, payload.path)
            });

            // This is used by sagas to set the result of custom UI action.
            // i.e sending a HTTP request when an ActionLink is clicked.
        case ACTION_RESULT:
            return handleAddActionResultToState(state, payload.path, payload.actionResult);
        
        case SHOW_NOTIFICATION_ACTION_TYPE:
            return assign({}, state, {
                notification: payload
            });
            
        case CLEAR_NOTIFICATION_ACTION_TYPE:
            return assign({}, state, {
                notification: null
            });

        default:
            return state;
    }
}

const handleAppSettingsLoaded = (state, payload) => {
    return assign({}, state, {
        settings: payload.settings
    });
};

const handleAppLanguageChanged = (state, payload) => {
    return assign({}, state, {
        language: payload.language
    });
};

const handleAppLoaded = (state, payload) => {
    return assign({}, state, {
        isLoaded: true,
        preferences: payload.preferences,
        routes: payload.routes,
        layout: payload.layout
    });
};

const handleError = (state, payload) => {
    return assign({}, state, {
        isLoaded: false,
        hasError: true,
        error: {
            title: payload.title,
            description: payload.description,
            exception: payload.exception
        }
    });
};

const handleSchemaLoaded = (state, payload) => {
    let newSchemas = {
        ...state.schemas
    };
    newSchemas[payload.schemaUri] = payload.schema;

    return assign({}, state, {
        schemas: newSchemas
    });
};

const handleAddActionResultToState = (state, path, actionResult) => {
    let newData = assign({}, state.data, {});
    
    // find the value at the path and set its data
    _.set(newData, path, actionResult);

    return assign({}, state, {
        data: newData
    });
};
