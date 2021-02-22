import React from 'react';
import macros from '../../utilities/macros';

export default props => {
    const { display, message } = props;
    return (
        <div className={`row ${display}`} style={{ fontSize: 16 }}>
            <div className="col s12 red-text">{macros[message]}</div>
        </div>
    );
};
