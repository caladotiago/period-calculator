const {
    convertTimeStringToNumber,
    verifyTimePattern,
    convertTimeNumberToString,
} = require('../utilities/time');

function PeriodControler() {}

PeriodControler.prototype.view = function (req, res) {
    const { initialTime, finalTime } = req.query;

    let message;

    if (verifyTimePattern(initialTime)) {
        if (verifyTimePattern(finalTime)) {
            if (initialTime !== finalTime) {
                const initialTimeNumber = convertTimeStringToNumber(
                    initialTime
                );
                const finalTimeTimeNumber = convertTimeStringToNumber(
                    finalTime
                );

                if (initialTimeNumber >= 0 && initialTimeNumber < 24) {
                    if (finalTimeTimeNumber >= 0 && finalTimeTimeNumber < 24) {
                        const { dayHours, nightHours } = calculatePeriods(
                            initialTimeNumber,
                            finalTimeTimeNumber
                        );

                        return res.status(200).json({
                            dayHours: convertTimeNumberToString(dayHours),
                            nightHours: convertTimeNumberToString(nightHours),
                        });
                    } else message = 'finalTime.invalid';
                } else message = 'initialTime.invalid';
            } else message = 'time.interval';
        } else message = 'finalTime.invalid';
    } else message = 'initialTime.invalid';

    return res.status(400).json(message);
};

module.exports = new PeriodControler();

function calculatePeriods(initialTime, finalTime) {
    // 7 horas noturas e 17 horas diurnas
    const periods = [7, 17];
    let i,
        dayHours = 0,
        nightHours = 0,
        workedTime;

    if (initialTime < finalTime) {
        workedTime = finalTime - initialTime;
    } else workedTime = 24 + finalTime - initialTime;

    // acha o índice da hora de entrada perante seu período
    let beginningOfPeriod;
    if (initialTime < 5) {
        beginningOfPeriod = initialTime + 3;
        i = 0;
    } else if (initialTime < 22) {
        beginningOfPeriod = initialTime - 4;
        i = 1;
    } else {
        beginningOfPeriod = initialTime - 21;
        i = 0;
    }

    // período total deve ser inferior à 24h
    periods[(i + 1) % 2]--;

    while (workedTime > 0) {
        let periodHours = periods[i % 2];

        // quantidade de horas do período menos hora de entrada
        let workedInPeriod = periodHours + 1 - beginningOfPeriod;

        if (workedInPeriod > workedTime) workedInPeriod = workedTime;

        if (i % 2 == 0) {
            nightHours += workedInPeriod;
        } else {
            dayHours += workedInPeriod;
        }

        workedTime -= workedInPeriod;
        beginningOfPeriod = 0;
        i++;
    }

    return { dayHours, nightHours };
}
