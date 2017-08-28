import { put, select, call } from 'redux-saga/effects';
import { setLanguage } from 'redux-polyglot';
import { setLanguageSuccess, setLanguageError } from './appActions';
import LocalizationService from 'services/localizationServiceStub';

export default function* appSetLanguageSaga(request) {
    try {
        let language = request.payload.language;
        let settings = yield select(state => state.app.settings);
        let localizationService = new LocalizationService(settings.apiBaseUrl, settings.supportedLanguages);

        const languageStrings = yield call(localizationService.getStrings, language);
        
        // Tell redux-polyglot to set the language
        yield put(setLanguage(language, languageStrings));
        
        yield put(setLanguageSuccess(language));
    }
    catch (exception) {
        console.error(exception);
        yield put(setLanguageError(exception.message));
    }
}
