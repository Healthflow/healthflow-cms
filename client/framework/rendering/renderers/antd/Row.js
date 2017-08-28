import React from 'react';
import {
    Row
}
from 'antd';

class AntDRow extends React.Component {

    render() {

        let {
            options: {
                className,
                style
            },
            children
        } = this.props;

        return (
            <Row className={className} style={style}>
                { children }
            </Row>
        );
    }
}

export default AntDRow;
