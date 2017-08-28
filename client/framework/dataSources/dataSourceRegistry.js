import RestDataSourceWrapper from "./Rest/RestDataSourceWrapper";
import ArrayDataSource from "./ArrayDataSource";
import StateDataSource from "./StateDataSource";
import { InvalidDataSourceException } from "./invalidDataSourceException";

const dataSources = {
    "rest": RestDataSourceWrapper,
    "array": ArrayDataSource,
    "state": StateDataSource
};

const getDataSource = function(dataSourceType) {

    let dataSource = dataSources[dataSourceType];
    
    if (!dataSource) {
        throw new InvalidDataSourceException(dataSourceType, dataSources);
    }

    return dataSource;
};

export default {
    get: getDataSource
};