import * as constants from './appConstants';

export function load() {
  return {
    type: constants.APP_LOAD_REQUEST
  };
}

export function loadSettingsSuccess(settings) {
  return {
    type: constants.APP_LOAD_SETTINGS_SUCCESS,
    payload: {
      settings
    }
  };
}

export function loadSuccess(preferences, routes, layout) {
  return {
    type: constants.APP_LOAD_SUCCESS,
    payload: {
      preferences,
      routes,
      layout
    }
  };
}

export function setError(errorTitle, errorDescription, exception) {
  return {
    type: constants.APP_SET_ERROR,
    payload: {
      title: errorTitle,
      description: errorDescription,
      exception
    }
  };
}

export function setLanguage(language) {
  return {
    type: constants.APP_CHANGE_LANGUAGE_REQUEST,
    payload: {
      language
    }
  };
}

export function setLanguageSuccess(language) {
  return {
    type: constants.APP_CHANGE_LANGUAGE_SUCCESS,
    payload: {
      language
    }
  };
}

export function setLanguageError(error) {
  return {
    type: constants.APP_CHANGE_LANGUAGE_ERROR,
    payload: {
      error
    }
  };
}

export function loadSchema(schemaUri) {
  return {
    type: constants.APP_LOAD_SCHEMA_REQUEST,
    payload: {
      schemaUri
    }
  };
}

export function loadSchemaSuccess(schemaUri, schema) {
  return {
    type: constants.APP_LOAD_SCHEMA_SUCCESS,
    payload: {
      schemaUri,
      schema
    }
  };
}

export function loadSchemaError(schemaUri, error) {
  return {
    type: constants.APP_LOAD_SCHEMA_ERROR,
    payload: {
      schemaUri,
      error
    }
  };
}