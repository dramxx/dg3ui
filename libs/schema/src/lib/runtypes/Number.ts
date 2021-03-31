import { Number as NumberType } from 'runtypes';

export const Int = NumberType.withConstraint(
  (x) => Number.isInteger(x) || `${x} is not an integer`
);

export const PositiveInt = Int.withConstraint(
  (x) => x > 0 || `${x} is not positive`
);

export const PositiveZeroInt = Int.withConstraint(
  (x) => x >= 0 || `${x} is not positive or zero`
);
