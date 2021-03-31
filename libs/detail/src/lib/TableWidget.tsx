import React, { FC } from 'react';

import { DetailTableWidgetConfig } from '@dg3/schema';
import { VisualisationTable } from '@dg3/table';

interface Props {
  config: DetailTableWidgetConfig;
}

export const TableWidget: FC<Props> = (props) => {
  const {
    config: { columns, data },
  } = props;
  return (
    <VisualisationTable
      data={data}
      autoHeight={true}
      columnsConf={columns}
      dataLength={data.length}
      showExport={false}
      allowFilter={false}
      allowRowSelect={false}
      allowSelect={false}
      onColumnFilter={() => {
        /* do nothing */
      }}
    />
  );
};
