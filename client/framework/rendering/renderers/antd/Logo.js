import React from 'react';

const Logo = (props) => {
    
     if (!props) {
        return null;
    }
    
    let {
        url,
        style
    } = props;
    
    return (
        <span className="logo-container">
            <img src={url} style={{...style}} />
        </span>
    );
}

export default Logo;