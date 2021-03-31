import styled from 'styled-components';

import { StyledDiv } from './TimePicker';

export const StyledTimePicker = styled.div<StyledDiv>`
  display: flex;
  flex-direction: row;
  font-size: 14px;
  align-items: center;
  position: relative;
  border-radius: 3px;
  border: ${(props) =>
    !props.isValid ? '1px solid red !important' : '1px solid #e2e2e2'};
  height: ${(props) => props.theme.sizes.filterHeight};
`;
