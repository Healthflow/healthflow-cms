import React from "react";
import componentRenderer from "framework/rendering/componentRenderer";
import componentRegistry from "framework/rendering/componentRegistry";

class DynamicComponent extends React.Component {
    
    render() {

        if (!this.props.schema) {
            return null;
        }
        
        return componentRenderer({
            componentRegistry,
            componentData: {},
            componentSchema: this.props.schema,
            componentKeyParts: []
        });
    }
}

export default DynamicComponent;