export default class Action {

    constructor(actionType) {
        this.type = actionType;
    }

    get type() {
        return this._type;
    }

    set type(value) {
        this._type = value;
    }
}
