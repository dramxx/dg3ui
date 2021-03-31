import React from 'react';
import { EventsIcon } from './EventsIcon';

export default {
  component: EventsIcon,
  title: 'Icons/EventsIcon',
};

export const defaultConfiguration = () => <EventsIcon />;

export const customSize = () => <EventsIcon width={'4rem'} height={'4rem'} />;

export const customColor = () => <EventsIcon color={'red'} />;

export const activeIcon = () => <EventsIcon active={true} />;
