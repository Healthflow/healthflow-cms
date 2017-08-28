import React from 'react';
import {
    connect
}
from "react-redux";
import { formatObject } from "framework/utils/format";
import getAction from "framework/actions/actionRegistry";
import {
    Button
}
from 'antd';

/*
 * The ActionLink is a hyperlink style component
 * which is connected to the redux store and
 * dispatches redux actions
 */
const ActionButton = (props) => {

    let {
        options: {
            className,
            text,
            buttonType,
            style,
            action: {
                type,
                parameters
            }
        },
        data
    } = props;
    
    let params = parameters;
    
    if (parameters && data) {
        params = formatObject(parameters, data);  
    }
    
    let action = getAction(type, params);
    
    let handleClick = (e) => {
        e.preventDefault();
        props.onSendAction(action);
    };
    
    return (
        <Button type={buttonType || "primary"} htmlType="button" className={className} style={style} onClick={handleClick}>
            {text}
        </Button>
    );
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onSendAction: (action) => {
            dispatch(action.getRequest());
        }
    };
};

const ActionButtonContainer = connect(
    null,
    mapDispatchToProps
)(ActionButton);

export default ActionButtonContainer;
