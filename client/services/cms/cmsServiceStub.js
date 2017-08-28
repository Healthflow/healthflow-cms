import Api from "framework/api/api";
import join from "framework/api/path";
import ArgumentNullException from "framework/exceptions/argumentNullException";
import JsonSchema from "framework/schemas/jsonSchema";
import JsonComponentSchemaValidator from "framework/schemas/jsonComponentSchemaValidator";
import JsonAjvSchemaValidator from "framework/schemas/jsonAjvSchemaValidator";
import routesSchema from "./routesSchema.json";

/*
* Response for the loading configuration from the CMS API, validate and parse it.
*/
export default class CMSServiceStub {
    
    constructor(apiBaseUrl) {
        
        if (!apiBaseUrl) {
            throw new ArgumentNullException("apiBaseUrl");
        }
        
        this.apiBaseUrl = apiBaseUrl;
        this.getRoutes = this.getRoutes.bind(this);
        this.getLayout = this.getLayout.bind(this);
    }
    
    get apiBaseUrl () {
        return this._apiBaseUrl;
    }
    
    set apiBaseUrl (value) {
        this._apiBaseUrl = value;
    }
    
    getRoutes() {
        let url = join(this.apiBaseUrl, "data/routes.json");
        return new Api().get(url, {}, (response) => {
            let validator = new JsonAjvSchemaValidator(routesSchema);
            let jsonSchema = new JsonSchema("Routes", validator, response.body);
            return jsonSchema.value.routes;
        });
    }
    
    getLayout() {
        let url = join(this.apiBaseUrl, "data/layout.json");
        return new Api().get(url, {}, (response) => {
            let jsonSchema = new JsonSchema("Layout",  new JsonComponentSchemaValidator(), response.body);
            return jsonSchema.value;
        });
    }
    
    getSchema(schemaUrl) {
        return new Api().get(schemaUrl, {},  (response) => {
            let jsonSchema = new JsonSchema(schemaUrl,  new JsonComponentSchemaValidator(), response.body);
            return jsonSchema.value;
        });
    }
}