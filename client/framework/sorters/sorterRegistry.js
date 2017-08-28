import sortAlphabetically from './sortAlphabetically';
import { InvalidSorterException } from './exceptions';

const sorters = {
    'alphabetical': sortAlphabetically
};

const getSorter = function(sorterType, sorterOptions) {

    let sorter = sorters[sorterType];
    if (!sorter) {
        throw new InvalidSorterException(sorterType, sorters);
    }

    return sorter(sorterOptions);
};

export default {
    get: getSorter
};