import React from 'react';
import { EmptyData } from './EmptyData';

export default {
  component: EmptyData,
  title: 'EmptyData',
};

export const EmptyDataNoTitle = () => <EmptyData visualizationTitle={null} />;

export const EmptyDataWithTitle = () => (
  <EmptyData visualizationTitle={'Visualization 123'} />
);
