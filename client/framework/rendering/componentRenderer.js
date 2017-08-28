import React from "react";
import hash from "object-hash";
import dataSourceRegistry from "framework/dataSources/dataSourceRegistry";
import ArgumentNullException from "framework/exceptions/argumentNullException";
import {CloneWithProps} from "framework/utils/react";

const componentRenderer = (componentConfig) => {
    //console.time("Rendering component: " + componentConfig.componentSchema.componentType);
    
    if (!componentConfig.componentSchema) {
        throw new ArgumentNullException("componentRenderer.componentConfig.componentSchema");
    }
    
    let component = getComponent(componentConfig);
    
    //console.timeEnd("Rendering component: " + componentConfig.componentSchema.componentType);
    
    return component;
};

// Recursive function which walks the layout tree, 
// getting all components and their children
const getComponent = (componentConfig) => {
    
    let {
        componentRegistry,
        componentSchema,
        componentData,
        componentProps = {},
        componentKeyParts = [],
    } = componentConfig;
    // test
    
    let {
        componentType,
        options = {},
        dataSource,
        children
    } = componentSchema;
    
    // 1.   create component key
    let key = createKey(componentType, componentSchema, componentKeyParts);
    
    // 2.   this is to handle child pages pushed in via routing.
    if (componentType == "grid-content") {
        return CloneWithProps(componentData.children, { key });
    }

    // 3.   render the components child components
    let childElements = [];
    let childCount = children.length;
    for (let childIndex = 0; childIndex < childCount; childIndex++) {
        let childElement = getComponent({
            componentRegistry,
            componentKeyParts,
            componentData,
            componentSchema: children[childIndex]
        });
        childElements.push(childElement);
    }
    
    // 4.   render the component
    let ParentComponent = componentRegistry.get(componentType);
    
    let component = (
        <ParentComponent key={key} data={componentData} options={options} {...componentProps}>
            { childCount > 0 && childElements }
        </ParentComponent>
    );
    
    // 5.   if the component has a data source then
    //      then wrap the component in the datasource
    if (dataSource) {
        let DataSourceComponent = dataSourceRegistry.get(dataSource.type, dataSource.options);
        let dataSourceKey = `${key}_datasource`;
        return (
            <DataSourceComponent key={dataSourceKey} dataSource={dataSource}>
                {component}
            </DataSourceComponent>
        );
    }
    
    return component;
};

const createKey = (componentType, componentSchema, componentKeyParts) => {
    let hashedSuffix = hash({
        componentSchema,
        componentKeyParts
    });
    return `${componentType}_${hashedSuffix}`;
};

export default componentRenderer;
