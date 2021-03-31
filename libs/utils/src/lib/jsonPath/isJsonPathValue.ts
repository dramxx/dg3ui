export const isJsonPathValue = (value: string): boolean => {
  return /\$/.test(value);
};
