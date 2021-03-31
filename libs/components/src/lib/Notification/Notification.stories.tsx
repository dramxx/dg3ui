import { withKnobs } from '@storybook/addon-knobs';
import React, { useState } from 'react';

import { Button } from '../Button/Button';
import { Notification } from './Notification';

export default {
  component: Notification,
  title: 'Notification',
  decorators: [withKnobs],
};

export const ErrorNotification: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <React.Fragment>
      <Button onClick={() => setOpen(true)}>click</Button>
      <Notification
        open={open}
        onClose={() => setOpen(false)}
        notification={{
          id: 'id123',
          type: 'error',
          message: 'Error: A wonderful error happened.',
        }}
      />
    </React.Fragment>
  );
};

export const SuccessNotification: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <React.Fragment>
      <Button onClick={() => setOpen(!open)}>click</Button>
      <Notification
        open={open}
        onClose={() => setOpen(false)}
        notification={{
          id: 'id1234',
          type: 'success',
          message: 'Beautiful OK statement.',
        }}
      />
    </React.Fragment>
  );
};

export const InfoNotification: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <React.Fragment>
      <Button onClick={() => setOpen(!open)}>click</Button>
      <Notification
        open={open}
        onClose={() => setOpen(false)}
        notification={{
          id: 'id12345',
          type: 'info',
          message: 'Handsome information.',
        }}
      />
    </React.Fragment>
  );
};

export const WarningNotification: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <React.Fragment>
      <Button onClick={() => setOpen(!open)}>click</Button>
      <Notification
        open={open}
        onClose={() => setOpen(false)}
        notification={{
          id: 'id12346',
          type: 'warning',
          message: 'Breath-taking warning statement.',
        }}
      />
    </React.Fragment>
  );
};
