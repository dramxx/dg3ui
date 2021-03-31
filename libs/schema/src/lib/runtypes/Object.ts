import {
  Dictionary,
  Intersect2,
  Partial,
  Record,
  Runtype,
  Unknown,
} from 'runtypes';

// shorthand for defining optional properties
export const ObjectType = <
  O extends { [_: string]: Runtype },
  P extends { [_: string]: Runtype }
>(
  required: O,
  optional: P = {} as P
): Intersect2<Record<O, false>, Partial<P>> =>
  Record(required).And(Partial(optional));

export const AnyObject = Dictionary(Unknown);
