import React from 'react';
class ListItem extends React.Component {

    render() {

        let {
            options: {
                className,
                style,
                html
            },
            children
        } = this.props;

        let hasChildren = (children && children.length > 0);
        let hasHtml = (html && html.length > 0);

        if (hasHtml) {
            return <li 
                className={className} 
                style={style} 
                dangerouslySetInnerHTML={this.createHtml(html)} />;
        }

        return (
            <li className={className} style={style}>
                { hasChildren && children  }
            </li>
        );
    }

    createHtml(html) {
        return {
            __html: html
        };
    }
}

export default ListItem;
