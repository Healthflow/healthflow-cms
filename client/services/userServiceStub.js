import 'es6-promise';
import store from 'store';
import ArgumentNullException from 'framework/exceptions/argumentNullException';
import join from 'framework/api/path';
import Api from 'framework/api/api';

export default class UserService {

    constructor(apiBaseUrl) {

        if (!apiBaseUrl) {
            throw new ArgumentNullException("apiBaseUrl");
        }

        this.apiBaseUrl = apiBaseUrl;
        this.getPreferences = this.getPreferences.bind(this);
    }

    get apiBaseUrl() {
        return this._apiBaseUrl;
    }

    set apiBaseUrl(value) {
        this._apiBaseUrl = value;
    }

    login(username, password) {

        return new Promise(function(resolve, reject) {

            var response = (username == password) ? {
                    username: username,
                    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwicm9sZXMiOlsiY3JlYXRvciJdfQ.Kfj6VO04Vg-XG-Tt7GEjFUPI-waYmV_F6pdsacVGOSc"
                } :
                "bad_password";

            // Token structure
            // {
            // "sub": "1234567890",
            // "name": "John Doe",
            // "roles": ["creator"]
            // }

            resolve(response);
        });
    };

    setPreference(name, value) {

        return new Promise(function(resolve, reject) {

            // fake save preference to API...
            setTimeout(function() {

                let preferences = store.get('preferences');

                if (preferences) {
                    preferences[name] = value;
                }

                store.set('preferences', preferences);

                resolve(preferences);

            }, 300);
        });
    }

    getPreferences() {

        let self = this;

        return new Promise(function(resolve, reject) {

            let preferences = store.get('preferences');

            if (preferences) {
                
                resolve(preferences);
                return;
            }

            let url = join(self.apiBaseUrl, "/data/preferences.json");

            new Api().get(url, null, (response) => {
                preferences = response.body;
                
               store.set('preferences', preferences);
               
               resolve(preferences);
            });
        });
    }

}
