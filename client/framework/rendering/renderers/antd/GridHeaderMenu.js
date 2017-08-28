import React from 'react';
import { Row, Col } from 'antd';
import Menu from './Menu/Menu';

class GridHeadeMenu extends React.Component {
    render () {
        return (
            <Row type="flex" justify="end">
                <Col span={12}>
                    <Menu {...this.props} />
                </Col>
            </Row>
        );
    }
}

export default GridHeadeMenu;