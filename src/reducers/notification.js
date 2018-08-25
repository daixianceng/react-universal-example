import { SET_NOTIFICATION_ERROR, CLEAR_NOTIFICATION_ERROR } from '../constants';

const initState = {
  error: undefined,
  errorCounter: 0,
};

export default function category(state = initState, action) {
  switch (action.type) {
    case SET_NOTIFICATION_ERROR:
      return {
        ...state,
        error: action.message,
        errorCounter: state.errorCounter + 1,
      };
    case CLEAR_NOTIFICATION_ERROR:
      return {
        ...state,
        error: undefined,
      };
    default:
      return state;
  }
}
