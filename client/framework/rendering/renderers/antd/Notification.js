import React from 'react';
import {
    connect
}
from 'react-redux';
import {
    notification
}
from 'antd';
import {
    ClearNotificationAction
}
from "framework/actions/clearNotificationAction";

class AntDNotification extends React.Component {

    componentWillReceiveProps(nextProps) {

        if (this.props.notification == null &&
            nextProps.notification != null) {

            this.showNotification(nextProps.notification);
        }
    }

    showNotification(options) {

        let notificationType = options.type || "success";

        notification[notificationType]({
            message: options.title,
            description: options.description,
            onClose: this.clearNotification.bind(this)
        });
    }

    clearNotification() {
        let action = new ClearNotificationAction();
        this.props.onSendAction(action);
    }

    render() {
        return null;
    }
}

const mapStateToProps = (state) => {
    return {
        notification: state.app.notification
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onSendAction: (action) => {
            dispatch(action.getRequest());
        }
    };
};

const AntDNotificationContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(AntDNotification);

export default AntDNotificationContainer;
