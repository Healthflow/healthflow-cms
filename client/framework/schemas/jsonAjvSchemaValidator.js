import Ajv from 'ajv';
import ArgumentNullException from 'framework/exceptions/argumentNullException';
import InvalidJsonSchemaException from './invalidJsonSchemaException';

/*
 * Responsible for validating JSON component schemas using the AJV library
 */
export default class JsonAjvSchemaValidator {
    
     constructor(schema) {
        
        if (!schema) {
            throw new ArgumentNullException("JsonAjvSchemaValidator.constructor.schema");
        }
        
        this.schema = schema;
    }
    
    get schema () {
        return this._schema;
    }
    
    set schema (value) {
        this._schema = value;
    }
    
    validate(schemaName, jsonSchema) {
        
        if (!schemaName) {
            throw new ArgumentNullException("JsonAjvSchemaValidator.validate.schemaName");
        }
        
        if (!jsonSchema) {
            throw new ArgumentNullException("JsonAjvSchemaValidator.validate.jsonSchema");
        }
        
        let schemaValidator = new Ajv();
        schemaValidator.compile(this.schema);
    
        let isSchemaValid = schemaValidator.validate(jsonSchema);
    
        if (!isSchemaValid) {
            throw new InvalidJsonSchemaException(
                schemaName,
                schemaValidator.errorsText(),
                jsonSchema);
        }

        return jsonSchema;
    }
}
