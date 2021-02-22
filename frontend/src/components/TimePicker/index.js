import React from 'react';

export default props => {
    const { id, label, onChange, time } = props;

    const timeChangeHandler = ev => onChange(ev.target.value);

    return (
        <div>
            <label htmlFor={id}>{label}</label>
            <input
                id={id}
                type="time"
                onChange={timeChangeHandler}
                value={time}
                required={true}
            />
        </div>
    );
};
