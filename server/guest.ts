import config from './m1syl.config';
let nextGuestID = 1;

export function getNewGuestID() {
    return `#${(nextGuestID++).toString().padStart(config.guest_id_number_length, '0')}`;
}