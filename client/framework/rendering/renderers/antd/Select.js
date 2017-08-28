import React from 'react';
import {
    Select
}
from 'antd';
const Option = Select.Option;
import ArgumentNullException from 'framework/exceptions/argumentNullException';

class AntDSelect extends React.Component {

    render() {

        let {
            placeholder,
            className,
            style,
            tabIndex,
            showSearch,
            textProperty,
            valueProperty,
            filterProperty
        } = this.props.options;

        let items = this.props.dataSource.data;
        let itemCount = items.length;
        let itemElements = [];
        for (let i = 0; i < itemCount; i++) {
            let item = items[i];

            if (!textProperty in item) {
                throw new ArgumentNullException("Select.item.textProperty");
            }
            
            let text = item[textProperty];
            
            if (!valueProperty in item) {
                throw new ArgumentNullException("Select.item.valueProperty");
            }

            let itemKey = `item_${text}_${i}`;

            let itemElement = (
                <Option key={itemKey} value={item[valueProperty]}>{item[textProperty]}</Option>
            );
            
            itemElements.push(itemElement);
        }
        
        return (
            <Select
                showSearch={showSearch}
                onChange={this.props.onChange}
                tabIndex={tabIndex}
                placeholder={placeholder}
                style={style} 
                className={className}
                optionFilterProp={filterProperty}
                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
              >
                
                {itemElements}
              </Select>
        );
    }
}

export default AntDSelect;
