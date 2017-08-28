export default function NotFoundException(url, verb) {
    this.name = "NotFoundException";
    this.message = `The endpoint at url: "${url}" and verb: "${verb}" returned a 404 not found status code`;
    this.stack = (new Error()).stack;
}

NotFoundException.prototype = Object.create(Error.prototype);
NotFoundException.prototype.constructor = NotFoundException;