import { Boolean, Null, Number, String, Undefined, Union } from 'runtypes';

export const CellValue = Union(Null, Undefined, Number, Boolean, String);
