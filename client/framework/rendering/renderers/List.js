import React from 'react';

class List extends React.Component {

    render() {

        let {
            options: {
                className,
                style
            },
            children
        } = this.props;

        return (
            <ul className={className} style={style}>
                { children }
            </ul>
        );
    }
}

export default List;
