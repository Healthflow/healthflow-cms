import { put, select, call } from 'redux-saga/effects';
import { loadSchemaSuccess, setError } from './appActions';
import CMSService from 'services/cms/cmsServiceStub';

export default function* appLoadSchemaSaga(request) {
    let schemaUri = request.payload.schemaUri;
    
    try {
        let settings = yield select(state => state.app.settings);
        let cmsService = new CMSService(settings.apiBaseUrl);
       
        const schema = yield call(cmsService.getSchema, schemaUri);
 
        yield put(loadSchemaSuccess(schemaUri, schema));
    }
    catch (exception) {
        
        console.log("BANG !");
        
        yield put(setError(`Unable To Load Schema At URI: '${schemaUri}'`, exception.message, exception));
    }
}
