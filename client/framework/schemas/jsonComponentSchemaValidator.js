import ArgumentNullException from 'framework/exceptions/argumentNullException';
import InvalidJsonSchemaException from './invalidJsonSchemaException';

/*
 * Responsible for validating JSON component schemas
 */
export default class JsonComponentSchemaValidator {

    get schemaName () {
        return this._schemaName;
    }
    
    set schemaName (value) {
        this._schemaName = value;
    }

    validate(schemaName, jsonSchema) {
        
        if (!schemaName) {
            throw new ArgumentNullException("JsonComponentSchemaValidator.validate.schemaName");
        }
        
        if (!jsonSchema) {
            throw new ArgumentNullException("JsonComponentSchemaValidator.validate.jsonSchema");
        }
        
        if (!jsonSchema.component) {
            throw new InvalidJsonSchemaException(
                schemaName,
                "The schema must contain a 'component' property at the root level",
                jsonSchema);
        }
        
        this.schemaName = schemaName;
        this.validateComponent(jsonSchema.component);
    }

    validateComponent(component) {

        if (!component.componentType) {
            throw new InvalidJsonSchemaException(
                this.schemaName,
                "The component must have a 'componentType' property",
                component);
        }

        this.validateComponentProperties(component);
        
        this.validateComponentOptions(component);
        
        this.validateComponentDataSource(component);
        
        this.validateComponentChildren(component);
    }
    
    validateComponentOptions(component) {
        if (component.options && (component.options instanceof Object) == false) {
            throw new InvalidJsonSchemaException(
                this.schemaName,
                `The component with componentType '${component.componentType}' has invalid property, the property 'options' must be an object`,
                component);
        }
    }
    
    validateComponentDataSource(component) {
        
        // dataSource is optional
        if (!component.dataSource) {
            return;
        }
        
        if ((component.dataSource instanceof Object) == false) {
            throw new InvalidJsonSchemaException(
                this.schemaName,
                `The component with componentType '${component.componentType}' has invalid property, the property 'dataSource' must be an object`,
                component);
        }
        
        if (!component.dataSource.type) {
            throw new InvalidJsonSchemaException(
                this.schemaName,
                `The with componentType '${component.componentType}'s dataSource must have a type 'property'`,
                component);
        }
        
        let legalProperties = [
            "type",
            "options"
        ];
        
        for (let propertyName in component.dataSource) {
            let isPropertyLegal = legalProperties.indexOf(propertyName) > -1;
            
            if (isPropertyLegal) {
                continue;
            }
            
            throw new InvalidJsonSchemaException(
                this.schemaName,
                `The component with componentType '${component.componentType}' and dataSource of type '${component.dataSource.type}' has an illegal property '${propertyName}', custom dataSource properties must be put in the 'options' property`,
                component);
        }
    }
    
    validateComponentChildren(component) {
        
        // children are optional
        if(!component.children) {
            return;
        }
        
        if ((component.children instanceof Array) == false) {
            throw new InvalidJsonSchemaException(
                this.schemaName,
                `The component with componentType '${component.componentType}' has invalid property, the property 'children' must be an array`,
                component);
        }
        
        let childCount = component.children.length;
        
        for(let i = 0; i < childCount; i++) {
            this.validateComponent(component.children[i]);
        }
    }
    
    validateComponentProperties(component) {
        
        let legalProperties = [
            "componentType",
            "options",
            "dataSource",
            "children"
        ];
        
        for (let propertyName in component) {
            let isPropertyLegal = legalProperties.indexOf(propertyName) > -1;
            
            if (isPropertyLegal) {
                continue;
            }
            
            throw new InvalidJsonSchemaException(
                this.schemaName,
                `The component with componentType '${component.componentType}' has an illegal property '${propertyName}', custom component properties must be put in the 'options' property`,
                component);
        }
    }
}
