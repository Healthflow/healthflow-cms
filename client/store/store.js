import React from 'react';
import {
  createStore,
  applyMiddleware,
  compose
}
from 'redux';
import createSagaMiddleware from 'redux-saga';

import {
  syncHistoryWithStore,
  routerMiddleware
}
from 'react-router-redux';

import {
  hashHistory
}
from 'react-router';

import reducer from './reducer'
import loggingMiddleware from './middlewares/loggingMiddleware';
import rootSaga from './saga';
import initialState from './initialState';

export default function configureStore(reduxDevTools) {

  const routingMiddleware = routerMiddleware(hashHistory);
  const sagaMiddleware = createSagaMiddleware();

  var middleware = [
    sagaMiddleware,
    routingMiddleware,
    loggingMiddleware
  ];

  const enhancer = compose(
    applyMiddleware(...middleware),
    reduxDevTools.instrument()
  );

  const store = createStore(reducer, initialState, enhancer);
  const syncedHistory = syncHistoryWithStore(hashHistory, store);

  sagaMiddleware.run(rootSaga);

  return {
    store: store,
    syncedRouterHistory: syncedHistory
  };

}
