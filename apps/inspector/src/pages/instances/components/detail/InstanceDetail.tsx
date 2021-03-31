import Detail from '@components/detail';
import { ColumnConfig } from '@model';
import React from 'react';

import { EDetailTab } from '../../model';
import { AttributesTab, HistoryTab, RelationsTab, StatisticsTab, TemplatesTab } from '.';

interface Props {
  instanceId: string;
  onColumnChange: (columns: ColumnConfig[]) => void;
}

const InstanceDetail = ({ instanceId, onColumnChange }: Props) => {
  return (
    <div style={{ height: '100%', width: '100%' }}>
      <Detail defaultTab={EDetailTab.Attributes}>
        <Detail.Tab id={EDetailTab.Attributes} label={'Attributes'}>
          <AttributesTab instanceId={instanceId} onColumnChange={onColumnChange} />
        </Detail.Tab>
        <Detail.Tab id={EDetailTab.History} label={'History'}>
          <HistoryTab instanceId={instanceId} />
        </Detail.Tab>
        <Detail.Tab id={EDetailTab.Relations} label={'Relations'}>
          <RelationsTab instanceId={instanceId} />
        </Detail.Tab>
        <Detail.Tab id={EDetailTab.Statistics} label={'Statistics'}>
          <StatisticsTab instanceId={instanceId} />
        </Detail.Tab>
        <Detail.Tab id={EDetailTab.Templates} label={'Templates'}>
          <TemplatesTab instanceId={instanceId} />
        </Detail.Tab>
      </Detail>
    </div>
  );
};

export default InstanceDetail;
