import ContainsFilter from './ContainsFilter';
import { InvalidFilterComponentException} from './exceptions';

const filters = {
    'contains': ContainsFilter
};

const getFilterComponent = function(filterType) {

    let filterComponent = filters[filterType];
    
    if (!filterComponent) {
        throw new InvalidFilterComponentException(filterType, filters);
    }

    return filterComponent;
};

export default {
    get: getFilterComponent
};