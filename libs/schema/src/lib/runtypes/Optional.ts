import { Null, Runtype, Undefined, Union } from 'runtypes';

export const Optional = (type: Runtype) => Union(type, Null, Undefined);
