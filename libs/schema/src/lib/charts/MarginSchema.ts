import { Partial } from 'runtypes';
import { PositiveZeroInt } from '../runtypes';

export const MarginSchema = Partial({
  top: PositiveZeroInt,
  bottom: PositiveZeroInt,
  left: PositiveZeroInt,
  right: PositiveZeroInt,
});
