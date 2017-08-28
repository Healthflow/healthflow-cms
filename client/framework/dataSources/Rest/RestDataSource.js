import ArgumentNullException from "framework/exceptions/argumentNullException";

class RestDataSource {

    constructor(options) {
        this.options = options;

        if (!options.uri) {
            throw new ArgumentNullException("EventRestDataSource.options.uri");
        }

        if (!options.verb) {
            throw new ArgumentNullException("EventRestDataSource.options.verb");
        }
    }

    get options() {
        return this._options;
    }

    set options(value) {
        this._options = value;
    }

    getData(onSuccess, onError) {

        let {
            verb,
            uri,
            data
        } = this.options;

        let request = {
            method: verb,
            headers: new Headers()
        };

        if (verb.toLowerCase() == "post") {
            request.data = data || {};
        }

        fetch(uri, request)
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
                onSuccess(data);
            })
            .catch(function(error) {
                onError(error);
            });
    }
}

export default RestDataSource;