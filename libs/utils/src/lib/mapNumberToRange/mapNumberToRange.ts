export const mapNumberToRange: (
  value: number,
  inputMin: number,
  inputMax: number,
  outputMin: number,
  outputMax: number
) => number = (value, inputMin, inputMax, outputMin, outputMax) =>
  ((value - inputMin) * (outputMax - outputMin)) / (inputMax - inputMin) +
  outputMin;
