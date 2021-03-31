export const informationColumnIdToEntitySelection = (
  columnId: string
): string => {
  switch (columnId) {
    case 'object':
    case 'object_kind':
      return 'OBJECT';

    case 'author':
    case 'author_kind':
      return 'AUTHOR';

    default:
      return 'INFORMATION';
  }
};

export const informationColumnIdToAttributeSelection = (
  columnId: string,
  keyId: string
): string => {
  switch (columnId) {
    default:
      return keyId;
  }
};
