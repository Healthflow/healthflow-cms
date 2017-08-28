import Action from "./action";

export const CLEAR_NOTIFICATION_ACTION_TYPE = "clear-notification";

export class ClearNotificationAction extends Action {

    constructor() {
        super(CLEAR_NOTIFICATION_ACTION_TYPE);
    }
    
    // This is the payload required by redux actions
    getRequest() {
        return {
            type: this.type,
            payload: {}
        };
    }
}
