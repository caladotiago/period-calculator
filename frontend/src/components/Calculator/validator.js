import { checkTime } from '../../utilities/time';

export function validateFields(initialTime, finalTime) {
    if (initialTime == finalTime) return 'time.interval';
    if (!checkTime(initialTime)) return 'initialTime.invalid';
    if (!checkTime(finalTime)) return 'finalTime.invalid';
    return '';
}
