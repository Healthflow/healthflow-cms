import React from 'react';
import {createFunction} from "framework/utils/function";
import {CloneWithProps} from "framework/utils/react";

class If extends React.Component {

    render() {
        
        let {
            dataSource,
            options: {
                expression
            },
            children
        } = this.props;
        
        if (!expression || !children) {
            return null;
        }
       
        let expressionFunction = createFunction(expression);
        let isTruthy = expressionFunction(dataSource.data);
        
        let childComponents = children.filter(function (child) {
            return child.props.options.when === isTruthy;
        });

        return (
            <div>
                {CloneWithProps(childComponents, { dataSource })}
            </div>
        );
    }
}

export default If;