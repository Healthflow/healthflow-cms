import React from "react";
import {connect} from "react-redux";
import componentRenderer from "framework/rendering/componentRenderer";
import componentRegistry from "framework/rendering/componentRegistry";
import {loadSchema} from "store/sagas/app/appActions";
import Event from "framework/events/event";

class DynamicPage extends React.Component {
    
    /**
     * This will load the component schema when the component is first mounted.
     * If the schema is already loaded into state it will trigger the "onLoad" event.
     * Note: This is to work around some quirkiness in the react-router package.
     */
    componentDidMount() {

        // console.log("MOUNTED: " + this.props.location.pathname);
        
        // Load the schema if it is not already loaded into state.
        if (!this.props.schema) {
            this.props.onLoadSchema(this.props.route.schemaUri);
        } else {
            // this is to ensure that the event is fired
            // if the schema is already stored in state
            // i.e. the user has already visited this page.
            this.onLoadEvent(this.props.schema);
        }

    }
    
    /**
     * This will load the schema if the route has changed.
     * It will also trigger the onload event if the route has changed.
     * Note: This is to work around some quirkiness in the react-router package.
     */
    componentWillReceiveProps(nextProps) {
        
        // Handle route change, this is required because
        // the component is not remounted by the react router
        // and therefore does not load the new routes schema
        // causing the view not to be re-rendererd.
        if (!this.props.schema || !nextProps.schema) {
            this.props.onLoadSchema(nextProps.route.schemaUri);
        }
        
        
        if (!this.props.schema && nextProps.schema) {
            // Wait for the schema to be loaded
            // in order to get the event information from it
            // then trigger the "onLoad" event.
            this.onLoadEvent(nextProps.schema);
        }
    }

    /**
    * This will be execute when the component is loaded
    * any actions in the schema "events.onLoad.actions" array
    * will be triggered here.
    */
    onLoadEvent(schema) {
        
        let hasOnLoadEvent = (
            schema &&
            schema.events &&
            schema.events.onLoad != undefined);
            
        if (!hasOnLoadEvent) {
            return;
        }
        
        //console.log("LOAD EVENT FOR: " + this.props.location.pathname);
        
        let loadEvent = new Event("onLoad", schema.events.onLoad);
        
        this.props.onTriggerEvent(loadEvent);
    }
    
    /**
    * This will be execute when the component is unloaded
    * any actions in the schema "events.onUnload.actions" array
    * will be triggered here.
    */
    onUnloadEvent() {
        console.log("UNLOAD EVENT FOR: " + this.props.location.pathname);
        
        let hasOnUnloadEvent = (
            this.props.schema &&
            this.props.schema.events &&
            this.props.schema.events.onUnload != undefined);
            
        if (!hasOnUnloadEvent) {
            return;
        }
        
        let unloadEvent = new Event("onUnload", this.props.schema.events.onUnload);
        
        this.props.onTriggerEvent(unloadEvent);
    }

    render() {

        // important to ensure the space inside the spinner is full height
        let page = <div></div>;
        let isSchemaLoaded = (this.props.schema != null);

        if (isSchemaLoaded) {
            // render the view's root component
            page = componentRenderer({
                componentRegistry,
                componentData: {},
                componentSchema: this.props.schema.component,
                componentKeyParts: [this.props.location.pathname]
            });
        }

        let Spinner = componentRegistry.get("spinner");

        return (
            <Spinner isLoading={!isSchemaLoaded} size="large">
                {page}
            </Spinner>
        );
    }

    componentWillUnmount() {
        this.onUnloadEvent();
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        schema: state.app.schemas[ownProps.route.schemaUri] || null
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onLoadSchema: (schemaUri) => {
            dispatch(loadSchema(schemaUri));
        },
        onTriggerEvent: (event) => {
            event.trigger(dispatch);
        }
    };
};

const DynamicPageContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(DynamicPage);

export default DynamicPageContainer;
