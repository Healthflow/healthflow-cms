import Action from "./action";
import ArgumentNullException from "framework/exceptions/argumentNullException";
export const HTTP_REQUEST_ACTION_TYPE = "http-request";
import _ from "lodash";

export class HttpRequestAction extends Action {

    constructor(parameters, data) {
        super(HTTP_REQUEST_ACTION_TYPE);
        
        let {
            uri,
            verb,
            params = {}, 
            headers = [], 
            dataPath = null,
            path
        } = parameters;
        
        if (!uri) {
            throw new ArgumentNullException("HttpRequestAction.uri");
        }
        
        if (!verb) {
            throw new ArgumentNullException("HttpRequestAction.verb");
        }
        
        if (!path) {
            throw new ArgumentNullException("HttpRequestAction.path");
        }
        
        this.uri = uri;
        this.verb = verb;
        this.params = params;
        this.headers = headers;
        this.dataPath = dataPath;
        this.data = data;
        this.path = path;
    }

    get uri() {
        return this._uri;
    }

    set uri(value) {
        this._uri = value;
    }
    
    get verb() {
        return this._verb;
    }

    set verb(value) {
        this._verb = value;
    }

    get params() {
        return this._params;
    }

    set params(value) {
        this._params = value;
    }
    
    get headers() {
        return this._headers;
    }

    set headers(value) {
        this._headers = value;
    }
    
    get dataPath() {
        return this._dataPath;
    }

    set dataPath(value) {
        this._dataPath = value;
    }
    
    get data() {
        return this._data;
    }

    set data(value) {
        this._data = value;
    }
    
    get path() {
        return this._path;
    }

    set path(value) {
        this._path = value;
    }
    
    // Returns a redux action
    getRequest() {
        
        let data = this.data;
        
        if (this.dataPath) {
            data = _.get(data, this.dataPath);
        }
        
        return {
            type: this.type,
            payload: {
                uri: this.uri,
                verb: this.verb,
                params: this.params,
                headers: this.headers,
                data: this.data,
                path: this.path
            }
        };
    }
}
