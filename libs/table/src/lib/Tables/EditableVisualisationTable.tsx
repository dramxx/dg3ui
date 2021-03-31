import { useMutation } from '@apollo/client';
import jq from 'jq-web';
import React, { FC } from 'react';
import { Column } from 'react-table';

import { mutations, useNotification } from '@dg3/graphql';
import { MappingObject, TableEditable } from '@dg3/schema';
import { TableDataObject } from '@dg3/types';
import { Table } from '../Table/Table';

interface Props {
  data: Array<TableDataObject>;
  dataLength: number;
  columns: Array<Column>;
  rowsInTable?: number;
  onColumnFilter?: (columnId: string, value: MappingObject) => void;
  showExport: boolean;
  allowFilter: boolean;
  allowSelect: boolean;
  allowRowSelect: boolean;
  autoHeight?: boolean;
  editable: TableEditable;
}

export const EditableVisualizationTable: FC<Props> = (props) => {
  const {
    editable: { mutation, refetchQueries, successMessage },
    columns,
  } = props;
  const notification = useNotification();
  const [update] = useMutation(mutations[mutation], {
    refetchQueries,
    onError: (error) => notification.error(error.message),
    onCompleted: () => notification.success(successMessage),
  });

  const handleCellUpdate = (rowId, columnId, newValue) => {
    const editable = columns.find((column) => column.accessor === columnId)
      .editable;
    const input = jq.json({ id: rowId, value: newValue }, editable.body);
    update({ variables: { input } });
  };
  return <Table {...props} onCellEdit={handleCellUpdate} />;
};
