export default function ResponseParsingException(url, verb, innerException) {
    this.name = "ResponseParsingException";
    this.message = `An exception occurred while parsing the response from the endpoint at url: "${url}" and verb: "${verb}", error: ${innerException.message}`;
    this.innerException = innerException;
    this.stack = (new Error()).stack;
}

ResponseParsingException.prototype = Object.create(Error.prototype);
ResponseParsingException.prototype.constructor = ResponseParsingException;