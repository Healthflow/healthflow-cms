import React from 'react';

const Container = (props) => {

    let {
        children,
        options: {
            html,
            className,
            style
        }
    } = props;
    
    let hasHtml = (html && html.length > 0);

    if (hasHtml) {
        return <div 
            className={className} 
            style={style} 
            dangerouslySetInnerHTML={createHtml(html)} />;
    }
    
    return (
        <div className={className} style={{...style}}>
            {children}
        </div>
    );
    
};

const createHtml = (html) => {
    return {
        __html: html
    };
};
    
export default Container;
