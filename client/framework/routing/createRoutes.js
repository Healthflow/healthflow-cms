const createRoutes = (routeConfiguration, componentRegistry) => {

    let routes = [];
    let routeCount = routeConfiguration.length;

    for (let i = 0; i < routeCount; i++) {
        let routeInfo = routeConfiguration[i];
        let route = createRoute(routeInfo, componentRegistry);

        routes.push(route);
    }

    return routes;
};

const createRoute = (routeInfo, componentRegistry) => {

    let childRoutes = [];
    let childRouteCount = routeInfo.childRoutes ? routeInfo.childRoutes.length : 0;

    for (let i = 0; i < childRouteCount; i++) {
        let childRouteInfo = routeInfo.childRoutes[i];
        let childRoute = createRoute(childRouteInfo);
        childRoutes.push(childRoute);
    }

    let pageComponent = componentRegistry.get("page");

    return {
        key: routeInfo.path,
        path: routeInfo.path,
        childRoutes: childRoutes,
        component: pageComponent,
        schemaUri: routeInfo.schemaUri
    };

};

export default createRoutes;
