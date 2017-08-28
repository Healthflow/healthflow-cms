import React from 'react';
import { Input } from 'antd';

const Search = Input.Search;

import PubSub from 'pubsub-js';  

const SearchInput = (props) => {
    
    return (
        <Search
            placeholder="Search..."
            {...props.options}
            onSearch={value => PubSub.publish('SEARCH', value) } />
    );
};

export default SearchInput;