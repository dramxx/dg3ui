import { useReactiveVar } from '@apollo/client';
import axios from 'axios';
import React, { useState } from 'react';

import { ExportButton, Popover } from '@dg3/components';
import { END_POINT, EXPRESS_SERVER_URL } from '@dg3/endpoints';
import { backdropVar, useNotification } from '@dg3/graphql';
import { path as uriPath } from '@dg3/utils';
import { ExportDialogContent } from './ExportDialogContent';
import {
  EVENTS_TEMPLATES,
  MEASUREMENT_TEMPLATES,
  MONITORING_TEMPLATES,
} from './ExportTaskTemplates';

interface Props {
  module: string;
  onExport: () => void;
}

const getTempalatesByModule = (module: string) => {
  switch (module) {
    case 'MONI':
      return MONITORING_TEMPLATES;
    case 'MEAS':
      return MEASUREMENT_TEMPLATES;
    case 'EVEN':
      return EVENTS_TEMPLATES;
  }
};

export const ExportDialog: React.FC<Props> = (props: Props) => {
  const { module, onExport } = props;
  const [show, setShow] = useState(false);
  const backdrop = useReactiveVar(backdropVar);
  const notification = useNotification();
  const templates = getTempalatesByModule(module);

  const handleToggle = () => {
    setShow(!show);
    backdropVar({ modal: !show, show: !show });
  };

  const handleClose = () => {
    setShow(false);
    backdropVar({ modal: false, show: false });
  };

  const handleExport = () => {
    onExport();
    handleClose();
  };

  const handleTaskRun = (templateId: string) => {
    const formData = new FormData();
    formData.append('task_template_id', templateId);
    formData.append('filter', '{"AND":[]}');

    axios({
      method: 'post',
      url: `${EXPRESS_SERVER_URL}${uriPath(END_POINT.tcExecutionsStart.path)}`,
      data: formData,
      headers: { 'Content-Type': 'multipart/form-data' },
    })
      .then((result) => {
        notification.success('Task started');
      })
      .catch((err) => {
        notification.error(`Error: ${JSON.stringify(err.response.data)}`);
      });

    handleClose();
  };

  return (
    <Popover
      show={show}
      clickAwayDisabled={true}
      onToggle={handleToggle}
      placement={'bottom-start'}
      parent={<ExportButton active={true} onClick={() => {}} />}
    >
      <ExportDialogContent
        templates={templates}
        onClose={handleClose}
        onTaskRun={handleTaskRun}
        onLocalExport={handleExport}
      ></ExportDialogContent>
    </Popover>
  );
};
