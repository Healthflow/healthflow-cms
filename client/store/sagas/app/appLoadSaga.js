import {
    all,
    put,
    call,
    take
}
from 'redux-saga/effects';
import {
    loadSuccess,
    setError,
    loadSettingsSuccess,
    setLanguage
}
from './appActions';
import * as constants from "./appConstants";
import SettingsService from 'services/settingsServiceStub';
import CMSService from 'services/cms/cmsServiceStub';
import UserService from 'services/userServiceStub';

export default function* appLoadSaga() {
    try {
        let settingsService = new SettingsService();
        let settings = yield call(settingsService.get);
        
        yield put(loadSettingsSuccess(settings));
        
        let cmsService = new CMSService(settings.apiBaseUrl);
        let userService = new UserService(settings.apiBaseUrl);
        
        const [routes, layout, preferences] = yield all([
            call(cmsService.getRoutes),
            call(cmsService.getLayout),
            call(userService.getPreferences)
        ]);
        
        // Set the language and wait for the response
        yield put(setLanguage(preferences.language || settings.defaultLanguage));
        
        // Listen for set language success and errors
        let changeLanguageResponse = yield take([
            constants.APP_CHANGE_LANGUAGE_SUCCESS,
            constants.APP_CHANGE_LANGUAGE_ERROR
        ]);    
        
        // If the language could not be set then finish loading the app with an error
        if (changeLanguageResponse.type == constants.APP_CHANGE_LANGUAGE_ERROR) {
            yield put(setError(
                        "Unable To Set Application Language", 
                        changeLanguageResponse.payload.error.message,
                        changeLanguageResponse.payload.error));
            return;
        }

        yield put(loadSuccess(
            preferences,
            routes,
            layout
        ));
    }
    catch (exception) {
        yield put(setError(
                    "Unable To Load Application Dependencies",
                    exception.message,
                    exception));
    }
}