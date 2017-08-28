import template from 'es6-template-strings';

export function InvalidRendererException(rendererType, renderers) {
    this.name = "InvalidRendererException";
    
    let supportedRendererNames = Object.keys(renderers);
    let supportedRenderers = supportedRendererNames.join(", ");
    
    this.message = template(
        'The renderer type "${rendererType}" is invalid, the available renderers are "${supportedRenderers}"',
      {
        rendererType: rendererType,
        supportedRenderers: supportedRenderers
      });
        
    this.stack = (new Error()).stack;
}

InvalidRendererException.prototype = Object.create(Error.prototype);
InvalidRendererException.prototype.constructor = InvalidRendererException;


export function InvalidTypeRendererException(dataType, primitiveType, primitiveRenderers) {
    this.name = "InvalidTypeRendererException";
    
    let supportedRendererNames = Object.keys(primitiveRenderers);
    let supportedRenderers = supportedRendererNames.join(", ");
    
    this.message = template(
        'The type "${dataType}" does not support the primitive renderer type "${primitiveType}", the available renderers are "${supportedRenderers}"', 
      {
        dataType: dataType,
        primitiveType: primitiveType,
        supportedRenderers: supportedRenderers
      });
        
    this.stack = (new Error()).stack;
}

InvalidTypeRendererException.prototype = Object.create(Error.prototype);
InvalidTypeRendererException.prototype.constructor = InvalidTypeRendererException;

export function InvalidValidationRuleException(validationRuleName, validationRules) {
    this.name = "InvalidValidationRuleException";
    
    let supportedValidationRules = Object
        .keys(validationRules)
        .join(", ");
    
    this.message = template(
        'The validation rule "${validationRuleName}" is invalid, the available validation rules are "${supportedValidationRules}"', 
      {
        validationRuleName: validationRuleName,
        supportedValidationRules: supportedValidationRules
      });
        
    this.stack = (new Error()).stack;
}

InvalidValidationRuleException.prototype = Object.create(Error.prototype);
InvalidValidationRuleException.prototype.constructor = InvalidValidationRuleException;

export function SchemaPropertyNotFoundException(propertyName, schemaName, schema) {
    this.name = "SchemaPropertyNotFoundException";
    
     let availableProperties = Object
        .keys(schema.properties)
        .join(", ");
  
    this.message = template(
        'Unable to find the property "${propertyName}" in the schema "${schemaName}", the available properties are "${availableProperties}"', 
      {
        propertyName,
        schemaName,
        availableProperties
      });
        
    this.stack = (new Error()).stack;
}

SchemaPropertyNotFoundException.prototype = Object.create(Error.prototype);
SchemaPropertyNotFoundException.prototype.constructor = SchemaPropertyNotFoundException;

export function ObjectPropertyNotFoundException(propertyName, objectName, object) {
    this.name = "ObjectPropertyNotFoundException";
    
     let availableProperties = Object
        .keys(Object.entries(object))
        .join(", ");
  
    this.message = template(
        'Unable to find the property "${propertyName}" in the object "${objectName}", the available properties are "${availableProperties}"', 
      {
        propertyName,
        objectName,
        availableProperties
      });
        
    this.stack = (new Error()).stack;
}

ObjectPropertyNotFoundException.prototype = Object.create(Error.prototype);
ObjectPropertyNotFoundException.prototype.constructor = ObjectPropertyNotFoundException;

export function FieldElementNotFoundException(fieldName, fieldElements) {
    this.name = "FieldElementNotFoundException";
    
    let availableFieldElements = Object
        .keys(fieldElements)
        .join(", ");
    
    this.message = template(
        'Unable to find field element for field "${fieldName}" is invalid, the field elements are "${availableFieldElements}"', 
      {
        fieldName,
        availableFieldElements
      });
        
    this.stack = (new Error()).stack;
}

FieldElementNotFoundException.prototype = Object.create(Error.prototype);
FieldElementNotFoundException.prototype.constructor = FieldElementNotFoundException;