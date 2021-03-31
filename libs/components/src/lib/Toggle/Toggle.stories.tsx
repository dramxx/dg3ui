import React from 'react';
import { Toggle } from './Toggle';

export default {
  component: Toggle,
  title: 'Toggle',
};

export const toggleOn = () => (
  <Toggle checked={true} onToggle={() => console.log('toggle')} />
);

export const toggleOff = () => (
  <Toggle checked={false} onToggle={() => console.log('toggle')} />
);
