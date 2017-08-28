import template from 'es6-template-strings';

export default function InvalidSetDataModeException(mode, modes) {
    this.name = "InvalidSetDataModeException";
    
    let supportedModes = Object
        .keys(modes)
        .join(", ");
    
    this.message = template(
        'The set mode "${mode}" is invalid, the available modes for setting data are "${supportedModes}"',
        {
            mode,
            supportedModes
        });
        
    this.stack = (new Error()).stack;
}

InvalidSetDataModeException.prototype = Object.create(Error.prototype);
InvalidSetDataModeException.prototype.constructor = InvalidSetDataModeException;