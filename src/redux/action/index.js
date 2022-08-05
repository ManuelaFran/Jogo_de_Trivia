import { REQUEST_TOKEN } from './actionType';

export const resquestToken = (payload) => ({
  type: REQUEST_TOKEN,
  payload,
});

export function getRequestToken() {
  const url = 'https://opentdb.com/api_token.php?command=request';
  return async (dispatch) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      return dispatch(resquestToken(data));
    } catch (error) {
      console.error(error.message);
    }
  };
}
