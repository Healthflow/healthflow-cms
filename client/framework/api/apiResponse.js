export default class Response {
    
    constructor(body = null, errorCode = null) {
        this.body = body;
        this.errorCode = errorCode;
    }
    
    get hasError() {
        return this._errorCode != null;
    }
    
    get errorCode () {
        return this._errorCode;
    }
    
    set errorCode(value) {
        this._errorCode = value;
    }
    
    get body () {
        return  this._body;
    }
    
    set body(value) {
        this._body = value;
    }
}