import { Literal, Record, String, Union } from 'runtypes';
import { Int } from '../runtypes';

export const KpiFormatSchema = Record({
  digits: Int,
  timeZone: String,
  timeFormat: String,
  durationFormat: Union(
    Literal('long'),
    Literal('short'),
    Literal('days'),
    Literal('hours'),
    Literal('minutes'),
    Literal('seconds'),
    Literal('milliseconds')
  ),
});
