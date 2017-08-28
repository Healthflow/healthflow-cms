import React from 'react';
import {
    Tag
}
from 'antd';

class AntDTag extends React.Component {

    render() {
        
        let {
            color,
            text
        } = this.props.options;
        
        return (
            <Tag color={color}>
                { text }
            </Tag>
        );
    }
}

export default AntDTag;