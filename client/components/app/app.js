import React from 'react';
import {
    LocaleProvider
}
from 'antd';
import enUS from 'antd/lib/locale-provider/en_US';
import AppRouterContainer from './appRouterContainer';
import Error from "./error";

import 'antd/dist/antd.css';
import 'styles/app.scss';
import Notification from "framework/rendering/renderers/antd/Notification";

class App extends React.Component {

    componentDidMount() {
        this.props.onLoad();
        this.startErrorHandler();
    }

    startErrorHandler() {
        window.onerror = (message, file, line, column, exception) => {
            this.props.onException("Healthflow error", exception);
        };
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.isLoaded == false && nextProps.isLoaded == true) {
            this.handleLoadComplete();
        }
    }

    handleLoadComplete() {
        // hide loading overlay
        document.body.classList.add('loaded');
    }

    render() {

        let html = null;

        if (this.props.isLoaded) {
            html = <AppRouterContainer routingHistory={this.props.routingHistory} />;
        }

        if (this.props.hasError) {

            this.handleLoadComplete();

            html = <Error 
                    title={this.props.error.title} 
                    description={this.props.error.description} 
                    exception={this.props.error.exception} />;
        }

        return (
            // AntD layout provider, this prevents the AntD components display chinese text by default
            <LocaleProvider key="app" locale={enUS}>
                <div className="full-height">
                    {html}
                    <Notification />
                </div>
            </LocaleProvider>
        );
    }
}

export default App;
