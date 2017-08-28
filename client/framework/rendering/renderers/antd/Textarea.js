import React from 'react';
import {
    Input
}
from 'antd';

class AntDTextarea extends React.Component {

    render() {
        
        let {
            rows,
            placeholder,
            className,
            style,
            tabIndex,
            size
        } = this.props.options;
        
        return (
            <Input 
                type="textarea" 
                rows={rows || 5}
                size={size}
                onChange={this.props.onChange}
                tabIndex={tabIndex}
                placeholder={placeholder}
                style={style} 
                className={className} />
        );
    }
}

export default AntDTextarea;