import {
  connect
}
from 'react-redux';
import AppRouter from './appRouter';

const mapStateToProps = (state) => {
  return {
    routes: state.app.routes
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {};
};

const AppRouterContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AppRouter);

export default AppRouterContainer;
