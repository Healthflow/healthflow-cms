import template from 'es6-template-strings';

export function InvalidFilterComponentException(filterType, filterComponents) {
    this.name = "InvalidFilterComponentException";
    
    let supportedFilterComponents = Object
        .keys(filterComponents)
        .join(", ");
    
    this.message = template(
        'The filter component type "${filterType}" is invalid, the available filter components are "${supportedFilterComponents}"',
        {
            filterType,
            supportedFilterComponents
        });
        
    this.stack = (new Error()).stack;
}

InvalidFilterComponentException.prototype = Object.create(Error.prototype);
InvalidFilterComponentException.prototype.constructor = InvalidFilterComponentException;