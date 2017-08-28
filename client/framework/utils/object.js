import assign from 'object-assign';
import _ from "lodash";

export const OVERWRITE_IF_EXISTS = "overwrite";
export const APPEND = "append";

export const setObjectProperty = (object, action) => {
    
    let {
        path, 
        data,
        mode
    } = action;
    
    let clonedObject = _.cloneDeep(object);
    let propertyValue = _.get(clonedObject, path);
    
    if (mode == OVERWRITE_IF_EXISTS) {
        propertyValue = data;
            
        _.set(clonedObject, path, propertyValue);
    }
    
    if (mode == APPEND &&
        propertyValue instanceof Array) {
            
        propertyValue.push(data);
    }
    
    if (mode == APPEND &&
        typeof propertyValue == 'string' ||
        propertyValue instanceof String) {
        
        let newPropertyValue = propertyValue + data;
        _.set(clonedObject, path, newPropertyValue);
    }
    
    return clonedObject;
};

export const removeObjectProperty = (object, path) => {
    let clonedObject = _.cloneDeep(object);
    let omittedObject = _.omit(clonedObject, path);

    return omittedObject;
};
