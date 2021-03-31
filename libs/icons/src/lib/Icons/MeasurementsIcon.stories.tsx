import React from 'react';
import { MeasurementsIcon } from './MeasurementsIcon';

export default {
  component: MeasurementsIcon,
  title: 'Icons/MeasurementsIcon',
};

export const defaultConfiguration = () => <MeasurementsIcon />;

export const customSize = () => (
  <MeasurementsIcon width={'4rem'} height={'4rem'} />
);

export const activeIcon = () => <MeasurementsIcon active={true} />;
