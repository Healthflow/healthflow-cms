const sortAlphabetically = (options) => {
  var key = options.key;
  
  return function (a, b) {
    
    var valueA = a[key].toUpperCase(); // ignore upper and lowercase
    var valueB = b[key].toUpperCase(); // ignore upper and lowercase

    if (valueA < valueB) {
      return -1;
    }

    if (valueA > valueB) {
      return 1;
    }

    return 0;
  };
};

export default sortAlphabetically;