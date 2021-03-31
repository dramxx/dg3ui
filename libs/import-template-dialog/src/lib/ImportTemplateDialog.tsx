import axios from 'axios';
import { isNil } from 'ramda';
import React, { useState } from 'react';
import { useIntl } from 'react-intl';

import { ImportDialog, Popover, PrimaryButton } from '@dg3/components';
import { EXPRESS_SERVER_URL } from '@dg3/endpoints';
import { useNotification } from '@dg3/graphql';
import { FileValidator } from '@dg3/types';
import { noop, suffixValidator } from '@dg3/utils';
import { messages } from './messages';

type Props = {
  refetchQuery?: (variables?: {}) => void;
};

export const ImportTemplateDialog: React.FC<Props> = (props: Props) => {
  const { refetchQuery } = props;
  const intl = useIntl();
  const notification = useNotification();
  const [show, setShow] = useState(false);

  const templateSuffixValidator: FileValidator = {
    validate: (file: File) => suffixValidator(file.name, '.template.json'),
    errorMessage: intl.formatMessage(messages.missingTemplateSuffix),
  };

  const handleImport = async (files: Array<File>) => {
    const formData = new FormData();

    files.forEach((file) => {
      formData.append(file.name, file);
    });

    // TODO: move outside somewhere to api folder and maybe consider using redux for side effects
    axios({
      method: 'post',
      url: `${EXPRESS_SERVER_URL}/catalog/import`,
      data: formData,
      headers: { 'Content-Type': 'multipart/form-data' },
    })
      .then((result) => {
        notification.success(
          intl.formatMessage(messages.successfulTemplateImport)
        );
        !isNil(refetchQuery) && refetchQuery();
      })
      .catch((err) => {
        notification.error(
          intl.formatMessage(messages.unsuccessfulTemplateImport),
          err.toString()
        );
      });
  };

  return (
    <Popover
      show={show}
      onToggle={() => setShow(!show)}
      placement={'bottom-start'}
      parent={<PrimaryButton onClick={noop}>import</PrimaryButton>}
    >
      <ImportDialog
        onImport={handleImport}
        onClose={() => setShow(false)}
        fileValidators={[templateSuffixValidator]}
      />
    </Popover>
  );
};
