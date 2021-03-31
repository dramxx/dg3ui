export const roundFloat = (value: number, decimalDigits: number) => {
  const multiplier = Math.pow(10, decimalDigits);

  return Math.round(value * multiplier) / multiplier;
};
