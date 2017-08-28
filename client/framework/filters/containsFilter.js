const containsFilter = (props) => {

    let {
        key,
        value,
        data
    } = props;

    const regex = new RegExp(value, 'gi');

    let filteredData = data
        .map((record) => {
            const isMatch = record[key].match(regex);

            if (!isMatch) {
                return null;
            }

            return record;
        })
        .filter(record => record != null);

    return filteredData;
};

// table event link triggers redux sendHttpRequest,
// state data source listens for data

export default containsFilter;
