export default function InternalServerErrorException(url, verb, data) {
    this.name = "InternalServerErrorException";
    this.message = `The endpoint at url: "${url}" and verb: "${verb}" returned a 500 internal server error status code`;
    this.data = data || null;
    this.stack = (new Error()).stack;
}

InternalServerErrorException.prototype = Object.create(Error.prototype);
InternalServerErrorException.prototype.constructor = InternalServerErrorException;