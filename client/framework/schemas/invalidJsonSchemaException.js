export default function InvalidJsonSchemaException(schemaName, errorMessage, json) {
    this.name = "InvalidJsonSchemaException";
    this.message = `The schema "${schemaName}" was invalid, error: "${errorMessage}"`;
    this.data = json || null;
    this.stack = (new Error()).stack;
}

InvalidJsonSchemaException.prototype = Object.create(Error.prototype);
InvalidJsonSchemaException.prototype.constructor = InvalidJsonSchemaException;