import template from 'es6-template-strings';

export function InvalidDataSourceException(dataSourceType, dataSources) {
    this.name = "InvalidDataSourceException";
    
    let supportedDataSources = Object
        .keys(dataSources)
        .join(", ");
    
    this.message = template(
        'The data source type "${dataSourceType}" is invalid, the available data sources are "${supportedDataSources}"',
      {
        dataSourceType,
        supportedDataSources
      });
        
    this.stack = (new Error()).stack;
}

InvalidDataSourceException.prototype = Object.create(Error.prototype);
InvalidDataSourceException.prototype.constructor = InvalidDataSourceException;