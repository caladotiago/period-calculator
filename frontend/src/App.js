import Calculator from './components/Calculator';
import './App.css';

function App() {
    return (
        <div className="grey lighten-5 page-wrapper">
            <header className="center-align cyan accent-2">
                <h3>
                    Calculadora de horas
                    <i className="material-icons calculator-icon">schedule</i>
                </h3>
            </header>
            <div className="container calculator-wrapper">
                <div className="card">
                    <div className="card-title cyan accent-2">
                        Informe a data de entrada e saída e veja quanto tempo
                        trabalhou no período noturno e diurno.
                    </div>
                    <div className="card-content">
                        <Calculator />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
