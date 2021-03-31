export const nodeAttribute = (did: string, values: Array<string>): object => {
  const value =
    values.length === 1
      ? {
          valueRegex: values[0],
        }
      : { valueExact: values };
  return {
    node: {
      attributeValue: {
        did: did,
        ...value,
      },
    },
  };
};

export const nodeKind = (values: Array<string>) => {
  return {
    node: {
      kind: {
        id: values,
      },
    },
  };
};
