export const kindAttribute = (did: string, values: Array<string>): object => {
  const value =
    values.length === 1
      ? {
          valueRegex: values[0],
        }
      : { valueExact: values };
  return {
    node: {
      kind: {
        attributeValue: {
          did: did,
          ...value,
        },
      },
    },
  };
};
