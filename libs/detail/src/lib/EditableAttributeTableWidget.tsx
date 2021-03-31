import { useMutation } from '@apollo/client';
import jq from 'jq-web';
import React, { FC } from 'react';
import { useIntl } from 'react-intl';

import { mutations, useNotification } from '@dg3/graphql';
import { AttributeTableWidgetConfig, Mutation } from '@dg3/schema';
import { AttributeTable } from '@dg3/table';
import { CellUpdateFunction } from '@dg3/types';
import { messages } from './messages';

interface Props {
  config: AttributeTableWidgetConfig;
  elementId: string;
  mutation: Mutation;
}

export const EditableAttributeTableWidget: FC<Props> = (props) => {
  const {
    config: { editable, columns, refetchQueries, data },
    elementId,
    mutation,
  } = props;

  const intl = useIntl();
  const notification = useNotification();

  const message = intl.formatMessage(messages.successfulEdit);

  const [update] = useMutation(mutations[mutation], {
    refetchQueries,
    onCompleted: (result) => {
      notification.success(message);
    },
    onError: (err) => {
      notification.error(err.toString());
    },
  });

  const onCellEdit: CellUpdateFunction = (rowId, columnId, newValue, value) => {
    const targetEditable = editable.find(
      (target) => target.rowId === rowId && target.columnId === columnId
    );
    const command = jq.json(
      { id: elementId, value: newValue, internalId: value?.intId },
      targetEditable!.command
    );
    update({ variables: { command } });
  };

  return (
    <AttributeTable
      data={data}
      columns={columns}
      editable={editable}
      onCellEdit={onCellEdit}
    />
  );
};
