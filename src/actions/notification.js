import { SET_NOTIFICATION_ERROR, CLEAR_NOTIFICATION_ERROR } from '../constants';

export function setError({ message }) {
  return {
    type: SET_NOTIFICATION_ERROR,
    message,
  };
}

export function clearError() {
  return {
    type: CLEAR_NOTIFICATION_ERROR,
  };
}
