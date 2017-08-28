import React from 'react';
import {
    Spin
}
from 'antd';

class AntDSpin extends React.Component {

    render() {
        
        let loadingMessage = this.props.loadingMessage || 
            "Loading, please wait...";
        
        return (
            <Spin
                size={this.props.size}
                style={{"height": "100%"}}
                spinning={this.props.isLoading} 
                tip={loadingMessage}>
                {this.props.children}
            </Spin>
        );
    }
}

export default AntDSpin;