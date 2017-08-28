const loadSchemas = (schemaPaths, onSchemasLoaded) => {
    
    let schemasToFetch = [];
    let schemas = [];
    
    if (schemaPaths instanceof Array) { 
    
        let schemaCount = schemaPaths.length;
        for(let i = 0; i < schemaCount; i++) {
            let schema = schemaPaths[i];
            
            schemasToFetch.push(fetch(schema.path));
            
            schemas.push({
                name: schema.name,
                path: schema.path,
                data: null
            });
        }   
    }
    
    if (schemaPaths instanceof String) {
        schemasToFetch.push(fetch(schemaPaths));
        
        schemas.push({
            path: schemaPaths,
            data: null
        });
    }
    
    // load all the schemas and wait for them all to finish loading
    Promise.all(schemasToFetch)
        .then(convertResponsesToJson)
        .then(results => {
            
            // map the loaded schema json back to its schema object
            let schemasFetchedCount = schemas.length;
            for(let i = 0; i < schemasFetchedCount; i++) {
                let schemaResult = schemas[i];
                
                schemaResult.data = results[i];
            }
            
            // once all schemas are loaded and mapped, execute the callback
            onSchemasLoaded(schemas);
        })
        .catch(function(exception) {
            throw exception;
        });
};

const convertResponsesToJson = (responses) => {
    
    var jsonValues = [];

    responses.forEach(function (response) {
        jsonValues.push(response.json());// will convert to text
    });

    
    return Promise
        .all(jsonValues)
        .then(jsonValue => jsonValue);
};

export default loadSchemas;