import 'babel-polyfill'
import assert from 'assert';
import {
  APPEND,
  OVERWRITE_IF_EXISTS,
  setObjectProperty,
  removeObjectProperty
}
from "../../client/framework/utils/object";


describe('object', function() {
  describe('#setObjectProperty', function() {

    it('should overwrite property value in object when action mode is "overwrite"', function() {

      let object = {
        data: {
          items: []
        }
      };

      let action = {
        path: "data.items",
        mode: OVERWRITE_IF_EXISTS,
        data: "test"
      };

      let newObject = setObjectProperty(object, action);

      assert.equal(newObject.data.items, "test");
    });

    it('should create property value in object when it does not exist and action mode is "overwrite"', function() {

      let object = {
        data: {
          item: {}
        }
      };

      let action = {
        path: "data.item.something",
        mode: OVERWRITE_IF_EXISTS,
        data: "test1"
      };

      let newObject = setObjectProperty(object, action);

      assert.equal(newObject.data.item.something, "test1");
    });

    it('should create property at path in object when it does not exist and action mode is "overwrite"', function() {

      let object = {
        data: {
          item: {}
        }
      };

      let action = {
        path: "data.item.something.somethingElse",
        mode: OVERWRITE_IF_EXISTS,
        data: "test2"
      };

      let newObject = setObjectProperty(object, action);

      assert.equal(newObject.data.item.something.somethingElse, "test2");
    });

    it('should append data to array in object when action mode is "append"', function() {

      let object = {
        data: {
          items: ["test2"]
        }
      };

      let action = {
        path: "data.items",
        mode: APPEND,
        data: "test3"
      };

      let newObject = setObjectProperty(object, action);

      assert.equal(newObject.data.items[0], "test2");
      assert.equal(newObject.data.items[1], "test3");

    });

    it('should concatenate string in object when action mode is "append"', function() {

      let object = {
        data: {
          item: "foo"
        }
      };

      let action = {
        path: "data.item",
        mode: APPEND,
        data: "bar"
      };

      let newObject = setObjectProperty(object, action);

      assert.equal(newObject.data.item, "foobar");

    });

  });


  describe('#removeObjectProperty', function() {

    it('should ignore property if it does not exist in object', function() {

      let object = {
        data: {
          item: { test: "test" }
        }
      };

      let newObject = removeObjectProperty(object, "data.item.something");

      assert.equal(newObject.data.item.test, "test");
    
    });

    it('should ignore property at path not the entire path in object', function() {

      let object = {
        data: {
          item: {
            alphabet: {
              a: "A",
              b: {
                c: "C"
              }
            }
          }
        }
      };

      let newObject = removeObjectProperty(object, "data.item.alphabet.b");

      assert.equal(newObject.data.item.alphabet.a, "A");
      assert.equal(newObject.data.item.alphabet.b, undefined);
    });
  
    it('should remove property from object', function() {

      let object = {
        data: {
          items: []
        }
      };

      let newObject = removeObjectProperty(object, "data.items");

      assert.equal(newObject.data.items, undefined);
    });

  });
});
