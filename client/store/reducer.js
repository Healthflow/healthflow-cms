import React from 'react';
import {
    combineReducers
}
from 'redux';
import {
    routerReducer
}
from 'react-router-redux';
import {
    polyglotReducer
}
from 'redux-polyglot';

import appReducer from './sagas/app/appReducer';

const reducer = combineReducers({
    routing: routerReducer,
    polyglot: polyglotReducer,
    app: appReducer
});

export default reducer;
