
export default class ActionStatus {

    constructor() {
        this.inProgress = false;
        this.isComplete = false;
        this.error = null;
    }

    get inProgress() {
        return this._inProgress;
    }

    set inProgress(value) {
        this._inProgress = value;
    }
    
    get isComplete() {
        return this._isComplete;
    }

    set isComplete(value) {
        this._isComplete = value;
    }
    
    get hasError() {
        return (this.error != null);
    }

    get error() {
        return this._error;
    }

    set error(value) {
        this._error = value;
    }
}
