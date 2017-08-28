import {
    connect
}
from "react-redux";
import React from "react";
import {
    Form,
    Button
}
from 'antd';
const FormItem = Form.Item;

import { SetDataAction } from "framework/actions/setDataAction";
import componentRegistry from "framework/rendering/componentRegistry";
import componentRenderer from "framework/rendering/componentRenderer";
import {
    InvalidValidationRuleException
}
from "framework/rendering/exceptions";

class AntDForm extends React.Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {

        event.preventDefault();

        this.props.form.validateFields((error, values) => {
            if (!error) {
                this.props.onSubmit(values);
            }
        });
    }

    getFieldValidationRules(field) {
        let fieldValidationRules = [];
        let rulesCount = field.options.validationRules ?
            field.options.validationRules.length :
            0;

        const validators = {
            "required": {
                required: true,
                message: "A value is required"
            }
        };

        for (let i = 0; i < rulesCount; i++) {

            let rule = field.options.validationRules[i];
            let validationRule = validators[rule.name];

            if (!validationRule) {
                throw new InvalidValidationRuleException(rule.name, validators);
            }

            if (rule.message) {
                validationRule.message = rule.message;
            }

            fieldValidationRules.push(validationRule);
        }

        return fieldValidationRules;
    }

    render() {

        //console.time("RENDER-FORM");

        const {
            getFieldDecorator
        } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: {
                    span: 24
                },
                sm: {
                    span: 6
                },
            },
            wrapperCol: {
                xs: {
                    span: 24
                },
                sm: {
                    span: 14
                },
            },
        };

        let fields = this.props.options.fields;
        let fieldCount = fields.length;
        let fieldElements = [];

        for (let i = 0; i < fieldCount; i++) {

            let field = fields[i];
            //let FieldComponent = componentRegistry.get(field.componentType);
            let formItemKey = `${field.options.name}_form_item`;
            let fieldKey = `${formItemKey}_${field.componentType}`;
            let fieldValidationRules = this.getFieldValidationRules(field);

            let fieldComponent = componentRenderer({
                componentRegistry,
                componentData: {},
                componentSchema: field,
                componentKeyParts: [field.options.name, i]
            });

            let fieldProps = {
                rules: fieldValidationRules
            };

            if (field.componentType == "checkbox") {
                fieldProps.valuePropName = 'checked';
            }

            let fieldDecorator = getFieldDecorator(field.options.name, fieldProps);

            let fieldElement = (
                <FormItem key={formItemKey} {...formItemLayout} label={field.options.label} hasFeedback>
                    {
                        fieldDecorator(fieldComponent)
                    }
                </FormItem>
            );

            fieldElements.push(fieldElement);
        }

        let Row = componentRegistry.get("row");
        let Column = componentRegistry.get("column");

        let html = (
            <Form ref={this.saveFormRef} onSubmit={this.handleSubmit}>
  
                {fieldElements}
          
                <Row options={{}}>
                    <Column options={{span: 24, style: { textAlign: 'right' }}}>
          
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Submit
                        </Button>
                  
                  </Column>
                </Row>
          
            </Form>
        );

        //console.timeEnd("RENDER-FORM");

        return html;
    }

    saveFormRef = (form) => {
        this.form = form;
    }
}

AntDForm.defaultProps = {
    modelData: {}
};

const WrappedForm = Form.create()(AntDForm);

const mapStateToProps = (state, ownProps) => {
    return {};
};

const mapDispatchToProps = (dispatch, ownProps) => {

    return {
        onSubmit: (values) => {

            let submitEvent = new Event("onSubmit", ownProps.options.events.onSubmit, values);
        
            this.props.onTriggerEvent(submitEvent);

            // let setDataAction = new SetDataAction({
            //     path: "selectedPatient.events",
            //     mode: "append",
            //     data: values
            // });
            
            // dispatch(setDataAction.getRequest());
        }
    };
};

const ConnectedForm = connect(
    mapStateToProps,
    mapDispatchToProps
)(WrappedForm);


export default ConnectedForm;
