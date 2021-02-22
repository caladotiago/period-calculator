import React, { useState } from 'react';
import network from '../../services/network';
import TimePicker from '../TimePicker';

export default function Calculator() {
    const [initialTime, setInitialTime] = useState('');
    const [finalTime, setFinalTime] = useState('');

    let canSubmit = true;

    const initialTimeChangeListener = newInitialTime => {
        console.log(newInitialTime);
        setInitialTime(newInitialTime);
    };

    const finalTimeChangeListener = newFinalTime => {
        setFinalTime(newFinalTime);
    };

    // network
    const submitListener = ev => {
        ev.preventDefault();

        // previne o duplo clique de submit
        if (canSubmit) {
            canSubmit = false;

            network
                .get(
                    `/periods?initialTime=${initialTime}&finalTime=${finalTime}`
                )
                .then(({ data }) => console.log(data))
                .catch(error => console.log(error))
                .then(() => (canSubmit = true));
        }
    };

    return (
        <form onSubmit={submitListener}>
            <div className="row">
                <div className="col s12 m6">
                    <TimePicker
                        id="initial-time"
                        label="Hora de Entrada"
                        onChange={initialTimeChangeListener}
                        time={initialTime}
                    />
                </div>
                <div className="col s12 m6">
                    <TimePicker
                        id="final-time"
                        label="Hora de Saída"
                        onChange={finalTimeChangeListener}
                        time={finalTime}
                    />
                </div>
            </div>

            <div className="row">
                <div className="col s12">
                    <button
                        className="btn waves-effect cyan accent-2 black-text btn-large"
                        type="submit"
                    >
                        Calcular
                    </button>
                </div>
            </div>
        </form>
    );
}
