import { isEmpty } from 'ramda';
import React from 'react';
import { useIntl } from 'react-intl';

import { useNotification } from '@dg3/graphql';
import { VisualisationTable } from '@dg3/table';
import { TableWidgetProps } from '@dg3/types';
import { exportTable } from '@dg3/utils';
import { ChartWidget } from '../General/ChartWidget';
import { messages } from '../General/messages';

export const TableWidget: React.FC<TableWidgetProps> = (
  props: TableWidgetProps
) => {
  const intl = useIntl();
  const notification = useNotification();
  const exportMessage = intl.formatMessage(messages.exportStarted);

  const handleExport = () => {
    notification.info(exportMessage);
    exportTable(props.columnsConf, props.data, props.title);
  };

  return (
    <ChartWidget
      noData={false}
      chart={
        <VisualisationTable
          columnsConf={props.columnsConf}
          data={props.data}
          dataLength={props.data.length}
          rowsInTable={props.rowsInTable}
          showExport={false}
          allowSelect={false}
          allowFilter={false}
          allowRowSelect={true}
          editable={props.editable}
        />
      }
      enableDataSelection={false}
      enableImport={props.enableImport}
      refetchQuery={props.refetchQuery}
      onExport={!isEmpty(props.data) ? handleExport : undefined}
      enableAdhoc={props.enableAdhoc}
      title={props.title}
      overviewModule={props.overviewModule}
      includedFilters={props.includedFilters}
      showBorder={props.showBorder}
      showFooter={true}
    />
  );
};

TableWidget.defaultProps = {
  title: '',
  showBorder: true,
};
