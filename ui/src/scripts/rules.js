export const requireNumber = val => !isNaN(val) || 'Require Number';
export const maxLength = maxLen => val => String(val).length <= maxLen || `Max Length ${maxLen}`;
export const rangeLimit = (from, to) => val => Number(val) >= from && Number(val) <= to || `Range ${from} to ${to}`;
export const requireInteger = val => Number.isInteger(Number(val)) || 'Require Integer';
export const requireHex = val => (/[0-9]|[a-f]|[A-F]/).test(val) || 'Require Hex';

export const RGBARules = [
  [requireNumber, rangeLimit(0, 255), maxLength(3), requireInteger],
  [requireNumber, rangeLimit(0, 255), maxLength(3), requireInteger],
  [requireNumber, rangeLimit(0, 255), maxLength(3), requireInteger],
  [requireNumber, rangeLimit(0, 1)]
];

export const HSLARules = [
  [requireNumber, rangeLimit(0, 360)],
  [requireNumber, rangeLimit(0, 1)],
  [requireNumber, rangeLimit(0, 1)],
  [requireNumber, rangeLimit(0, 1)]
];

export const hexRules = [requireHex, maxLength(8)];