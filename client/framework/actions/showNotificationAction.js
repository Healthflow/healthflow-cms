import Action from "./action";
import ArgumentNullException from "framework/exceptions/argumentNullException";

export const SHOW_NOTIFICATION_ACTION_TYPE = "show-notification";

export class ShowNotificationAction extends Action {

    constructor(parameters) {
        super(SHOW_NOTIFICATION_ACTION_TYPE);
        
        let {
            notificationType,
            title,
            description
        } = parameters;
        
        if (!title) {
            throw new ArgumentNullException("ShowNotificationAction.constructor.parameters.title");
        }
        
        this.notificationType = notificationType;
        this.title = title;
        this.description = description;
    }
    
    get notificationType() {
        return this._notificationType;
    }

    set notificationType(value) {
        this._notificationType = value;
    }

    get title() {
        return this._title;
    }

    set title(value) {
        this._title = value;
    }
    
    get description() {
        return this._description;
    }

    set description(value) {
        this._description = value;
    }
    
    // This is the payload required by redux actions
    getRequest() {
        return {
            type: this.type,
            payload: {
                type: this.notificationType,
                title: this.title,
                description: this.description
            }
        };
    }
}
