import React from 'react';
import {
    Layout
}
from 'antd';
const {
    Header
} = Layout;

import componentRegistry from 'framework/rendering/componentRegistry';

import './styles.scss';

const GridHeader = (props) => {

    let logoOptions = props.options.logo;
    let hasLogo = logoOptions != undefined;
    let Logo = null;

    if (hasLogo) {
        Logo = componentRegistry.get('logo');
    }

    return (
        <Header>
            {
              hasLogo &&
              <Logo url={logoOptions.url} style={logoOptions.style} />
            }
          
            {props.children}
        </Header>
    );
};

export default GridHeader;
