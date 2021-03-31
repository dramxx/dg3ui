import React from 'react';
import { EditIcon } from './EditIcon';

export default {
  component: EditIcon,
  title: 'Icons/EditIcon',
};

export const defaltConfiguration = () => <EditIcon/>;

export const customSize = () => <EditIcon width={'4rem'} height={'4rem'}/>;

export const customColor = () => <EditIcon color={'red'}/>;
