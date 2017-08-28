import React from 'react';
import {
    Layout
}
from 'antd';

const Grid = (props) => {

    let {
        options: {
            className,
            style
        },
        children
    } = props;

    return (
        <Layout className={className} style={style} >
            {children}
        </Layout>
    );
};

export default Grid;
