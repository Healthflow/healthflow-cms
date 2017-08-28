import template from "es6-template-strings";

// Formats object with parameter values from another object
// i.e. object { "href": "/patients/${nhsNumber}/view" }
//      data { "nhsNumber": "CA23455GX1" }
// returns { "href": "/patients/CA23455GX1/view" }
export const formatObject = (object, data) => {
    let formattedObject = {};

    for(let [key, value] of Object.entries(object)) {
        
        if (typeof value != "string") {
            formattedObject[key] = value;
            continue;
        }
        
        if (value == "${item}") {
            formattedObject[key] = data;
            continue;
        }
        
        try {
            formattedObject[key] = template(value, data);
        } catch(exception) {
            formattedObject[key] = value;
        }
    }
    return formattedObject;
};