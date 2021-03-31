import styled from 'styled-components';

import { StyledDiv } from '../time-picker';

export const StyledDatetimeInput = styled.div<StyledDiv>`
  input {
    border: none;
    text-align: ${(props) => props.alignText};
    max-width: 140px;

    &:focus {
      border-radius: 3px;
      border: none;
      outline: none;
    }
  }
`;
