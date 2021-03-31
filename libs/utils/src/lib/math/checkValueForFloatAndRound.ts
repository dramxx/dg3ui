import { roundFloat } from './roundFloat';

function isFloat(n) {
  return n % 1 !== 0;
}

export const checkValueForFloatAndRound = (
  value: any,
  decimalDigits: number = 2
) => {
  if (!isNaN(Number(value))) {
    return isFloat(value)
      ? roundFloat(parseFloat(value), decimalDigits)
      : value;
  }

  return value;
};
