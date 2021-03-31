import React from 'react';

import { Circle } from './Circle';

export default {
  component: Circle,
  title: 'Circle',
};

export const CircleWithEvents = () => (
  <Circle events={{ count: 3, radius: '1.8rem' }} />
);

export const CircleNoEvents = () => (
  <Circle events={{ count: 0, radius: '1.8rem' }} />
);

export const CircleCustomColor = () => (
  <Circle color={'red'} events={{ count: 0, radius: '1.8rem' }} />
);

export const CircleNotification = () => (
  <Circle events={{ count: 0, radius: '0.5rem' }} />
);
