import React from 'react';
import GoldenLayout from 'golden-layout';
import componentRegistry from 'framework/rendering/componentRegistry';
import reduxWrapper from './reduxWrapper';
import {localeWrapper} from "framework/rendering/renderers/antd/LocaleProviderWrapper";
import "golden-layout/src/css/goldenlayout-base.css";
import "golden-layout/src/css/goldenlayout-light-theme.css";
import "./styles.scss";

/*
* The MetaLayout is 3 panel layout that wraps GoldenLayout
*/
class MetaLayout extends React.PureComponent {

    componentDidMount() {
        let options = this.props.options;
        
        let goldenLayoutConfig = {
            settings: options.settings,
            content: [{
                type: "column",
                content: [{
                    type: "row",
                    height: 20,
                    content: [{
                        type: "react-component",
                        component: "metabar",
                        isClosable: false,
                        title: options.metabarComponent.options.panelTitle || "",
                        props: {
                            store: this.context.store,
                            schema: options.metabarComponent,
                            className: "full-height"
                        }
                    }]
                }, {
                    type: "row",
                    height: 80,
                    isClosable: false,
                    content: [{
                        type: "column",
                        content: [{
                            type: "react-component",
                            component: "master",
                            title: options.masterComponent.options.panelTitle || "",
                            props: {
                                store: this.context.store,
                                schema: options.masterComponent
                            }
                        }]
                    }, {
                        type: "column",
                        isClosable: false,
                        content: [{
                            type: "react-component",
                            component: "detail",
                            title: options.detailComponent.options.panelTitle || "",
                            props: {
                                store: this.context.store,
                                schema: options.detailComponent,
                                className: "full-height"
                            }
                        }]
                    }]
                }]
            }]
        };

        const instance = new GoldenLayout(goldenLayoutConfig, '#goldenLayout');
        
        // Get a dynamic component from the registry which
        // supports loading a nest component structure
        let DynamicComponent = componentRegistry.get("component");
        
        // We need to wrap the components to ensure they can access the redux store
        instance.registerComponent("metabar", localeWrapper(reduxWrapper(DynamicComponent)));
        instance.registerComponent("master", localeWrapper(reduxWrapper(DynamicComponent)));
        instance.registerComponent("detail", localeWrapper(reduxWrapper(DynamicComponent)));

        instance.init();
    }
    
    render() {
        return <div className="full-height" id="goldenLayout" />;
    }
}

// ContextTypes must be defined in order to pass the redux store to exist in
// "this.context". The redux store is given to the component from its
// surrounding <Provider> further up the component hierarchy
// see: https://github.com/andrewcapodieci/golden-layout-react-redux/blob/master/src/components/GoldenLayoutWrapper.jsx
MetaLayout.contextTypes = {
    store: React.PropTypes.object.isRequired
};

export default MetaLayout;
