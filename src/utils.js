import { toUrl as toRelativeUrl } from './router';

export function getInitialWidthByUserAgent(userAgent) {
  if (['Android', 'iOS'].includes(userAgent.os.family)) {
    if (['iPad'].includes(userAgent.device.family)) {
      // For tablet
      return 'md';
    }
    // For mobile phone
    return 'sm';
  }
  // For desktop
  return 'lg';
}

/**
 * Generates URL
 */
export function toUrl(...args) {
  const last = args.pop();
  if (typeof last === 'boolean') {
    if (last === true) {
      return process.env.APP_HOME_URL + toRelativeUrl(...args);
    }
    return toRelativeUrl(...args);
  }
  return toRelativeUrl(...args, last);
}
