import _ from "lodash";
import Api from "framework/api/api";
import join from "framework/api/path";
import ArgumentNullException from "framework/exceptions/argumentNullException";
import InvalidLanguageException from "framework/localization/invalidLanguageException";

/*
* Response for the loading configuration from the CMS API, validate and parse it.
*/
export default class LocalizationServiceStub {
    
    constructor(apiBaseUrl, supportedLanguages) {
        
        if (!apiBaseUrl) {
            throw new ArgumentNullException("apiBaseUrl");
        }
        
        if (!supportedLanguages || supportedLanguages.length == 0) {
            throw new ArgumentNullException("supportedLanguages");
        }
        
        this.apiBaseUrl = apiBaseUrl;
        this.supportedLanguages = supportedLanguages;
        this.getStrings = this.getStrings.bind(this);
    }
    
    get apiBaseUrl () {
        return this._apiBaseUrl;
    }
    
    set apiBaseUrl (value) {
        this._apiBaseUrl = value;
    }
    
    get supportedLanguages () {
        return this._supportedLanguages;
    }
    
    set supportedLanguages (value) {
        this._supportedLanguages = value;
    }
    
    getStrings(language) {
        
        if(!this.isLanguageSupported(language, this.supportedLanguages)) {
            throw new InvalidLanguageException(language, this.supportedLanguages);
        }
        
        let languageFilename = `data/${language}-language.json`;
        
        let url = join(this.apiBaseUrl, languageFilename);
        return new Api().get(url, {}, (response) => {
            return response.body; 
        });
    }
    
    isLanguageSupported(language, supportedLanguages) {
        let isLanguageSupported = _.some(supportedLanguages, (l) => {
            return l.value == language;
        });
        
        return isLanguageSupported;
    }
}