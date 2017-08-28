import React from 'react';
import { Progress } from 'antd';

class AntDProgress extends React.Component {

    render() {

        let {
            dataSource
        } = this.props;

        return (
            <Progress percent={dataSource.data} strokeWidth={5} />
        );
    }
}

export default AntDProgress;
