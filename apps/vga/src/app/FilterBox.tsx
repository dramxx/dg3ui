import * as React from 'react';
import styled from 'styled-components';
import { TimeFilter } from '@dg3/time-filter';

type isCollapsedType = {
  isCollapsed: boolean;
};

// TODO: layout should be solved on page component not here, but its need unification between projects
const StyledFilterBox = styled.div<isCollapsedType>`
  background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: ${(props) => props.theme.sizes.filterBoxHeight};
  padding-left: ${(props) => props.theme.spacing.normal};
  padding-right: ${(props) => props.theme.spacing.normal};
  width: 100%;
`;

interface Props {
  isCollapsed: boolean;
}

export const FilterBox: React.FC<Props> = (props: Props) => {
  return (
    <StyledFilterBox {...props}>
      <TimeFilter />
    </StyledFilterBox>
  );
};
