import { SAVE_EMAIL, SAVE_NAME } from './actionType';

export const saveEmailAction = (email) => ({ type: SAVE_EMAIL, email });
export const saveNameAction = (name) => ({ type: SAVE_NAME, name });
