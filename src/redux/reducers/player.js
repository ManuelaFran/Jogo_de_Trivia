import { SAVE_EMAIL, SAVE_NAME } from '../actions/actionType';

const INITIAL_STATE = {
  name: '',
  assertions: '',
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
  default:
    return state;
  }
};

export default player;