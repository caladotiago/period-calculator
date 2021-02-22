import React, { useState } from 'react';
import { Preloader } from 'react-materialize';
import network from '../../services/network';
import TimePicker from '../TimePicker';
import { validateFields } from './validator';
import FormError from '../FormError';
import Result, { ResultProps } from './Result';

import './index.css';

export default function Calculator() {
    const [initialTime, setInitialTime] = useState('');
    const [finalTime, setFinalTime] = useState('');

    const [loadingDisplay, setLoadingDisplay] = useState('hide');
    const showLoading = () => setLoadingDisplay('');
    const hideLoading = () => setLoadingDisplay('hide');

    const [errorProps, setErrorProps] = useState({
        message: '',
        display: 'hide',
    });

    const showError = message => setErrorProps({ message, display: '' });
    const hideError = () => setErrorProps({ message: '', display: 'hide' });

    const [resultProps, setResultProps] = useState(ResultProps);

    let canSubmit = true;

    const submitListener = ev => {
        ev.preventDefault();

        // previne o duplo clique de submit
        if (canSubmit) {
            canSubmit = false;

            let message;
            if ((message = validateFields(initialTime, finalTime)) !== '') {
                showError(message);
                canSubmit = true;
                return;
            }

            hideError();
            showLoading();

            network
                .get(
                    `/periods?initialTime=${initialTime}&finalTime=${finalTime}`
                )
                .then(response => {
                    const { data } = response;

                    setResultProps({
                        ...data,
                    });
                })
                .catch(error => {
                    let message = 'error.unknow';
                    if (error.response && error.response.data) {
                        message = error.response.data;
                    }
                    showError(message);
                })
                .then(() => {
                    canSubmit = true;
                    hideLoading();
                });
        }
    };

    return (
        <>
            <form onSubmit={submitListener}>
                <FormError {...errorProps} />

                <div className="row">
                    {createTimePicker({
                        id: 'initial-time',
                        label: 'Hora de Entrada',
                        onChange: setInitialTime,
                        time: initialTime,
                    })}
                    {createTimePicker({
                        id: 'final-time',
                        label: 'Hora de Saída',
                        onChange: setFinalTime,
                        time: finalTime,
                    })}
                </div>

                <div className="row">
                    <div className="col s8">
                        <button
                            className="btn waves-effect blue lighten-1 black-text btn-large"
                            type="submit"
                        >
                            Calcular
                        </button>
                    </div>
                    <div
                        className={`col s4 valign-wrapper calculator-loading ${loadingDisplay}`}
                    >
                        <Preloader size="small" />
                    </div>
                </div>
            </form>
            <Result {...resultProps} />
        </>
    );
}

function createTimePicker(props) {
    return (
        <div className="col s12 m6">
            <TimePicker {...props} />
        </div>
    );
}
