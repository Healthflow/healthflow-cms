import { put, call } from 'redux-saga/effects';
import HttpService from "services/httpService";
import ActionResult from "framework/actions/actionResult";

export default function* appHttpRequestSaga(request) {
    try {
        let action = request.payload;
        let inProgressResult = new ActionResult(action.type, action.path, null);
        inProgressResult.setInProgress();
        
        yield put(inProgressResult.getRequest());
        
        let httpService = new HttpService();
        let data = yield call(httpService.sendRequest, { uri: action.uri });
        
        let completeResult = new ActionResult(action.type, action.path, data);
        completeResult.setComplete();
        
        yield put(completeResult.getRequest());
    }
    catch (exception) {
        console.error(exception);
    }
}
