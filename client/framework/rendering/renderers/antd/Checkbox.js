import React from 'react';
import {
    Checkbox
}
from 'antd';

class AntDCheckbox extends React.Component {

    render() {
        
        let {
            style,
            text
        } = this.props.options;
        
        let hasChildren = (this.props.children && this.props.children.length > 0);
        let hasText = (text != undefined);
        
        return (
            <Checkbox 
                style={style}
                onChange={this.props.onChange}>
                { hasText && text }
                { hasChildren && this.props.children }
            </Checkbox>
        );
    }
}

export default AntDCheckbox;