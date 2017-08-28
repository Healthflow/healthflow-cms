import React from 'react';
import cloneWithDatasource from "./cloneWithDatasource";
import ArgumentNullException from "framework/exceptions/argumentNullException";

/*
 * Array data source is responsible for taking
 * static array specific in the component options and
 * passing that data down as props.
 */
class ArrayDataSource extends React.Component {

    constructor(props) {
        super(props);
        
        if (!props.dataSource) {
            throw new ArgumentNullException("ArrayDataSource.dataSource");
        }
        
        if (!props.dataSource.options) {
            throw new ArgumentNullException("ArrayDataSource.dataSource.options");
        }
        
        if (!props.dataSource.options.data) {
            throw new ArgumentNullException("ArrayDataSource.dataSource.options.data");
        }
    }
    
    render() {
        let dataSource = {
            data: this.props.data,
            set: () => {}  
        };

        return cloneWithDatasource(this.props.children, dataSource);
    }
}

export default ArrayDataSource;