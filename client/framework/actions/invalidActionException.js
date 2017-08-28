import template from 'es6-template-strings';

export default function InvalidActionException(actionType, actions) {
    this.name = "InvalidActionException";
    
    let supportedActions = Object
        .keys(actions)
        .join(", ");
    
    this.message = template(
        'The action type "${actionType}" is invalid, the available actions are "${supportedActions}"',
        {
            actionType,
            supportedActions
        });
        
    this.stack = (new Error()).stack;
}

InvalidActionException.prototype = Object.create(Error.prototype);
InvalidActionException.prototype.constructor = InvalidActionException;