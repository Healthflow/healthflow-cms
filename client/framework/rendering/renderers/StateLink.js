import React from 'react';
import {connect}
from "react-redux";
import { SetDataAction } from "framework/actions/setDataAction";

const StateLink = (props) => {

    let {
        options: {
            className,
            style,
            text,
            destination,
            state
        }
    } = props;
    
    let handleClick = (e) => {
        e.preventDefault();
        props.setData(destination, state);
    };

    return (
        <a href="#" className={className} style={style} onClick={handleClick}>
            {text}
        </a>
    );
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
         setData: (destination, data) => {
            
            // if the destination is not set
            // use the source value as the 
            // destination...
            if (!destination) {
                destination = ownProps.dataSource.options.source;
            }
            
            let setDataAction = new SetDataAction({
                path: destination,
                data
            });
            
            dispatch(setDataAction.getRequest());
        }
    };
};

const StateLinkContainer = connect(
    null,
    mapDispatchToProps
)(StateLink);

export default StateLinkContainer;
