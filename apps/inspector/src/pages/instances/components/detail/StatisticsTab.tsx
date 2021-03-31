import React from 'react';

import { TabProps } from '../../model';

const StatisticsTab = (props: TabProps) => {
  const { instanceId } = props;

  return (
    <>
      <h3>StatisticsTab content for: </h3>
      <div>{instanceId}</div>
    </>
  );
};

export default StatisticsTab;
