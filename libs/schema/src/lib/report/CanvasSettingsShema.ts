import { ObjectType, PositiveInt, PositiveZeroInt } from '../runtypes';

export const CanvasSettingsSchema = ObjectType(
  {
    rows: PositiveInt,
    columns: PositiveInt,
  },
  {
    minWidth: PositiveZeroInt,
    maxWidth: PositiveInt,
    minHeight: PositiveZeroInt,
    maxHeight: PositiveInt,
  }
);
