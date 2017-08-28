import React from 'react';
import {
    Modal
}
from 'antd';

class AntDModal extends React.Component {
    
    handleHideModal(e) {
        this.props.dataSource.set(this.props.options.source, false);
    }

    render() {
        let {
            title,
            footer
        } = this.props.options;
        
        let isVisible = (this.props.dataSource.data && this.props.dataSource.data == true);
        
        return (
            <Modal
                title={title}
                visible={isVisible}
                onOk={this.handleHideModal.bind(this)}
                onCancel={this.handleHideModal.bind(this)}
                footer={footer}>
                {this.props.children}
                
            </Modal>
        );
    }
}

export default AntDModal;