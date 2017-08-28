import Action from "./action";
import ArgumentNullException from "framework/exceptions/argumentNullException";

export const REMOVE_DATA_ACTION_TYPE = "remove-data";

export class RemoveDataAction extends Action {

    constructor(parameters) {
        super(REMOVE_DATA_ACTION_TYPE);
        
        let {
            path
        } = parameters;
        
        if (!path) {
            throw new ArgumentNullException("RemoveDataAction.path");
        }
        
        this.path = path;
    }

    get path() {
        return this._path;
    }

    set path(value) {
        this._path = value;
    }
    
    // This is the payload required by redux actions
    getRequest() {
        return {
            type: this.type,
            payload: {
                path: this.path
            }
        };
    }
}
