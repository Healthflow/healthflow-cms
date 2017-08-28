import React from "react";
import Router from "react-router/lib/Router";
import AppLayoutContainer from "components/app/appLayoutContainer";
import componentRegistry from 'framework/rendering/componentRegistry';
import createRoutes from "framework/routing/createRoutes";

class AppRouter extends React.Component {
    
    render() {
        
        if (this.props.routes.length == 0) {
            return null;
        }
        
        let routes = [{
                path: "/",
                component: AppLayoutContainer,
                childRoutes: createRoutes([
                    ...this.props.routes,
                    {
                        path: "*",
                        componentType: "route-not-found"
                    }
                ], componentRegistry)
            }
        ];
    
        return <Router history={window.syncedRouterHistory} routes={routes} />;
    }
}

export default AppRouter;