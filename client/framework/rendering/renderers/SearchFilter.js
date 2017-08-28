import React from 'react';
import {
    Input
}
from 'antd';
const Search = Input.Search;
import containsFilter from "framework/filters/containsFilter";
import _ from "lodash";

class SearchFilter extends React.Component {

    constructor(props) {
        super(props);
        
        let data = this.getDataFromProps(props) || [];
        
        this.state = {
            initialData: data,
            data
        };
    }

    getDataFromProps(props) {
        let data = props.data;
        
        if (props.dataSource.data && props.options.searchArray) {
            data = _.get(props.dataSource.data, props.options.searchArray);
        }
        
        return data;
    }

    handleSearch(value) {
        let filteredData = containsFilter({
            key: this.props.options.searchProperty,
            value,
            data: this.state.initialData
        });
        
        if (!value || value.length == 0) {
            this.props.dataSource.set(this.props.options.destination,  this.state.initialData);
        } else {
            this.props.dataSource.set(this.props.options.destination, filteredData);
        }
    }

    componentWillReceiveProps(nextProps) {
        
        let data = this.getDataFromProps(nextProps);
        
        let state = {
            data
        };
        
        if (!data) {
            return;
        }
        
        // This is required so that when new data is added to the source
        // the search is able to update its own internal state
        // and search through it.
        if (data.length > this.state.initialData.length) {
            state.initialData = data;
        }
        
        this.setState(state);
    }

    render() {
        
        let {
            className,
            style,
            placeholder
        } = this.props.options;

        return (
            <Search
                placeholder={placeholder}
                className={className}
                style={style}
                onSearch={this.handleSearch.bind(this)} />
        );
    }
}

export default SearchFilter;
