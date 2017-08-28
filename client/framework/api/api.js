import ApiResponse from './apiResponse';
import HttpException from './httpException';
import NotFoundException from './notFoundException';
import InternalServerErrorException from './internalServerErrorException';
import ResponseParsingException from "./responseParsingException";

const GET_VERB = "get";
const DEFAULT_HEADERS = {
    "content-type": "application/json"
};

export default class Api {
    
    /*
    * url:          the url to get can be fully qualified or relative.
    * headers:      a Header object
    * onSuccess:    a callback funciton which is used to perform a final
    *               transformation of the response before returing data.
    * notes:        if the response status code is not in the 200 range
    *               an exception will be thrown.
    */
    get(url, options, onSuccess) {
        
        if (!options) {
            options = {};
        }
        
        
        let request = new Request(url, {
        	method:  GET_VERB,
        	headers: new Headers({
        		...DEFAULT_HEADERS,
        		...options.headers
        	})
        });
        
        return fetch(request)
            .then(response => {
                
                if (response.ok) {
                    return response;
                }
            
                if (response.status == 404) {
                    throw new NotFoundException(url, GET_VERB);
                }
                
                if (response.status == 500) {
                    throw new InternalServerErrorException(url, GET_VERB, response);
                }
                
                throw new HttpException(url, GET_VERB, response.status, response);
            })
            .then(function(response) { 
                return options.contentType == "xml" ?
                    response.text() :
                    response.json();
            })
            .then(function(json) {
                let response = new ApiResponse(json);
                
                 if (onSuccess) {
                    return onSuccess(response);
                }
                
            	return response;
            })
            .catch(function (exception) {
                throw new ResponseParsingException(url, GET_VERB, exception);
            });
    }
}