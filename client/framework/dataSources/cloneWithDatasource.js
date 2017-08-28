import React from "react";
import {formatObject} from "framework/utils/format";
/**
 * Clone the children or single child 
 * maintaining the original props and
 * appending the data source.
 * @param {?*} children Children of a react element, typically specified as `props.children`.
 * @param {Object} dataSource Data that will be formatted and passed to the children.
 * @param {Object} props These are extra props that you want to pass down to the children.
 * @return {Object} Clones of the children.
 */
export default function cloneWithDataSource(children, dataSource, props = {}) {
    // handle multiple children
    if ( children == null || Array.isArray(children)) {
        return React.Children.map( children, function( child ) {
            let options = child.props.options;
            if (dataSource.data && options) {
                options = formatObject(options, dataSource.data);
            }
            
            return React.cloneElement( child, {
                ...props,
                ...child.props,
                options,
                dataSource
            });
        });
    }
    
    // handle a single child
    let options = children.props.options;
    if (dataSource.data && options) {
        options = formatObject(options, dataSource.data);
    }
    
    return React.cloneElement(children, {
        ...props,
        ...children.props,
        options,
        dataSource
    });
}