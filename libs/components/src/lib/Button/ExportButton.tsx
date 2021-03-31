import React from 'react';
import styled from 'styled-components';

import { ExportIcon } from '@dg3/icons';

const StyledExportButton = styled.div<{ active: boolean }>`
  display: flex;
  cursor: ${(props) => (props.active ? 'pointer' : 'not-allowed')};
  pointer-events: ${(props) => (props.active ? 'auto' : 'none')};

  :hover {
    svg > g > g {
      stroke: ${(props) => props.theme.colors.primary2};
    }
  }
`;

interface Props {
  active: boolean;
  onClick: () => void;
}

export const ExportButton: React.FC<Props> = (props) => {
  const { active, onClick } = props;

  return (
    <StyledExportButton onClick={onClick} active={active}>
      <ExportIcon active={active} />
    </StyledExportButton>
  );
};
