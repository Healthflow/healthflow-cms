import React from 'react';
import { Layout } from 'antd';
const { Footer } = Layout;

const GridFooter = (props) => {
    
    return (
      <Footer>
        {props.children}
      </Footer>  
    );
};

export default GridFooter;