import React from 'react';
import {
    connect
}
from "react-redux";
import _ from "lodash";
import {
    Spin
}
from 'antd';
import {createFunction} from "framework/utils/function";
import cloneWithDatasource from "./cloneWithDatasource";
import ArgumentNullException from "framework/exceptions/argumentNullException";

class StateDataSource extends React.Component {

    /**
     * State data source is responsible mapping redux state
     * and passing that data down as props.
     * @constructor
     */
    constructor(props) {
        super(props);

        if (!props.dataSource) {
            throw new ArgumentNullException("StateDataSource.dataSource");
        }

        if (props.dataSource.options && !props.dataSource.options.path) {
            throw new ArgumentNullException("StateDataSource.dataSource.options.path");
        }
        
        if (props.dataSource.options && props.dataSource.options.defaultValue === undefined) {
            
            throw new ArgumentNullException("StateDataSource.dataSource.options.defaultValue");
        }
    }

    render() {

        let children = null;
        let dataSource = {
            data: this.props.value,
            isLoading: this.props.isLoading,
            isComplete: this.props.isComplete
        };
        
        if (this.props.dataSource.options.transform) {
            let transformFunction = createFunction(this.props.dataSource.options.transform);
            dataSource.data = transformFunction(dataSource.data);
        }
        
        if (dataSource.data !== undefined) {
            children = cloneWithDatasource(this.props.children, dataSource);
        }

        if (this.props.dataSource.options.showLoadingNotifcation) {
            
            let loadingMessage = this.props.dataSource.options.loadingMessage || "Loading, please wait...";
            
            return (
                <Spin style={{ "minWidth": "100%" }} spinning={this.props.isLoading} tip={loadingMessage}>
                    {children}
                </Spin>
            );
        }

        return children;
    }
}

/** 
 *   Responsible for finding action results in redux state
 *   by using the datasource.options.source value.
 */
const getDataFromState = (state, ownProps) => {
    
    let defaultValue = ownProps.dataSource.options.defaultValue;
    
    let props = {
        value: defaultValue,
        isLoading: false,
        isComplete: true
    };
    
    if (!ownProps.dataSource.options.path) {
        return props;
    }
    
    let result = _.get(state.app.data, ownProps.dataSource.options.path);

    if (!result) {
        return props;
    }
    
    props.value = result;
    
    if (result._status) {
        props.isLoading = result._status.inProgress || false;
        props.isComplete = result._status.isComplete || true;
    }
    
    return props;
};

const StateDataSourceContainer = connect(
    getDataFromState,
    null
)(StateDataSource);

export default StateDataSourceContainer;
