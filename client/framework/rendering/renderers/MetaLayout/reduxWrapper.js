import React from "react";
import {
    Provider
}
from "react-redux";

/*
* Responsbile for wrapping components in a Redux Provider
* This is use to pass the existing Redux store down to child components
*/
const reduxWrapper = (Component, key) => {
    class ReduxWrapper extends React.Component {
        render() {
            return (
                <Provider store={this.props.store}>
                    <Component key={key} {...this.props} />
                </Provider>
            );
        }
    }
    return ReduxWrapper;
};

export default reduxWrapper;