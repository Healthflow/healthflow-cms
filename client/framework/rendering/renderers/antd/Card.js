import React from 'react';
import {
    Card
}
from 'antd';

class AntDCard extends React.Component {

    render() {
        let {
            title,
            bordered,
            className,
            style
        } = this.props.options;

        return (
            <Card title={title} bordered={bordered} className={className} style={style}>
                { this.props.children }
            </Card>
        );
    }
}

export default AntDCard;
