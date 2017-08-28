# Healthflow Client v0.2.0

## Table Of Contents
* [Overview](#overview)
	* [Features](#features)
* [Concepts](#concepts)
	* [Route](#route)
	* [Schema](#schema)
	* [State](#state)
	* [View](#view)
	* [Component](#component)
	* [Datasource](#datasource)
	* [Event](#event)
	* [Action](#action)
	* [Action Result](#actionresult)
* [Component Schema](#componentschema)
	* [Events](#componentschemaevents)
	* [Component](#componentschemacomponent)
	* [Supported Component Types](#componenttypes)
	* [Datasource Properties](#datasourceproperties)
	* [Support Datasource Types](#datasourcetypes)
		* [REST Datasource](#restdatasource)
		* [State Datasource](#statedatasource)
* [Examples](#examples)
	
	

## Overview <a name="overview"></a>
The Healthflow client is Javascript client application written using React, Redux and Redux Sagas, which has been designed to make building data driven single page applications simpler without development knowledge.

The client uses the concept of JSON schema's to decide how the user interface will look and feel, this reduces the need for developers and allows the application to be rapidly developed.

### Features: <a name="features"></a>

 - Authentication & Authorization.
 - Internationalization.
 - Themes.
 - Search.
 - Quick actions.
 - Hot key support.
 - Page specific actions.
 - User management.
 - User preferences.
 - Widgets.
 - Layout and state persistence.
 - Push notifications.
 - Messaging.
 - Auditing
 - Error logging.

----------

## Concepts <a name="concepts"></a>

### Route <a name="route"></a>

A route describes a location in Healthflow and the component schema should be loaded.
The schema describes how to build the view you will see when you navigate to that location.

### Schema <a name="schema"></a>
A schema is a list of instructions that describes the look, feel and behavior of a view to Healthflow's rendering engine.

### State <a name="state"></a>
State is data that Healthflow uses, it can be anything from translation values to a patient that has been selected in from a table.

### View  <a name="view"></a>
A view is a collection of components that will be served when a user visits a valid route in the Healthflow application.

### Component <a name="component"></a>
A component is a function that encapsulates logic and returns either data or HTML.

### Datasource<a name="datasource"></a>
A data source is a mechanism for components to retrieve data from various sources.
For example you may use a datasource to load data from a REST API into a table component.

Datasources are bi-directional and allow components to also push data back to the datasource.
For example you may use a search component to retrieve the data, filter it and push it back into the datasource.

### Event <a name="event"></a>
An event is a function that is triggered under certain circumstances.
For example an event may be triggered when you navigate to a page.

### Action <a name="action"></a>
An action is a built-in function of the Healthflow's framework, such as sending a HTTP request.
These action's can be used in custom views via the JSON schema.

### Action Result <a name="actionresult"></a>
An action typically has an outcome, the action result allows Healthflow to track the progress of an action and store any data returned in state.

----------

## Component Schema <a name="componentschema"></a>

A component schema is used to express the look, feel and behavior of a view within the Healthflow application.
The component schema at the root level has the following properties:

### Events <a name="componentschemaevents"></a>

**Name**: events

**Type:** object

**Required:** false

**When to use:** When there is an [Action](#action) you would like to trigger before or after a [View](#view) is displayed.

See [Event Properties](#eventproperties) for more information

### Component <a name="componentschemacomponent"></a>

**Name**: component

**Type:** object

**Required:** true

The "component" value is the root [Component](#component) in your [View](#view), typically this will be a layout type component such as a "container" or a "row".

Example:
```
{
	"events": {},
	"component": {}
}
```

----------

### Event Properties <a name="eventproperties"></a>

Below are the properties that an [Event](#event) supports:

#### Actions

**Name**: actions

**Type:** array

**Required:** false

An event can trigger pre-defined [Action(s)](#action) such as making a HTTP request.

A list of supported [Action(s)](#action) types 

Example:
```
{
    "events": {
        "onLoad": {
            "actions": [{
                "type": "http-request",
                "parameters": {
                    "uri": "http://some-api/stuff",
                    "verb": "get",
                    "path": "stuff"
                }
            }]
        }
    },
    "component": {}
}
```

----------

### View Events: <a name="viewevents"></a>

These are the [Events](#event) that are supported by a Healthflow [View](#view):

#### OnLoad

The "onLoad" [Event](#event) is fired when a [View](#view) loads

**When to use:** When you want to trigger an [Action](#action), such as loading data that [Component(s)](#component) in your [View](#view) need.

See [Event Properties](#eventproperties) for more information.

#### OnUnload

The "onUnload" [Event](#event) is fired when a [View](#view) is destroyed. 

**When to use:** When you want to trigger an [Action](#action), or clean up data that [Component(s)](#component) in your [View](#view) were using.

See [Event Properties](#eventproperties) for more information.

----------

### Component Properties <a name="componentproperties"></a>

Below are the properties that a Healthflow [Component](#component) including components in the "children" property support:

#### Component Type 

**Name**: componentType

**Type:** string

**Required:** true

The component type is used to find the correct  [Component](#component) to be rendered.

See [Supported Component Types](#componenttypes) for more information.

Example:
```
{
	"component": {
		"componentType": "container",
		"dataSource": {},
		"options": {},
		"children": []
	}
}
```

#### Datasource

**Name**: dataSource

**Type:** object

**Required:** false

**When to use:** When you want to load data for a [Component](#component) to display, such as getting data from an API.

A [Datasource](#datasource) is used to push data from some source into a [Component](#component).

Example:
```
{
	"component": {
		"componentType": "container",
		"dataSource": {
			"type": "rest",
			"options": {
				"uri": "http://some-api/stuff",
				"verb": "get",
				"params": [],
				"headers": []
			}
		},
		"options": {},
		"children": []
	}
}
```

----------

### Supported Component Types <a name="componenttypes"></a>

Below are the [Component](#component) types that the Healthflow renderering engine supports out of the box:

- modal
- progress
- logo
- grid
- grid-header
- grid-footer
- grid-sidebar
- grid-content
- grid-header-menu
- menu
- link
- action-link
- state-link
- table
- page
- component
- container
- card
- meta-page
- heading
- tag
- column
- row
- list
- list-item
- for-each
- if
- timeline
- search-filter
- spinner

----------

### Datasource Properties <a name="datasourceproperties"></a>

#### Datasource Type

**Name**: type

**Type:** string

**Required:** true

The datasource type is used to find a valid [Datasource](#datasource) to be rendered.

See [Supported Datasource Types](#datasourcetypes) for more information.

#### Options

**Name**: type

**Type:** object

**Required:** true

The options object is used to supply parameters that are specific to the type of [Datasource](#datasource) used.
For example the [REST](#restdatasource)  [Datasource](#datasource) needs a URI parameter whereas the [STATE](#statedatasource) datasource does not.

----------

### Supported Datasource Types <a name="datasourcetypes"></a>

Below are the [Datasource](#datasource) types that Healthflow supports out of the box:

### REST Datasource <a name="restdatasource"></a>

**Type**: rest

**When to use:** When you need to perform CRUD operations against a HTTP resource.

#### Verb
This is the verb used for the HTTP request.

#### Headers

**Type**: array

**Required**: false

**When to use:** When you need to send an "authorization" header for authentication purposes or when you want to explicitly set the content type of the request.

The headers that will be sent with the HTTP request.

Example:
```
"dataSource": {
	"type": "rest",
	"options": {
		"uri": "http://some-api/stuff",
		"verb": "GET",
		"params": [],
		"headers": [{
            "name": "content-type",
            "value": "application/xml"
        }]
	}
}
```

#### Params

**Type**: object

**Required**: false

**When to use:** When you need to send a querystring with the request, for example sending a resource id that you want to be returned in the response.

The params are added to the "uri" of the HTTP request.

Example:
```
"dataSource": {
	"type": "rest",
	"options": {
		"uri": "http://some-api/stuff",
		"verb": "GET",
		"params": [{
            "name": "id",
            "value": 1024
         }],
		"headers": []
	}
}
```

#### Body

**Type**: object

**Required**: false

**When to use:** When you want to send data along with a HTTP request, for example creating a patient you would send the patient data in the HTTP request body.

The body is used to send data along with a HTTP request, this property is only sent when the request "verb" is either "POST" or "PUT".

For more information on HTTP request methods see: https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods

Example:
```
"dataSource": {
	"type": "rest",
	"options": {
		"uri": "http://some-api/stuff",
		"verb": "POST",
		"params": [],
		"headers": [],
        "body": {
            "firstName": "Sherlock",
            "lastName": "Holmes",
            "emailAddress": "sholmes@gmail.com"
        }
	}
}
```
----------

### State Datasource <a name="statedatasource"></a>

**Type**: state

**When to use:** When you need to get or put data into the Healthflow application's state.

**Note:** All data changes are isolated to the "state.app.data" path in order to protect vital application state such as routes and settings required by Healthflow.

**TODO ADD Description & Options**

Example:
```
"dataSource": {
	"type": "state",
	"options": {
		"source": "someParent.someChild"
	}
}
```

----------

### Examples

Simple multi-column layout:

```
{
	"component": {
		"componentType": "container",
		"children": [{
				"componentType": "row",
				"children": [{
					"componentType": "column",
					"options": {
						"span": 24
					},
					"children": [{
						"componentType": "heading",
						"options": {
							"text": "This is a simple view"
						}
					}]
				}]
			},
			{
				"componentType": "row",
				"children": [{
						"componentType": "column",
						"options": {
							"span": 12
						},
						"children": [{
							"componentType": "label",
							"options": {
								"text": "This is a label in column 1"
							}
						}]
					},
					{
						"componentType": "column",
						"options": {
							"span": 12
						},
						"children": [{
							"componentType": "label",
							"options": {
								"text": "This is a label in column 2"
							}
						}]
					}
				]
			}
		]
	}
}
```
