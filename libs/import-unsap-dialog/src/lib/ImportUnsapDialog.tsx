import { useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { useIntl } from 'react-intl';

import { ImportDialog, Popover, PrimaryButton } from '@dg3/components';
import { REQUEST_TASK_EXECUTION, useNotification } from '@dg3/graphql';
import { convertImportCsvIntoJsonLines } from '@dg3/utils';
import { messages } from './messages';

export const ImportUnsapDialog: React.FC = () => {
  const intl = useIntl();
  const notification = useNotification();
  const [show, setShow] = useState(false);

  const [requestTaskExecution] = useMutation(REQUEST_TASK_EXECUTION, {
    refetchQueries: ['DeviListTable', 'PlacesListTable'],
    onCompleted: (result) => {
      notification.success(intl.formatMessage(messages.successfulNotSapImport));
    },
    onError: (err) => {
      notification.error(
        intl.formatMessage(messages.unsuccessfulNotSapImport),
        err.toString()
      );
    },
  });

  const handleImport = async (files: Array<File>) => {
    const reader = new FileReader();
    let jsonLines = '';

    reader.onload = (e) => {
      if (typeof reader.result === 'string') {
        jsonLines = convertImportCsvIntoJsonLines(reader.result);
      } else {
        // ArrayBuffer
        console.error('Reader should provide only string value in our case');
        return;
      }

      requestTaskExecution({
        variables: {
          file: jsonLines,
        },
      });
    };

    reader.readAsText(files[0]);
  };

  return (
    <Popover
      show={show}
      onToggle={() => setShow(!show)}
      placement={'bottom-start'}
      parent={<PrimaryButton onClick={() => {}}>import</PrimaryButton>}
    >
      <ImportDialog onImport={handleImport} onClose={() => setShow(false)} />
    </Popover>
  );
};

export default ImportUnsapDialog;
