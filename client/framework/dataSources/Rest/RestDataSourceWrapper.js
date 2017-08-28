import React from 'react';
import template from 'es6-template-strings';
import {
  connect
}
from 'react-redux';
import {
  setError
}
from 'store/sagas/app/appActions';
import {createFunction} from "framework/utils/function";
import _ from "lodash";
import { Spin } from 'antd';
import { HttpRequestAction } from "framework/actions/httpRequestAction";
import cloneWithDatasource from "../cloneWithDatasource";

/*
 * REST data source 
 */
class RestDataSourceWrapper extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {
            isLoading: true,
            data: null,
            dataSource: null
        };
    }

    componentDidMount() {
        
        let options = this.props.dataSource.options;
        
        this.props.sendHttpRequest({
            uri: this.props.uri, // get the formatted uri from props.
            verb: options.verb,
            params: options.params,
            headers: options.headers,
            path: options.path
        });
    }

    handleDataLoaded(data) {
        this.setState({
            isLoading: false,
            data
        });
    }

    handleErrorLoadingData(error) {
        let uri = this.props.uri;
        let verb = this.props.dataSource.options.verb;
        
        this.props.onException(`REST DataSource Unable To Load Data From URI '${uri}' With Verb '${verb}'`, error);
    }

    render() {
       // clone the current children and pass in extra props
        let children = null;
        let dataSource = {
            data: this.props.value
        };
        
        if (this.props.dataSource.options.transform) {
            let transformFunction = createFunction(this.props.dataSource.options.transform);
            dataSource.data = transformFunction(dataSource.data);
        }
        
        if (dataSource.data) {
            // IMPORTANT: You need to clone the datsource's props onto the children.
            // For example: when you have a form and an Ant Design select it needs 
            // the onChange handler to be passed down because the form fields
            // are wrapped in a decorator which tracks changes.
            children = cloneWithDatasource(this.props.children, dataSource, this.props);
        }
        
        let loadingMessage = this.props.dataSource.options.loadingMessage || "Loading, please wait...";
        
        return (
            <Spin style={{ "minWidth": "100%" }} spinning={this.props.isLoading} tip={loadingMessage}>
                {children}
            </Spin>
        );
    }
};

const formatUriWithState = (state, props) => {
    
    console.log("Props", props);
    
    if (props.uri) {
        return props.uri;
    }
    
    let uri = props.dataSource.options.uri;
    let formattedUri = props.dataSource.options.uri;
    let containsToken = uri.indexOf("${") !== -1;
    
    if (!containsToken) {
        return uri;
    }
    
    try {
        let tokenStart = uri.lastIndexOf("{") +1;
        let tokenEnd = uri.lastIndexOf("}");
        let path = uri.substring(tokenStart, tokenEnd);
        
        let result = _.get(state.app.data, path);

        if (!result) {
            return uri;
        }
        
        let data = {};
        _.set(data, path, result);
        
        formattedUri = template(uri, data);
        
    } catch(exception) {
        
    }
    
    return formattedUri;
};

const getHttpResponseFromState = (state, options) => {
    
    let props = {
        value: options.defaultValue,
        isLoading: false,
        isComplete: true
    };
    
    if (!options.path) {
        return props;
    }
    
    let result = _.get(state.app.data, options.path);

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

const mapStateToProps = (state, ownProps) => {
    return {
        uri: formatUriWithState(state, ownProps),
        ...getHttpResponseFromState(state, ownProps.dataSource.options)
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onException: (title, exception) => {
      dispatch(setError(title, exception.message, exception));
    },
    sendHttpRequest: (request) => {
        let action = new HttpRequestAction(request);
        dispatch(action.getRequest());
    }
  };
};

const RestDataSourceContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(RestDataSourceWrapper);

export default RestDataSourceContainer;

