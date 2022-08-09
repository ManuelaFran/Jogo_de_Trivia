import { CLEAR_SCORE, SAVE_EMAIL, SAVE_NAME, SAVE_SCORE } from './actionType';

export const saveEmailAction = (email) => ({ type: SAVE_EMAIL, email });
export const saveNameAction = (name) => ({ type: SAVE_NAME, name });
export const saveScoreAction = (score) => ({ type: SAVE_SCORE, score });
export const clearScoreAction = (clear) => ({ type: CLEAR_SCORE, clear });
