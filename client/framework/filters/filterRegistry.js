import containsFilter from './containsFilter';
import { InvalidFilterException} from './exceptions';

const filters = {
    'contains': containsFilter
};

const getFilter = function(filterType) {

    let filter = filters[filterType];
    
    if (!filter) {
        throw new InvalidFilterException(filterType, filters);
    }

    return filter;
};

export default {
    get: getFilter
};