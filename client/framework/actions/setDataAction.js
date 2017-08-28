import Action from "./action";
import InvalidSetDataModeException from "./invalidSetDataModeException";
import ArgumentNullException from "framework/exceptions/argumentNullException";

export const SET_DATA_ACTION_TYPE = "set-data";

const OVERWRITE_IF_EXISTS = "overwrite";
const APPEND = "append";

export class SetDataAction extends Action {

    constructor(parameters) {
        super(SET_DATA_ACTION_TYPE);
        
        let {
            path,
            mode = OVERWRITE_IF_EXISTS,
            data
        } = parameters;
        
        if (!path) {
            throw new ArgumentNullException("SetDataAction.path");
        }
        
        let supportedModes = [
            OVERWRITE_IF_EXISTS,
            APPEND
        ];
        
        if (!parameters.mode in supportedModes) {
            throw new InvalidSetDataModeException(parameters.mode, supportedModes);
        }
        
        this.path = path;
        this.mode = mode;
        this.data = data;
    }

    get path() {
        return this._path;
    }

    set path(value) {
        this._path = value;
    }
    
    get mode() {
        return this._mode;
    }

    set mode(value) {
        this._mode = value;
    }
    
    get data() {
        return this._data;
    }

    set data(value) {
        this._data = value;
    }
    
    // This is the payload required by redux actions
    getRequest() {
        return {
            type: this.type,
            payload: {
                path: this.path,
                mode: this.mode,
                data: this.data
            }
        };
    }
}
