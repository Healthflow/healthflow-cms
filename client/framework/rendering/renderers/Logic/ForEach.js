import React from 'react';
import assign from 'object-assign';
import componentRenderer from "framework/rendering/componentRenderer";
import componentRegistry from "framework/rendering/componentRegistry";
import { formatObject } from "framework/utils/format";
import { getPath } from "framework/utils/array";

class ForEach extends React.Component {

    render() {
        
        let {
            dataSource,
            options: {
                array,
                containerComponent,
                itemComponent
            }
        } = this.props;
        
        let Container = componentRegistry.get(containerComponent.componentType);
        
        if (!dataSource.data) {
            return <Container options={containerComponent.options} />;
        }
        
        let items = getPath(dataSource.data, array);
        
        if (!items) {
            return <Container options={containerComponent.options} />;
        }
        
        let children = [];
        let length = items.length;
        for(let i = 0; i < length; i++) {
            let item = items[i];
            
            // clone the item component schema and
            // merge in the formatted options
            let schema = assign({}, itemComponent, {
                options: formatObject(itemComponent.options, item)
            });
            
            // render the item component
            let component = componentRenderer({
                componentRegistry,
                componentData: item,
                componentSchema: schema,
                componentKeyParts: [i]
            });
            
            children.push(component);
        }
        
        return (
            <Container options={containerComponent.options}>
                {children}
                {this.props.children}
            </Container>
        );
    }
}

export default ForEach;