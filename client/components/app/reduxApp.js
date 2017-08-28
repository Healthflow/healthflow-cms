import React from 'react';

import {
    Provider
}
from 'react-redux';

import ReduxDevTools from 'store/devTools';
import configureStore from 'store/store';
import AppContainer from './appContainer';

const redux = configureStore(ReduxDevTools);
window.syncedRouterHistory = redux.syncedRouterHistory;

/* 
* Component hiearchy:
* ReduxApp
* AppContainer
* App
* AppRouterContainer
* AppRouter
* DynamicPage
* View
*/

class ReduxApp extends React.Component {

    render() {
        
        return (
            <Provider store={redux.store} className="full-height">
                <div className="full-height">
                    <AppContainer />
                    <ReduxDevTools />
                </div>
            </Provider>
        );
    }
}

export default ReduxApp;