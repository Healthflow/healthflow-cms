import {
    fork
}
from 'redux-saga/effects';

import appSaga from './sagas/app/appSaga';

function* rootSaga() {

    yield [
        fork(appSaga)
    ];
}

export default rootSaga;
