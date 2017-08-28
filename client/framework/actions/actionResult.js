import ActionStatus from "./actionStatus";

export const ACTION_RESULT = "ACTION_RESULT";

export default class ActionResult {

    constructor(actionType, path, data) {
        this.type = actionType;
        this.path = path;
        this.status = new ActionStatus();
        this.data = data;
        this.timeStamp = new Date().toISOString();
    }
    
    get timeStamp() {
        return this._timeStamp;
    }
    
    set timeStamp(value) {
        this._timeStamp = value;
    }
    
    get type() {
        return this._type;
    }

    set type(value) {
        this._type = value;
    }
    
    get path() {
        return this._path;
    }

    set path(value) {
        this._path = value;
    }
    
    get status() {
        return this._status;
    }

    set status(value) {
        this._status = value;
    }

    get data() {
        return this._data;
    }

    set data(value) {
        this._data = value;
    }
    
    setInProgress() {
        this.status.inProgress = true;
    }
    
    setComplete() {
        this.status.isComplete = true;
    }
    
    setError(error) {
        this.status.error = error;        
    }
    
    /**
    * This is the action that will be dispatched redux to the reducer
    */
    getRequest() {
        return {
            type: ACTION_RESULT,
            payload: {
                path: this.path,
                actionResult: {
                    _status: this.status,
                    ...this.data
                }
            }
        };
    }
}
