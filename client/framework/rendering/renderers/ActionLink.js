import React from 'react';
import {
    connect
}
from "react-redux";
import { formatObject } from "framework/utils/format";
import getAction from "framework/actions/actionRegistry";

/*
 * The ActionLink is a hyperlink style component
 * which is connected to the redux store and
 * dispatches redux actions
 */
const ActionLink = (props) => {

    let {
        options: {
            text,
            action: {
                type,
                parameters
            }
        },
        data
    } = props;
    
    let formattedParameters = formatObject(parameters, data);  
    let action = getAction(type, formattedParameters);
    
    let handleClick = (e) => {
        e.preventDefault();
        props.onSendAction(action);
    };

    return (
        <a href="#" onClick={handleClick}>
            {text}
        </a>
    );
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onSendAction: (action) => {
            dispatch(action.getRequest());
        }
    };
};

const ActionLinkContainer = connect(
    null,
    mapDispatchToProps
)(ActionLink);

export default ActionLinkContainer;
