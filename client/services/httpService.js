import 'es6-promise';
import store from 'store';
import ArgumentNullException from 'framework/exceptions/argumentNullException';
import Api from 'framework/api/api';

export default class HttpService {

    sendRequest(request) {
        
        let {
            uri,
            verb,
            params,
            headers
        } = request;
        
        if (!uri) {
            throw new ArgumentNullException("HttpService.request.uri");
        }
        
        return new Promise(function(resolve, reject) {
            
            let data = store.get(uri);
            
            if (data) {
                
                resolve(data);
                
            } else {
                
                new Api().get(uri, null, (response) => {
                    
                    store.set(uri, response.body);
                    
                    resolve(response.body);
                });
            }
        });
    }

}
