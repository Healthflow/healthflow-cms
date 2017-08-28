import { getKeys } from "framework/utils/array";

export default function InvalidLanguageException(language, languages) {
    this.name = "InvalidLanguageException";
    
    let supportedLanguages = getKeys(languages, "value").join(", ");
    
    this.message = `The language "${language}" is not supported, the available languages are "${supportedLanguages}"`;
    
    this.stack = (new Error()).stack;
}

InvalidLanguageException.prototype = Object.create(Error.prototype);
InvalidLanguageException.prototype.constructor = InvalidLanguageException;