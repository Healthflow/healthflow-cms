import {
  connect
}
from 'react-redux';
import App from './app';

import {
  load,
  setError
}
from 'store/sagas/app/appActions';

const mapStateToProps = (state) => {
  return {
    isLoaded: state.app.isLoaded,
    hasError: state.app.hasError,
    error: state.app.error
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    
    onLoad: () => {
        dispatch(load());
    },
    
    onException: (title, exception) => {
      dispatch(setError(title, exception.message, exception));
    }
  };
};

const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default AppContainer;
