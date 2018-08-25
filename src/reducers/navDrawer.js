import { OPEN_NAV_DRAWER, CLOSE_NAV_DRAWER } from '../constants';

const initState = {
  open: false,
};

export default function navDrawer(state = initState, action) {
  switch (action.type) {
    case OPEN_NAV_DRAWER:
      return {
        ...state,
        open: true,
      };
    case CLOSE_NAV_DRAWER:
      return {
        ...state,
        open: false,
      };
    default:
      return state;
  }
}
