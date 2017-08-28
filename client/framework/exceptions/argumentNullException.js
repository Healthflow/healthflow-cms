export default function ArgumentNullException(argumentName) {
    this.name = "ArgumentNullException";
    this.message = `The argument "${argumentName}" is null`;
    this.stack = (new Error()).stack;
}

ArgumentNullException.prototype = Object.create(Error.prototype);
ArgumentNullException.prototype.constructor = ArgumentNullException;