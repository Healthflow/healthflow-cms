import {
  connect
}
from 'react-redux';
import AppLayout from './appLayout';

const mapStateToProps = (state) => {
  return {
    layout: state.app.layout
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {};
};

const AppLayoutContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AppLayout);

export default AppLayoutContainer;
