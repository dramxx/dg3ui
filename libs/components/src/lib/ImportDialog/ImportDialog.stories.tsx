import { withKnobs } from '@storybook/addon-knobs';
import React, { useState } from 'react';

import { PrimaryButton } from '../Button/PrimaryButton';
import { Popover } from '../Popover/Popover';
import { ImportDialog } from './ImportDialog';

export default {
  component: ImportDialog,
  title: 'ImportDialog',
  decorators: [withKnobs],
};

export const Default: React.FC = () => (
  <ImportDialog onImport={(files) => console.log('selected files: ', files)} />
);

export const PopoverImportDialog: React.FC = () => {
  const [show, setShow] = useState(false);
  return (
    <Popover
      show={show}
      onToggle={() => setShow(!show)}
      placement={'bottom-start'}
      parent={<PrimaryButton onClick={() => {}}>upload</PrimaryButton>}
    >
      <ImportDialog
        onImport={(files) => console.log('selected files: ', files)}
        onClose={() => setShow(false)}
      />
    </Popover>
  );
};
