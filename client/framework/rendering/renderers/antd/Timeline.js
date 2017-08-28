import React from 'react';
import {
    Timeline
}
from 'antd';
import {getPath} from "framework/utils/array";

class AntDTimeline extends React.Component {

    render() {
        
        let {
            dataSource,
            options: {
                dataProperty
            }
        } = this.props;
        
        if (!dataSource.data || !dataProperty) {
            return null;
        }
        
        let items = getPath(dataSource.data, dataProperty);
        
        if (!items) {
            return null;
        }
        
        let itemElements = [];
        for(let i = 0; i < items.length; i++) {
            let item = items[i];
            let itemElement = (
                <Timeline.Item key={`patient_${dataSource.data.id}_timeline_item_${i}`}>
                    <h4>{item.eventName}</h4>
                    <p>{item.eventTimestamp}</p>
                </Timeline.Item>
            );
            itemElements.push(itemElement);
        }
        
        return (
            <Timeline>
                {itemElements}
            </Timeline>
        );

    }
}

export default AntDTimeline;
