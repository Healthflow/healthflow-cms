import {
    takeLatest,
    takeEvery
}
from 'redux-saga/effects';

import * as appConstants from './appConstants';
import { HTTP_REQUEST_ACTION_TYPE } from "framework/actions/httpRequestAction"; 
import appLoadSaga from "store/sagas/app/appLoadSaga";
import appLoadSchemaSaga from "store/sagas/app/appLoadSchemaSaga";
import appSetLanguageSaga from "store/sagas/app/appLanguageSaga";
import appHttpRequestSaga from "store/sagas/app/appHttpRequestSaga";

export default function* appSaga() {
    yield [
        takeLatest(appConstants.APP_LOAD_REQUEST, appLoadSaga),
        takeLatest(appConstants.APP_CHANGE_LANGUAGE_REQUEST, appSetLanguageSaga),
        takeLatest(appConstants.APP_LOAD_SCHEMA_REQUEST, appLoadSchemaSaga),
        takeEvery(HTTP_REQUEST_ACTION_TYPE, appHttpRequestSaga)
    ];
}