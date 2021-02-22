import React from 'react';

export default props => {
    const { dayHours, nightHours } = props;

    return (
        <div className="row">
            <div
                style={{
                    display: dayHours || nightHours ? 'block' : 'none',
                }}
                className="col s12 result"
            >
                <h5>Resultado da Jornada</h5>
                <p>Horas diurnas: {dayHours}</p>
                <p>Horas noturnas: {nightHours}</p>
            </div>
        </div>
    );
};

const ResultProps = {
    dayHours: '',
    nightHours: '',
};
export { ResultProps };
