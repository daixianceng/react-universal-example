import {
  GET_CATEGORIES_START,
  GET_CATEGORIES_SUCCESS,
  GET_CATEGORIES_FAIL,
} from '../constants';

const initState = {
  all: undefined,
  loading: false,
};

export default function category(state = initState, action) {
  switch (action.type) {
    case GET_CATEGORIES_START:
      return {
        ...state,
        all: undefined,
        loading: true,
      };
    case GET_CATEGORIES_SUCCESS:
      return {
        ...state,
        all: action.data,
        loading: false,
      };
    case GET_CATEGORIES_FAIL:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}
