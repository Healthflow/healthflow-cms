import React from 'react';

const Label = (props) => {
    
    let {
        text,
        className,
        style
    } = props.options;
    
    return (
        <label className={className} style={{...style}}>
            {text}
        </label>
    );
};

export default Label;