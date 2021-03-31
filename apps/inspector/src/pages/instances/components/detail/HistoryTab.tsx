import { TabProps } from '@pages/instances/model';
import React from 'react';

const HistoryTab = (props: TabProps) => {
  const { instanceId } = props;

  return (
    <>
      <h3>HistoryTab content for: </h3>
      <div>{instanceId}</div>
    </>
  );
};

export default HistoryTab;
