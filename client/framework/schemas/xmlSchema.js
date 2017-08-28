import convert from "xml-js";
import ArgumentNullException from "framework/exceptions/argumentNullException";

/*
* Responsible for parsing json schemas
*/
export default class XmlSchema {

    constructor(schemaName, schemaXml) {
        
        if (schemaName == undefined) {
            throw new ArgumentNullException("XmlSchema.schemaName");
        }
        
        this.name = schemaName;
    }
   
    get name () {
        return this._name;
    }
    
    set name (value) {
        this._name = value;
    }
   
    parse(xml) {
        
        if (!xml) {
            throw new ArgumentNullException("XmlSchema.parse.xml");
        }
        
        let json = convert.xml2json(xml, {compact: false, spaces: 4});
        
        console.log("SCHEMA", json)
        
        return json;
    }
}