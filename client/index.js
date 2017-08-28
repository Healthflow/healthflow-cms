import {
  render
}
from 'react-dom';
import React from 'react';
import 'jquery';

import ReduxApp from 'components/app/reduxApp';

render(
  <ReduxApp />,
  document.getElementById('root')
);
