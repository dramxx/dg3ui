export const isNumber = (value) =>
  !isNaN(parseFloat(value)) && !isNaN(Number(value));
