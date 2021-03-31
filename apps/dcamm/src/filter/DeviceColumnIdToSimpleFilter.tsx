export const deviColumnIdToEntitySelection = (columnId: string): string => {
  switch (columnId) {
    case 'dts':
      return 'DTS';

    case 'place':
      return 'INSTALLATION_PLACE';

    case 'mediator_ckod':
      return 'MEDIATOR';

    default:
      return 'DEVICE';
  }
};

export const deviColumnIdToAttributeSelection = (
  columnId: string,
  keyId: string
): string => {
  switch (columnId) {
    case 'dts':
      return 'information:attribute.sjz';
    // this can be anlage or SJZ
    case 'place':
      return keyId;

    case 'mediator_ckod':
      return 'information:attribute.ckod';

    default:
      return columnId;
  }
};
