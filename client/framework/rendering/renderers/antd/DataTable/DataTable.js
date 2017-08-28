import React from 'react';
import {
    Table,
    Button
}
from 'antd';
import componentRenderer from "framework/rendering/componentRenderer";
import componentRegistry from 'framework/rendering/componentRegistry';
import sorterRegistry from 'framework/sorters/sorterRegistry';
import filterRegistry from 'framework/filters/filterRegistry';
import filterComponentRegistry from './filters/filterComponentRegistry';

import './styles.scss';

class DataTable extends React.Component {

    constructor(props) {
        super(props);

        this.state = this.getInitialState(props);
    }
    
    getInitialState(props) {
        
        console.log("DATATABLE PROPS", props);
        
        let state = {
            isLoading: true,
            filters: this.createColumnFilters(props.options.columns),
            sortedInfo: null,
            initialRows: props.dataSource.data || [],
            rows: props.dataSource.data || []
        };

        return state;
    }
    
    componentWillReceiveProps(nextProps) {
        
        console.log("DATATABLE NEXTPROPS", nextProps);
        
        this.setState({
            initialRows: nextProps.dataSource.data,
            rows: nextProps.dataSource.data
        });
    }

    createColumnFilters(columns) {
        
        let filters = [];
        let columnCount = columns.length;

        for (let columnIndex = 0; columnIndex < columnCount; columnIndex++) {
            let column = columns[columnIndex];

            if (!column.filter) {
                continue;
            }
            
            filters.push({
                name: column.name,
                filterType: column.filter.type,
                execute: filterRegistry.get(column.filter.type),
                options: column.filter.options,
                isVisible: false,
                value: null,
                render: filterComponentRegistry.get(column.filter.type)
            });
            
        }
        
        return filters;
    }
    
    getColumnFilter(columnName) {
        let filter = this.state.filters.find(f => f.name == columnName);
        return filter;
    }
    
    setColumnFilter(filter) {
        
        let filters = this.state.filters;
        let filterCount = filters.length;

        for (let i = 0; i < filterCount; i++) {
            
            if (filters[i].name != filter.name) {
                continue;
            }
            
            filters[i] = filter;
            break;
        }
        
        this.setState({
            filters
        });
    }
    
    createColumns(columnOptions) {
        let {
            sortedInfo
        } = this.state;
        
        sortedInfo = sortedInfo || {};

        let columns = [];
        let columnCount = columnOptions.length;

        for (let columnIndex = 0; columnIndex < columnCount; columnIndex++) {
            
            let options = columnOptions[columnIndex];
            let columnName = options.name;
            let column = {
                title: options.title,
                dataIndex: columnName,
                key: columnName
            };

            if (options.source.toLowerCase() == "static") {
                
                column.render = (text, row) => {
                    
                    let rowId = row[this.props.options.rowIdProperty];
                    let CellComponent = componentRenderer({
                        componentRegistry,
                        componentData: row,
                        componentSchema: options.component,
                        componentKeyParts: [rowId]
                    });
                    
                    return CellComponent;
                };
            }
            
            if (options.sorter) {
                
                column.sorter = sorterRegistry.get(options.sorter.type, {
                    key: columnName
                });
                column.sortOrder = sortedInfo.columnKey === columnName && sortedInfo.order;
            }

            if (options.filter) {
                
                let filter = this.state.filters.find(f => f.name == columnName);

                column.filterDropdown = filter.render({
                   key: `${this.props.key}_${columnName}_${filter.name}`,
                   name: filter.name,
                   options: filter.options,
                   value: filter.value,
                   onChange: this.handleFilterChanged.bind(this),
                   onSubmit: this.handleFilterSubmitted.bind(this)
                });
                
                column.filterDropdownVisible = this.getColumnFilter(columnName).isVisible;
                
                column.onFilterDropdownVisibleChange = (isVisible) => {
                    this.handleFilterVisibilityChanged(columnName, isVisible);
                };
            }

            columns.push(column);
        }
        
        return columns;
    }
    
    handleFilterVisibilityChanged(name, isVisible) {
        let filter = this.getColumnFilter(name);
        filter.isVisible = isVisible;
        this.setColumnFilter(filter);
    }
    
    handleFilterSubmitted(data) {
        let filter = this.getColumnFilter(data.name);
        let filteredRows = filter.execute({
            key: data.name,
            value: filter.value, 
            data: this.state.initialRows
        });
        
        this.setState({
            rows: filteredRows
        });
    }
    
    handleFilterChanged(data) {
        let filter = this.getColumnFilter(data.name);
        filter.value = data.value;
        this.setColumnFilter(filter);
    }
    
    handleChange = (pagination, filters, sorter) => {
        this.setState({
            filteredInfo: filters,
            sortedInfo: sorter
        });
    }

    clearFilters = () => {
        this.setState({
            filteredInfo: null,
            rows: this.state.initialRows
        });
    }

    clearSort = () => {
        this.setState({
            sortedInfo: null
        });
    }

    render() {
        
        let columns = this.createColumns(this.props.options.columns);
        
        return (
            <div>
                <div className="table-operations">
                  <Button onClick={this.clearFilters}>Clear Filters</Button>
                  <Button onClick={this.clearSort}>Clear Sort</Button>
                </div>
                    
                <Table 
                    columns={columns} 
                    dataSource={this.state.rows}
                    onChange={this.handleChange}
                    rowKey={this.props.options.rowIdProperty} />
           
            </div>
        );
    }
}

export default DataTable;