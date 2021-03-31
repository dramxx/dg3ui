import { ColumnConfig } from '@model';
import { DateTimeFormat } from '@model/constants';
import * as DateFns from 'date-fns';

export const TableColumns: ColumnConfig[] = [
  {
    key: 'data_type.localization.name',
    label: 'Type',
    isActive: true,
  },
  {
    key: 'time_stamp',
    label: 'Timestamp',
    isActive: true,
    format: (value: string) => {
      return DateFns.format(DateFns.parseISO(value), DateTimeFormat);
    },
  },
  {
    key: 'value.normalizedValue',
    label: 'Value',
    isActive: true,
  },
  {
    key: 'author.element.device_class.localization.name',
    label: 'Author',
    isActive: false,
  },
];
