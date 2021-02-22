export function formatTimeUnity(timeUnity) {
    return `${timeUnity < 10 ? '0' : ''}${timeUnity}`;
}
export function checkTime(time) {
    return /^(2[0-4]|[01]?[0-9]):([0-9]|[0-5]\d)$/.test(time);
}
