exports.verifyTimePattern = time => /^\d{2}:\d{2}$/.test(time);

// converte um tempo passado no formato hh:mm para o formato decimal
exports.convertTimeStringToNumber = time => {
    const [hours, minutes] = time.split(':').map(parseStringToInt);
    return hours + minutes / 60;
};

// converte um número decimal para o formato hh:mm
exports.convertTimeNumberToString = time => {
    const hours = parseInt(time);
    const minutes = Math.round((time - hours) * 60);
    return `${this.formatTimeUnity(hours)}:${this.formatTimeUnity(minutes)}`;
};

exports.formatTimeUnity = timeUnity => {
    return `${timeUnity < 10 ? '0' : ''}${timeUnity}`;
};

function parseStringToInt(string) {
    return parseInt(string);
}
