import React from 'react';
import { Link } from 'react-router';

const HyperLink = (props) => {
    
    let {
      text,
      href
    } = props.options;
    
    return (
        <Link to={href}>
            {text}
        </Link> 
    );
};

export default HyperLink;