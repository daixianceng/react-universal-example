import { OPEN_NAV_DRAWER, CLOSE_NAV_DRAWER } from '../constants';

export function open() {
  return {
    type: OPEN_NAV_DRAWER,
  };
}

export function close() {
  return {
    type: CLOSE_NAV_DRAWER,
  };
}
