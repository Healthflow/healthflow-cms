export default function HttpException(url, verb, statusCode, data) {
    this.name = "HTTP Exception";
    this.message = `The endpoint at url: "${url}" and verb: "${verb}" returned a "${statusCode}" status code`;
    this.data = data || null;
    this.stack = (new Error()).stack;
}

HttpException.prototype = Object.create(Error.prototype);
HttpException.prototype.constructor = HttpException;