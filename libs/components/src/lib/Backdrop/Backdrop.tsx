import { useReactiveVar } from '@apollo/client';
import MuiBackdrop from '@material-ui/core/Backdrop';
import * as React from 'react';
import { useContext } from 'react';
import { ThemeContext } from 'styled-components';

import { backdropVar } from '@dg3/graphql';

export const Backdrop: React.FC = () => {
  const theme = useContext(ThemeContext);
  const backdrop = useReactiveVar(backdropVar);

  const open = backdrop.modal || backdrop.show;
  const isModal = backdrop.modal;

  const handleClick = () => {
    if (isModal) {
      return;
    }

    backdropVar({
      show: false,
      modal: false,
    });
  };

  return (
    <MuiBackdrop
      style={{
        zIndex: theme.zIndex.modal,
      }}
      open={open}
      onClick={handleClick}
    />
  );
};
