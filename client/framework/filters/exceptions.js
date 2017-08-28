import template from 'es6-template-strings';

export function InvalidFilterException(filterType, filters) {
    this.name = "InvalidFilterException";
    
    let supportedFilters = Object
        .keys(filters)
        .join(", ");
    
    this.message = template(
        'The filter type "${filterType}" is invalid, the available filters are "${supportedFilters}"',
        {
            filterType,
            supportedFilters
        });
        
    this.stack = (new Error()).stack;
}

InvalidFilterException.prototype = Object.create(Error.prototype);
InvalidFilterException.prototype.constructor = InvalidFilterException;