import React from 'react';
import {
    Layout
}
from 'antd';
const {
    Sider
} = Layout;

import './styles.scss';

class GridSidebar extends React.Component {

    onCollapse(collapsed) {
        
        this.props.dataSource.set(null, collapsed);
    }

    render() {

        let {
            options: {
                className,
                style,
                collapsible
            },
            children
        } = this.props;

        let isCollapsed = this.props.dataSource.data;
        let mode = isCollapsed ? 'vertical' : 'inline';
        
        const childrenWithProps = React.Children.map(children,
            (child) => React.cloneElement(child, {
                mode
            })
        );
        
        return (
            <Sider
                collapsible={collapsible}
                className={className}
                style={style}
                collapsed={isCollapsed}
                onCollapse={this.onCollapse.bind(this)}>
              
              {childrenWithProps}
            
            </Sider>
        );
    }
};

export default GridSidebar;
