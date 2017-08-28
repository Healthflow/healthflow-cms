import React from 'react';
import { Layout } from 'antd';
const { Content } = Layout;

import './styles.scss';

const GridContent = (props) => {
    
    return (
      <Content>
        {props.children}
      </Content>  
    );
};

export default GridContent;