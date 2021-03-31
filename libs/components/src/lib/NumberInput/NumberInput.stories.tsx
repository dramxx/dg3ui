import { withKnobs } from '@storybook/addon-knobs';
import React, { useState } from 'react';

import { NumberInput } from './NumberInput';

export default {
  title: 'Components/NumberInput',
  component: NumberInput,
  decorators: [withKnobs],
};

export const Default = () => {
  const [defaultValue, setDefaultValue] = useState(1);
  return <NumberInput value={defaultValue} onChange={setDefaultValue} />;
};

export const Disabled = () => (
  <NumberInput value={42} onChange={() => console.log('42')} disabled={true} />
);

export const Min5Max42Input = () => {
  const [value, setValue] = useState(5);
  return (
    <NumberInput value={value} onChange={setValue} minimum={5} maximum={42} />
  );
};
