export const placeColumnIdToEntitySelection = (columnId: string): string => {
  switch (columnId) {
    default:
      return 'PLACE';
  }
};

export const placeColumnIdToAttributeSelection = (
  columnId: string,
  keyId: string
): string => {
  return keyId;
};
