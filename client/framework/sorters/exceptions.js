import template from 'es6-template-strings';

export function InvalidSorterException(sorterType, sorters) {
    this.name = "InvalidSorterException";
    
    let supportedSorters = Object
        .keys(sorters)
        .join(", ");
    
    this.message = template(
        'The sorter type "${sorterType}" is invalid, the available sorters are "${supportedSorters}"',
      {
        sorterType,
        supportedSorters
      });
        
    this.stack = (new Error()).stack;
}

InvalidSorterException.prototype = Object.create(Error.prototype);
InvalidSorterException.prototype.constructor = InvalidSorterException;