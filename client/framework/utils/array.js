/*
 * Get an array of keys from an array of objects
 * example: array = [{"someKey": "someValue"}] 
 *          key = "someKey"
 * returns: ["someKey"]
 */
export function getKeys(array, key) {
    let keys = [];
    let itemCount = array.length;
    for (let i = 0; i < itemCount; i++) {
        let item = array[i];
        let itemKey = item[key];
        if (itemKey) {
            keys.push(itemKey);
        }
    }
    return keys;
}

/*
* Get a property from an object using a path
* example:  object = { "foo": { "bar": "baz" } }
*           path = "foo.bar"
* returns:  "baz"
*/
export function getPath(object, path) {
    if (!path) {
        return null;
    }
    if (path.indexOf(".") == -1) {
        return object[path];
    }
    for (var i = 0, path = path.split('.'), length = path.length; i < length; i++) {
        object = object[path[i]];
    };
    return object;
};