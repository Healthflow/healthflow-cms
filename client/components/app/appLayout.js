import React from 'react';
import componentRegistry from 'framework/rendering/componentRegistry';
import componentRenderer from 'framework/rendering/componentRenderer';

class AppLayout extends React.Component {
    
    render () {
        
        return componentRenderer({
            componentRegistry,
            componentData: {
                children: this.props.children
            },
            componentSchema: this.props.layout.component,
            componentKeyParts: []
        });
    }
}

export default AppLayout;
