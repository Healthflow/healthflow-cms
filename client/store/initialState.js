export default {
    app: {
        isLoaded: false,
        hasError: false,
        error: null,
        notification: null,
        language: null,
        settings: {},
        preferences: {},
        routes: [],
        layout: {}, // the cached layout schema use by the UI
        schemas: {}, // a cache of schemas loaded by the UI
        views: {},
        data: {},
        actionResults: {}
    }
};