import React from 'react';
import template from "es6-template-strings";

class Heading extends React.Component {

    render() {
        
        let {
            options: {
                className,
                style,
                text
            },
            children
        } = this.props;
        
        let hasChildren = (children && children.length > 0);
        let hasText = (text && text.length > 0);
        
        return (
            <h3 className={className} style={style}>
                { hasChildren && children }
                { hasText && text }
            </h3>
        );
    }
}

export default Heading;