import { InstanceOf } from 'runtypes';
import { isValid } from 'date-fns';

export const DateType = InstanceOf(Date).withConstraint(
  (date) => isValid(date) || `${date} is not a valid date`
);
