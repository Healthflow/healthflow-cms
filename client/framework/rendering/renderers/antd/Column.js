import React from 'react';
import {
    Col
}
from 'antd';

class AntDColumn extends React.Component {

    render() {

        let {
            options: {
                span,
                className,
                style
            },
            children
        } = this.props;

        return (
            <Col className={className} style={style} span={span}>
                { children }
            </Col>
        );
    }
}

export default AntDColumn;
