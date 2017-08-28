import React from 'react';
import StackTrace from "stacktrace-js";

class Error extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            hasStackTrace: false,
            stackTrace: null
        };
    }
    
    componentDidMount() {
        let { 
            exception
        } = this.props;
        
        let handleExceptionParsed = (parsedStackTrace) => {
            
            this.setState({
                hasStackTrace: true,
                stackTrace: parsedStackTrace
            });
        };
    
        let handleParseException = (parseException) => {
    
        };
    
        StackTrace
            .fromError(exception)
            .then(handleExceptionParsed)
            .catch(handleParseException);
    }
    
    createExceptionStackTrace(text, stackTrace) {
        
        let elements = [];
        let stackCount = stackTrace.length;
        for(let i = 0; i < stackCount; i++) {
            let stackFrame = stackTrace[i];
            let element = (
                <p key={`stack_frame_${i}`}>
                    File Name: <span>{stackFrame.fileName}</span>,
                    Line Number: <span>{stackFrame.lineNumber}</span>,
                    Column Number: <span>{stackFrame.columnNumber}</span>,
                    Function Name: <span>{stackFrame.functionName}</span>
                    <br/>
                </p>
            );
            
            elements.push(element);
        }
        
        return (
            <div>
                <p>
                    <b>{text}: </b>
                </p>
                
                {elements}
            </div>
        );
    }
    
    render () {
        return (
            <div className="full-height error-container">
                
                <h1>Application Error</h1>
                
                <br />
                
                <h3>{this.props.title}</h3>
                
                <br />
                
                <p>
                    <b>Description: </b> 
                    <span>{this.props.description}</span>
                </p>
                
                <br />
                
                {this.state.hasStackTrace && this.createExceptionStackTrace("Exception", this.state.stackTrace)}
                
            </div>
        );
    }
}

export default Error;