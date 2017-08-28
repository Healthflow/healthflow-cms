import ArgumentNullException from 'framework/exceptions/argumentNullException';

/*
* Responsible for parsing json schemas
*/
export default class JsonSchema {

    constructor(schemaName, validator, json) {
        
        if (!schemaName) {
            throw new ArgumentNullException("JsonSchema.constructor.schemaName");
        }   
        
        if (!validator) {
            throw new ArgumentNullException("JsonSchema.constructor.schemaJson");
        }
        
        if (!json) {
            throw new ArgumentNullException("JsonSchema.constructor.json");
        }
        
        this.schemaName = schemaName;
        this.validator = validator;
        this.value = json;
        
        validator.validate(schemaName, json);
    }
    
    get value () {
        return this._value;
    }
    
    set value (value) {
        this._value = value;
    }
    
    get schema () {
        return this._schema;
    }
    
    set schema (value) {
        this._schema = value;
    }
    
    get validator () {
        return this._validator;
    }
    
    set validator (value) {
        this._validator = value;
    }
}