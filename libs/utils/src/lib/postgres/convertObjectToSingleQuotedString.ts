export const ConvertObjectToSingleQuotedString = (obj: Array<any> | object) => {
  return JSON.stringify(obj).replace(/"/g, "'");
};
