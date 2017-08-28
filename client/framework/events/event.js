import { sendActionRequest } from "store/sagas/app/appActions";
import getAction from "framework/actions/actionRegistry";
import ArgumentNullException from 'framework/exceptions/argumentNullException';

/*
* Event is responsible for dispatching actions.
*/ 
export default class Event {

    constructor(evenType, eventSchema, data) {
        
        if (!evenType) {
            throw new ArgumentNullException("Event.constructor.evenType");
        }  
        
        if (!eventSchema) {
            throw new ArgumentNullException("Event.constructor.eventSchema");
        }   

        this.type = evenType;
        this.schema = eventSchema;
        this.data = data;
    }

    get type() {
        return this._type;
    }

    set type(value) {
        this._type = value;
    }
    
    get schema() {
        return this._schema;
    }

    set schema(value) {
        this._schema = value;
    }
    
    get data() {
        return this._data;
    }

    set data(value) {
        this._data = value;
    }
    
    trigger(dispatch) {
        
        let actions = this.schema.actions || [];
        let actionCount = actions.length;
        
        for (let i = 0; i < actionCount; i++) {
            
            let actionType = actions[i].type;
            let actionParameters = actions[i].parameters;
            let action = getAction(actionType, actionParameters, this.data);
            
            dispatch(action.getRequest());
        }
    }
}
