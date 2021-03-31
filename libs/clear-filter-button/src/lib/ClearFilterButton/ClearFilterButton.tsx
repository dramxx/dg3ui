import { useReactiveVar } from '@apollo/client';
import { isEmpty } from 'ramda';
import React from 'react';
import styled from 'styled-components';

import { contentFilterVar } from '@dg3/graphql';
import { ClearIcon } from '@dg3/icons';

const StyledClearFilterButton = styled.div<{ active: boolean }>`
  display: flex;
  cursor: ${(props) => (props.active ? 'pointer' : 'initial')};
  align-items: center;
  margin-top: ${(props) => props.theme.spacing.small};
`;

export const ClearFilterButton: React.FC = () => {
  const contentFilter = useReactiveVar(contentFilterVar);

  const isClearButtonActive = !isEmpty(contentFilter.chips);

  const handleClearFilter = () => {
    isClearButtonActive && contentFilterVar({ chips: [] });
  };

  return (
    <StyledClearFilterButton active={isClearButtonActive}>
      <ClearIcon
        active={isClearButtonActive}
        disabled={!isClearButtonActive}
        onClick={handleClearFilter}
      />
    </StyledClearFilterButton>
  );
};
