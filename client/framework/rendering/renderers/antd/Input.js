import React from 'react';
import {
    Input
}
from 'antd';

class AntDInput extends React.Component {

    render() {
        
        let {
            placeholder,
            className,
            style,
            tabIndex,
            size
        } = this.props.options;
        
        return (
            <Input 
                size={size}
                onChange={this.props.onChange}
                tabIndex={tabIndex}
                placeholder={placeholder}
                style={style} 
                className={className} />
        );
    }
}

export default AntDInput;