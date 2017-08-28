import React from 'react';
import {
    Input, 
    Button
}
from 'antd';

const ContainsFilter = (props) => {
    let {
        name,
        options,
        value,
        onChange,
        onSubmit
    } = props;

    const handleFilterValueChanged = (e) => {
        onChange({ 
            name, 
            value: e.target.value
        });
    };
    
    const handleFilterSubmitted = () => {
        onSubmit({
            name
        });
    };

    return (
        <div className="custom-filter-dropdown">
            
            <Input
                placeholder={options.placeholder}
                value={value}
                onChange={handleFilterValueChanged}
                onPressEnter={handleFilterSubmitted}
            />
            
            <Button type="primary" onClick={handleFilterSubmitted}>Filter</Button>
            
        </div>
    );
};

export default ContainsFilter;
