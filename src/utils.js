/* eslint-disable import/prefer-default-export */

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
};
