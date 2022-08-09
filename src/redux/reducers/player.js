import { CLEAR_SCORE, SAVE_EMAIL, SAVE_NAME, SAVE_SCORE } from '../actions/actionType';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SAVE_EMAIL:
    return {
      ...state,
      gravatarEmail: action.email,
    };
  case SAVE_NAME:
    return {
      ...state,
      name: action.name,
    };
  case SAVE_SCORE:
    return {
      ...state,
      score: action.score + state.score,
      assertions: state.assertions + 1,
    };
  case CLEAR_SCORE:
    return {
      name: '',
      assertions: 0,
      score: 0,
      gravatarEmail: '',
    };
  default:
    return state;
  }
};

export default player;
