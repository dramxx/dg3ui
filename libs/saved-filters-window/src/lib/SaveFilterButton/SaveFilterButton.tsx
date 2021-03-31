import { useReactiveVar } from '@apollo/client';
import { isEmpty } from 'ramda';
import React, { useState } from 'react';
import styled from 'styled-components';

import { Popover } from '@dg3/components';
import { contentFilterVar } from '@dg3/graphql';
import { SaveIcon } from '@dg3/icons';
import { SaveFilterButtonDialog } from './SaveFilterButtonDialog';

const StyledSaveButton = styled.div<{ active: boolean }>`
  display: flex;
  cursor: ${(props) => (props.active ? 'pointer' : 'initial')};
  align-items: center;
  margin-top: ${(props) => props.theme.spacing.small};
`;

export const SaveFilterButton: React.FC = () => {
  const [show, setShow] = useState<boolean>(false);
  const contentFilter = useReactiveVar(contentFilterVar);

  const isSaveButtonActive = !isEmpty(contentFilter.chips);

  const handleToggle = () => {
    if (isSaveButtonActive) {
      setShow(!show);
    }
  };

  return (
    <StyledSaveButton active={isSaveButtonActive}>
      <Popover
        show={show}
        onToggle={handleToggle}
        parent={
          <SaveIcon
            active={isSaveButtonActive}
            disabled={!isSaveButtonActive}
          />
        }
        placement={'bottom-end'}
      >
        <SaveFilterButtonDialog
          handleClose={() => setShow(false)}
          contentFilter={contentFilter}
        />
      </Popover>
    </StyledSaveButton>
  );
};
