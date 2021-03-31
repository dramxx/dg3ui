import React from 'react';
import { Chip } from './Chip';

export default {
  component: Chip,
  title: 'Chip',
};

export const ChipDefault = () => (
  <Chip
    edited={false}
    value={{
      id: 'test',
      label: 'test',
      coreEl: 'DEVICE',
      type: 'EXPERT',
      value: '',
    }}
    onDelete={() => console.log('handle delete')}
    onInfo={() => console.log('handle info')}
    onEdit={() => console.log('handle edit')}
  />
);

export const ChipLongName = () => (
  <Chip
    edited={false}
    value={{
      id: 'test',
      label: 'very long label bla dladeodeafae afa',
      coreEl: 'DEVICE',
      type: 'EXPERT',
      value: '',
    }}
    onDelete={() => console.log('handle delete')}
    onInfo={() => console.log('handle info')}
    onEdit={() => console.log('handle edit')}
  />
);
