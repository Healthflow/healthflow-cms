 /*
 * Create a javascript function from string
 * example:     functionString = "return data.isVisible == true"
 * returns:     function(data) { return data.isVisible == true; }
 */ 
 export const createFunction = (functionString) => {

     if (!functionString) {
         return null;
     }

     try {
         return new Function("data", functionString);
     }
     catch (error) {
        
     }

     return null;
 };
 