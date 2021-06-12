import React from 'react';

const Filter = (props) => {
    return (
        <div>
            find countries <input value={props.filter} onChange={props.updateFilterField} />
        </div>
    );
};

export default Filter;