import { useReactiveVar } from '@apollo/client';
import axios from 'axios';
import React, { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { DropdownMenuItem, Popover, PrimaryButton } from '@dg3/components';
import { END_POINT } from '@dg3/endpoints';
import {
  backdropVar,
  contentFilterVar,
  getCoreElContentFilterByKey,
  useNotification,
} from '@dg3/graphql';
import { FilterChip } from '@dg3/types';
import { path as uriPath } from '@dg3/utils';
import { AdhocTaskDialogContent } from './AdhocTaskDialogContent';
import { messages } from './messages';

const EXPRESS_SERVER_URL =
  process.env.EXPRESS_SERVER_URL ?? (global as any).window.EXPRESS_SERVER_URL;

// TODO some automatic logic, by template name or module???
const getTaskTemplates = (module: string) => {
  switch (module) {
    case 'MONI':
      return [
        {
          id: 'measure_communication_availability_and_delay_manual.v1',
          label: 'Komunikační dostupnost koncentrátorů Corinex',
          active: false,
        },
      ];
    case 'READ':
      return [
        {
          id: 'read_REG_iem_data_manual.v1',
          label: 'Vyčítání REG IEM 1den',
          active: false,
        },
        {
          id: 'read_LP_15_iem_data_manual.v1',
          label: 'Vyčítání LP 15 IEM',
          active: false,
        },
        {
          id: 'read_LP_10_siem_data_manual.v1',
          label: 'Vyčítání LP 10 SIEM',
          active: false,
        },
        {
          id: 'read_LP_5_siem_data_manual.v1',
          label: 'Vyčítání LP 5 SIEM',
          active: false,
        },
      ];
    default:
      return [];
  }
};

interface Props {
  module: string;
}

export const AdhocTaskDialog: React.FC<Props> = ({ module }) => {
  const intl = useIntl();
  const message = intl.formatMessage(messages.successfulAdhocTask);
  const notification = useNotification();

  const taskTemplates: Array<DropdownMenuItem> = getTaskTemplates(module);
  const [show, setShow] = useState(false);
  const backdrop = useReactiveVar(backdropVar);
  const contentFilter = useReactiveVar(contentFilterVar);

  const handleToggle = () => {
    setShow(!show);
    backdropVar({ ...backdrop, show: !show });
  };

  const handleClose = () => {
    setShow(false);
    backdropVar({ ...backdrop, show: false });
  };

  const handleTaskRun = (filter: Array<FilterChip>, templateId: string) => {
    const convertedFilter = JSON.stringify(getCoreElContentFilterByKey(filter));

    const formData = new FormData();
    formData.append('task_template_id', templateId);
    formData.append('filter', convertedFilter);

    axios({
      method: 'post',
      url: `${EXPRESS_SERVER_URL}${uriPath(END_POINT.tcExecutionsStart.path)}`,
      data: formData,
      headers: { 'Content-Type': 'multipart/form-data' },
    })
      .then((result) => {
        notification.success(message);
      })
      .catch((err) => {
        notification.error('Nepodařilo se spustit úlohu.', JSON.stringify(err));
      });

    handleClose();
  };

  return (
    <Popover
      show={show}
      onToggle={handleToggle}
      placement={'bottom-start'}
      parent={
        <PrimaryButton onClick={() => {}}>
          <FormattedMessage {...messages.runAdhocTask} />
        </PrimaryButton>
      }
    >
      <AdhocTaskDialogContent
        onTaskRun={handleTaskRun}
        onClose={handleClose}
        templates={taskTemplates}
        filter={contentFilter.chips.filter((item) => item.coreEl === 'DEVICE')}
      />
    </Popover>
  );
};
