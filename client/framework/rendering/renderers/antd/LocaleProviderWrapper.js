import React from "react";
import { LocaleProvider } from 'antd';
import enUS from 'antd/lib/locale-provider/en_US';

/**
* Responsbile for wrapping components in a Redux Provider
* This is use to pass the existing Redux store down to child components
*/
export const localeWrapper = (Component, key) => {
    class AntDLocaleProvider extends React.Component {
        render() {
            return (
                 <LocaleProvider key="app" locale={enUS}>
                    <Component key={key} {...this.props} />
                </LocaleProvider>
            );
        }
    }
    return AntDLocaleProvider;
};