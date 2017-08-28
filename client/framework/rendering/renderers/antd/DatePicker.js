import React from 'react';
import { DatePicker } from 'antd';

class AntDDatePicker extends React.Component {

    render() {
        
        let {
            dateFormat,
            className,
            style,
            placeholder,
            showTime,
            size
        } = this.props.options;
        
        return (
            <DatePicker 
                showTime={showTime}
                onChange={this.props.onChange}
                className={className}
                placeholder={placeholder}
                style={style}
                size={size}
                format={dateFormat} />
        );
    }
}

export default AntDDatePicker;